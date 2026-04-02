/* =====================================================
   library.js — 자료실 도서 목록 & 대출 기능
   데이터 저장: localStorage
   - books: 도서 목록 + 대출 상태
   - loans: { userId: [ { bookId, start, end } ] }
===================================================== */

// ── 초기 도서 데이터 ──────────────────────────────
const INITIAL_BOOKS = [
    { id: 1, img: '',  title: '나에게 나다움을 주기로 했다', author: '고정욱',   year: 2023, price: 16000 },
    { id: 2, img: '',  title: '여름이 반짝',                 author: '김수빈',   year: 2022, price: 14000 },
    { id: 3, img: '',  title: '사랑 한 꼬집을 넣으면',       author: '배리 팀스', year: 2021, price: 13000 },
    { id: 4, img: '',  title: '정말 정말 소리 지르고 싶어!', author: '사이먼 필립', year: 2020, price: 12000 },
    { id: 5, img: '',  title: '힐빌리의 노래',               author: 'J.D 밴스',  year: 2023, price: 17000 },
    { id: 6, img: '',  title: '커피 한잔 할까요?',           author: '허영만',   year: 2022, price: 15000 },
    { id: 7, img: '',  title: '두더지의 여름',               author: '김상근',   year: 2021, price: 13500 },
    { id: 8, img: '',  title: '피아니스트와 함께하는 힐링',  author: '김미정',   year: 2024, price: 18000 },
    { id: 9, img: '',  title: '마음챙김 그림책테라피',       author: '박지은',   year: 2023, price: 14500 },
    { id:10, img: '',  title: '뚝딱 한국사',                 author: '이진우',   year: 2022, price: 16500 },
];

// ── 유틸 ─────────────────────────────────────────
const getBooks  = () => JSON.parse(localStorage.getItem('books')  || 'null');
const getLoans  = () => JSON.parse(localStorage.getItem('loans')  || '{}');
const saveBooks = b  => localStorage.setItem('books',  JSON.stringify(b));
const saveLoans = l  => localStorage.setItem('loans',  JSON.stringify(l));

function dateStr(d) {
    return `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`;
}

// ── 초기화: books가 없으면 세팅 ──────────────────
function initBooks() {
    if (!getBooks()) saveBooks(INITIAL_BOOKS.map(b => ({ ...b, loanedBy: null, loanStart: null, loanEnd: null })));
}

// ── 테이블 렌더링 ─────────────────────────────────
function renderTable() {
    const books   = getBooks();
    const session = JSON.parse(sessionStorage.getItem('currentUser') || 'null');
    const tbody   = document.getElementById('bookTableBody');
    document.getElementById('totalCount').textContent = books.length;

    tbody.innerHTML = books.map(book => {
        const available = !book.loanedBy;
        const badgeHtml = available
            ? '<span class="badge badge-available">대출가능</span>'
            : '<span class="badge badge-loaned">대출중</span>';

        const periodHtml = book.loanEnd
            ? `<span class="loan-period">${book.loanStart} ~ ${book.loanEnd}</span>`
            : '<span class="loan-period">—</span>';

        const btnDisabled = !available ? 'disabled' : '';
        const btnHtml = `<button class="btn-loan" ${btnDisabled} onclick="loanBook(${book.id})">대출하기</button>`;

        const imgHtml = book.img
            ? `<img src="${book.img}" alt="${book.title}" class="book-thumb">`
            : `<div class="book-thumb-placeholder"><i class="fas fa-book"></i></div>`;

        return `<tr>
            <td>${imgHtml}</td>
            <td class="book-title-cell">${book.title}</td>
            <td class="book-author-cell">${book.author}</td>
            <td>${book.year}</td>
            <td>${book.price.toLocaleString()}원</td>
            <td>${badgeHtml}</td>
            <td>${periodHtml}</td>
            <td>${btnHtml}</td>
        </tr>`;
    }).join('');
}

// ── 대출 처리 ─────────────────────────────────────
function loanBook(bookId) {
    const session = JSON.parse(sessionStorage.getItem('currentUser') || 'null');
    if (!session) {
        alert('로그인이 필요한 서비스입니다.');
        document.getElementById('openLogin').click();
        return;
    }

    const books = getBooks();
    const book  = books.find(b => b.id === bookId);
    if (!book || book.loanedBy) return;

    // 대출 시작일 / 종료일 (10일)
    const start = new Date();
    const end   = new Date();
    end.setDate(end.getDate() + 9); // 당일 포함 10일

    book.loanedBy  = session.id;
    book.loanStart = dateStr(start);
    book.loanEnd   = dateStr(end);
    saveBooks(books);

    // loans에도 기록 (마이페이지용)
    const loans = getLoans();
    if (!loans[session.id]) loans[session.id] = [];
    loans[session.id].push({ bookId, title: book.title, author: book.author, start: book.loanStart, end: book.loanEnd });
    saveLoans(loans);

    renderTable();
    alert(`"${book.title}" 대출이 완료되었습니다.\n반납기한: ${book.loanEnd}`);
}

// ── 초기 실행 ─────────────────────────────────────
initBooks();
renderTable();
const $ = id => document.getElementById(id);
const getUsers = () => JSON.parse(localStorage.getItem('users') || '{}');
const getSession = () => JSON.parse(sessionStorage.getItem('currentUser') || 'null');

function showMsg(id, text) {
    const el = $(id);
    el.textContent = text;
    el.style.display = text ? 'block' : 'none';
}

function popup(id, open) {
    $(id).classList.toggle('active', open);
    document.body.style.overflow = open ? 'hidden' : '';
}

function renderHeader() {
    const u = getSession();
    $('guestArea').style.display  = u ? 'none' : 'flex';
    $('memberArea').style.display = u ? 'flex' : 'none';
    if (u) $('memberInfo').textContent = `${u.name}(${u.id})`;
}

function loginSuccess(user, overlay) {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    popup(overlay, false);
    renderHeader();
    scrollTo({ top: 0, behavior: 'smooth' });
}

// 팝업 닫기
['loginClose','loginBg'].forEach(id => $( id).onclick = () => popup('loginOverlay', false));
['signupClose','signupBg'].forEach(id => $(id).onclick = () => popup('signupOverlay', false));

// 로그인 열기
$('openLogin').onclick = () => {
    if (getSession()) return;
    showMsg('loginMsg', ''); $('loginId').value = $('loginPw').value = '';
    popup('loginOverlay', true);
};

// 회원가입 열기
$('openSignup').onclick = () => {
    if (getSession()) { alert('이미 가입된 회원입니다.'); scrollTo({top:0,behavior:'smooth'}); return; }
    showMsg('signupMsg', ''); $('signupId').value = $('signupPw').value = $('signupName').value = '';
    popup('signupOverlay', true);
};

// 로그인 처리
$('loginSubmit').onclick = () => {
    const id = $('loginId').value.trim(), pw = $('loginPw').value.trim();
    if (!id || !pw) return showMsg('loginMsg', '아이디와 비밀번호를 모두 입력해주세요.');
    const u = getUsers()[id];
    if (!u || u.pw !== pw) return showMsg('loginMsg', '아이디 또는 비밀번호가 일치하지 않습니다.');
    loginSuccess({ id, name: u.name }, 'loginOverlay');
};
$('loginPw').onkeydown = e => e.key === 'Enter' && $('loginSubmit').click();

// 회원가입 처리
$('signupSubmit').onclick = () => {
    const id = $('signupId').value.trim(), pw = $('signupPw').value.trim(), name = $('signupName').value.trim();
    if (!id || !pw || !name) return showMsg('signupMsg', '모든 항목을 입력해주세요.');
    const users = getUsers();
    if (users[id]) return showMsg('signupMsg', '이미 사용 중인 아이디입니다.');
    users[id] = { pw, name };
    localStorage.setItem('users', JSON.stringify(users));
    loginSuccess({ id, name }, 'signupOverlay');
};
$('signupName').onkeydown = e => e.key === 'Enter' && $('signupSubmit').click();

// 로그아웃
$('logoutBtn').onclick = () => { sessionStorage.removeItem('currentUser'); renderHeader(); };

renderHeader();
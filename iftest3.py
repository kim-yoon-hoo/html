'''
money = int(input("가지고 있는 돈을 입력하세요.:"))

if money >= 20000:  #20000원보다 크거나 같으면 탕수육이라고 화면에 출력됨
     print("탕수육")
elif money >= 10000: #10000원보다 크거나 같으면 쟁반짜장이라고 화면에 출력됨
     print("쟁반짜장")
elif money >= 6000:  #6000원보다 크거나 같으면  해물짬뽕이라고 화면에 출력됨
     print("해물짬뽕")
elif money >= 4000: #4000원보다 크거나 같으면 짜장면이라고 화면에 출력됨
     print("짜장면")
else:
     print("단무지먹자") #4000원 미만이면 단무지 먹자라고 출력
     

#정수 리스트 num_list



list_num = [1,2,3,4,5]

n = int(input("정수하나 입력해주시면 안될까요?"))

if n in list_num:
    print(f"{n}은 목록 안에 있습니다.")
else:
    print(f"{n}은 목록에서 찾을수 없습니다.")
    '''

#1부터 6까지 적인 주사위 두개를 던져 나오는 값을 a,b라고 할때
#a=input("첫번쨰 주사위의 값")
#b=input("두번쨰 주사위의 값")
#a,b모두 홀수이면 a의 제곱 +b의 제곱 출력
#a,b모두 짝수이면 절대값(a-b) 출력(a-b) #abs()
#a,b둘 중의 하나만 홀수이면 2*(a+b)를 출력하여라

a =int(input("첫번쨰 주사위의 값을 입력하세요"))
b = int(input("두번쨰 주사위의 값을 입력하세요"))

if a % 2 ==1 and b % 2 ==1:
    print(a**2+b**2)
elif a%2==0 and b%2==0:
    print(abs(a-b))
else:
    print(2*(a+b))
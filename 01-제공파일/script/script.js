$(document).ready(function(){
    //메뉴
    $(".main").hover(function(){
        $(".sub").stop().slideDown()
    },function(){
        $(".sub").stop().slideUp()
    });    
    


    //슬라이드
    var i=4;
    setInterval(function(){
        i--;
        if(i==3) $(".slide img").css("top","0");
        $(".slide img").eq(i).animate({"top":"300px"},500); console.log(i);    
        if(i<=1) i=4;
    },1000);
    
    $(".notice h2").css("background","#99F");
    $(".no").click(function(){
        $(".ga").css("background","#FFF");
        $(".no").css("background","#99F");
        $(".notice pre").eq(1).css("display","block");
        $(".notice img").eq(0).css("display","none");
    });
    $(".ga").click(function(){
        $(".no").css("background","#FFF");
        $(".ga").css("background","#99F");
        $(".notice pre").css("display","none");
        $(".notice img").css("display","block");
    });
});
$(document).ready(function() {
    $(".header__logo").click(function(){
        location.href='/landing.html';
    });
    
    $(".header__login-button").click(function() {
        location.href='/login.html';
    });

    $(".header__register-button").click(function() {
        location.href='/register.html';
    });
});
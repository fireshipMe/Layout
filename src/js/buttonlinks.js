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

    $(".button_create-account").click(function() {
        location.href='/register.html';
    });

    $(".authorisation__login-button_padded").click(function() {
        location.href='/login.html';
    });
});
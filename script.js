let navbar = document.querySelector('.navbar')

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    loginForm.classList.remove('active');
    searchForm.classList.remove('active');
}

let loginForm = document.querySelector('.login-form')

document.querySelector('#login-btn').onclick = () =>{
    loginForm.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
}

let searchForm = document.querySelector('.search-from')

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    loginForm.classList.remove('active');
}

window.onscroll = () =>{
    navbar.classList.remove('active');
    loginForm.classList.remove('active');
    searchForm.classList.remove('active');
}


window.on = () =>{
    navbar.classList.remove('active');
    loginForm.classList.remove('active');
    searchForm.classList.remove('active');
}

window.onsubmit = () =>{
    loginForm.classList.remove('active');
}

let themeBtn = document.querySelector('#theme-btn');

themeBtn.onclick = () =>{
    themeBtn.classList.toggle('fa-sun');

    if (themeBtn.classList.contains('fa-sun')){
        document.body.classList.add('active');
    }else {
        document.body.classList.remove('active');
    }
    navbar.classList.remove('active');
    loginForm.classList.remove('active');
    searchForm.classList.remove('active');
};

const swiper = new Swiper('.review-slider', {
    loop:true,
    spaceBetween :30,
    centeredSlides : true,
    autoplay: {
      delay :5500,
      disableOnInteraction: false,
    },
    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },


});
// ----------------------------------------------------------------------------------------------------
//
// function toggleMenu() {
//     let toggle = document.querySelector('.toggle');
//     let navigation = document.querySelector('.navigation');
//     let main = document.querySelector('.main');
//     let lalala = document.querySelector('.lalala');
//     toggle.classList.toggle('active');
//     navigation.classList.toggle('active');
//     main.classList.toggle('active');
//     lalala.classList.toggle('active');
//
// }

// ----------------------------------------------------------------------------------------------------
//
// let navbarr = document.querySelector('.navbar')
//
// document.querySelector('.toggle').onclick = () =>{
//     navbarr.classList.toggle('active')
// }

$('#SuperLuxuryBtn').on('click',function (){

    let loginForm = document.querySelector('.login-form')
    loginForm.classList.toggle('active');

});




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

$('#SuperLuxuryBtn').on('click',function (){

    let loginForm = document.querySelector('.login-form')
    loginForm.classList.toggle('active');

});

$('#LuxuryBtn').on('click',function (){

    let loginForm = document.querySelector('.login-form')
    loginForm.classList.toggle('active');

});

$('#MidLevelBtn').on('click',function (){

    let loginForm = document.querySelector('.login-form')
    loginForm.classList.toggle('active');

});

$('#RegularBtn').on('click',function (){

    let loginForm = document.querySelector('.login-form')
    loginForm.classList.toggle('active');

});

$(document).ready(()=>{

    // setTimeout(() => {

        $("#loginn").on("click", (event) => {
            event.preventDefault()
            if ($("#username").val() === "" || $("#password").val() === "") {
                return swal("Please fill in all the fields!", "OOPS!", "error");
            }

            var username = $("#username").val();
            var password = $("#password").val();

            var url = "http://localhost:8080/validate?username=" + username + "&password=" + password;

            // let user = localStorage.getItem("userAuthToken");
            //
            // let userrr = JSON.parse(user);
            //
            // console.log(user);
            // console.log(userrr);
            // JSON.parse(localStorage.getItem("userAuthToken"))

            $.ajax({
                url: url,
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("userAuthToken"))
                },
                // data : JSON.stringify(hotel),
                success: (res) => {
                    console.log("Server : " + res.statusCode)
                    if (res.data != null) {
                        console.log(res.data.userName)
                        console.log(res.data.role)
                        console.log(res.data.isValidated)
                        if (res.data.role === "USER") {
                            swal("Login Success!", "Redirecting you to the Booking Page!", "success");
                            window.location.href = "booking.html";

                        }
                        return swal("OOPS!", "error")
                    }
                    return swal("Incorrect Username or Password!", "OOPS!", "error")


                },
                error: (err) => {
                    console.log(err.responseJSON.message)

                }
            })
        });
    // },5000)
});


// $("#loginn").on("click",()=>{
//     if($("#username").val()==="" || $("#password").val()===""){
//         return swal("Please fill in all the fields!","OOPS!","error");
//     }
//
//     var username = $("#username").val();
//     var password  = $("#password").val();
//
//     var url = "http://localhost:8080/validate?username=" + username + "&password=" + password;
//
//     // let user = localStorage.getItem("userAuthToken");
//     //
//     // let userrr = JSON.parse(user);
//     //
//     // console.log(user);
//     // console.log(userrr);
//     // JSON.parse(localStorage.getItem("userAuthToken"))
//
//     $.ajax({
//         url : url,
//         method :"GET",
//         headers : {
//             /*    "content-type":"application/json",*/
//             "Authorization" : "Bearer "+ JSON.parse(localStorage.getItem("userAuthToken"))
//         },
//         // data : JSON.stringify(hotel),
//         success : (res)=>{
//             console.log("Server : "+res.statusCode)
//             if(res.data != null){
//                 console.log(res.data.userName)
//                 console.log(res.data.role)
//                 console.log(res.data.isValidated)
//                 if(res.data.role === "USER"){
//                     swal("Login Success!", "Redirecting you to the Booking Page!", "success");
//                     window.location.href = "../bookingss/booking.html";
//
//                 }
//                 return swal("OOPS!","error")
//             }
//             return swal("Incorrect Username or Password!","OOPS!","error")
//
//
//         },
//         error : (err)=>{
//             console.log(err.statusCode)
//             console.log(err.data)
//             console.log("An error occurred : "+err.message)
//         }
//     })
// });


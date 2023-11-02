//anjali
var HAToken = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IkhBIiwic3ViIjoiYW5qYWxpIiwiaWF0IjoxNjk4MDQwNDA0LCJleHAiOjQ4NTE2NDA0MDR9.brJ8SaiTCsLYNmyJDADNV_hOCWcQ8GZx7lFdX1WqwTc";
//kasun
var VAToken = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IlZBIiwic3ViIjoia2FzdW4iLCJpYXQiOjE2OTgwNDA3NzYsImV4cCI6NDg1MTY0MDc3Nn0.Kfy3AZzucGGRjveWQTW0azWpxYziJ3xEmY25LuL41N8";
//dulanjana
var GAToken = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IkdBIiwic3ViIjoiZHVsYW5qYW5hIiwiaWF0IjoxNjk4MDQwODQ0LCJleHAiOjQ4NTE2NDA4NDR9.ZVFku0nnsLCSc9QN-1sQtCgAzlND9-eGwpsEqEaHt0I";
//malithi
var PAToken = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IlBBIiwic3ViIjoibWFsaXRoaSIsImlhdCI6MTY5ODA0MDkwNSwiZXhwIjo0ODUxNjQwOTA1fQ.I-0C7nqNmU22YEifSWvVLgtbrynlh61TZfPy98NHlmU";
//prasadi
var PDAToken = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IlBEQSIsInN1YiI6InByYXNhZGkiLCJpYXQiOjE2OTgwNDA5NjMsImV4cCI6NDg1MTY0MDk2M30.sz-7PTGq2A8K35crnZbe2HThRRy7cJjcHfG43XDGSYM";
//sandasi
var PAYAToken = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IlBBWUEiLCJzdWIiOiJzYW5kYXNpIiwiaWF0IjoxNjk4MDQxMDExLCJleHAiOjQ4NTE2NDEwMTF9.0fN8DLh3wpx_D3UeY1caA1nXpLYxKX1JWUfhdVF6MHk";
//damian
var UAToken = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IlVBIiwic3ViIjoiZGFtaWFuIiwiaWF0IjoxNjk4MDQxMDY0LCJleHAiOjQ4NTE2NDEwNjR9.QG68GCMTuVWxPmU4JcuB1qHP7OzDhuw418bSQVqJnpU";


var selectedService = '';
$(document).ready(function(){
   $('.loginformm #admin-select').click(function(){

      var comboBox = document.getElementById("admin-select");

      selectedService = comboBox.options[comboBox.selectedIndex].text;

      console.log(selectedService);

      switch (selectedService) {
         case "GuideAdmin" : guideService();
            break;
         case "HotelAdmin" : hotelService();
            break;
         case "VehicleAdmin" : vehicleService();
            break;
         case "PackageAdmin" : packageService();
            break;
         case "PaymentAdmin" : paymentService();
            break;
         case "PackageDetailAdmin" : packageDetailsService();
            break;
         case "UserAdmin" : userService();
            break;

      }
   });
});



var form = document.getElementById('form');
var nameval = document.getElementById('username');
var passwordval = document.getElementById('password');
const name_error = document.getElementById('name_error');
const password_error = document.getElementById('password_error');

form.addEventListener('submit',(e) =>{
   if (nameval.value === '' || nameval.value == null) {
      e.preventDefault();
      name_error.innerHTML = "Name is required";
      nameval.style.borderColor = "red";
      return swal("Please fill in all the fields!","OOPS!","error");
   } else {
      e.preventDefault();
      name_error.innerHTML = "";
      nameval.style.borderColor = "green";
   }

   if (passwordval.value === '' || passwordval.value == null) {
      e.preventDefault();
      password_error.innerHTML = "Name is required";
      passwordval.style.borderColor = "red";
      return swal("Please fill in all the fields!","OOPS!","error");
   } else {
      e.preventDefault();
      password_error.innerHTML = "";
      passwordval.style.borderColor = "green";
   }


})


function guideService() {

   $(document).ready(()=>{
      localStorage.setItem("adminAuthToken",JSON.stringify(GAToken))
   });


   $("#submit").on("click",()=>{
      // if($("#username").val()==="" || $("#password").val()===""){
      //    return swal("Please fill in all the fields!","OOPS!","error");
      // }

      var username = $("#username").val();
      var password  = $("#password").val();

      var url = "http://localhost:8080/validate?username=" + username + "&password=" + password;

      $.ajax({
         url : url,
         method :"GET",
         headers : {
            /*    "content-type":"application/json",*/
            "Authorization" : "Bearer "+JSON.parse(localStorage.getItem("adminAuthToken"))
         },
         // data : JSON.stringify(hotel),
         success : (res)=>{
            console.log("Server : "+res.statusCode)



            if(res.data != null){
               console.log(res.data.userName)
               console.log(res.data.role)
               console.log(res.data.isValidated)
               if(res.data.role === "GA" && selectedService === "GuideAdmin"){
                  swal("Login Success!", "Redirecting you to the admin dashboard!", "success");
                  window.location.href = "../Guide/GuideDashBoard.html";

               }
               return swal("Wrong Service!","OOPS!","error")
            }
            return swal("Incorrect Username or Password!","OOPS!","error")


         },
         error : (err)=>{
            console.log("An error occurred : "+err.statusText)
         }
      })
   });
}

function hotelService() {
   $(document).ready(()=>{
      localStorage.setItem("adminAuthToken",JSON.stringify(HAToken))
   });


   $("#submit").on("click",()=>{
      // if($("#username").val()==="" || $("#password").val()===""){
      //    return swal("Please fill in all the fields!","OOPS!","error");
      // }

      var username = $("#username").val();
      var password  = $("#password").val();

      var url = "http://localhost:8080/validate?username=" + username + "&password=" + password;

      $.ajax({
         url : url,
         method :"GET",
         headers : {
            /*    "content-type":"application/json",*/
            "Authorization" : "Bearer "+JSON.parse(localStorage.getItem("adminAuthToken"))
         },
         // data : JSON.stringify(hotel),
         success : (res)=>{
            console.log("Server : "+res.statusCode)


            if(res.data != null) {
               console.log(res.data.userName)
               console.log(res.data.role)
               console.log(res.data.isValidated)
               if (res.data.role === "HA" && selectedService === "HotelAdmin") {
                  swal("Login Success!", "Redirecting you to the admin dashboard!", "success");
                  window.location.href = "../Hotel/HotelDashBoard.html";
               }
               return swal("Wrong Service!", "OOPS!", "error")
            }
            return swal("Incorrect Username or Password!","OOPS!","error")
         },
         error : (err)=>{
            console.log("An error occurred : "+err.statusText)
         }
      })
   });
}

function vehicleService() {
   $(document).ready(()=>{
      localStorage.setItem("adminAuthToken",JSON.stringify(VAToken))
   });


   $("#submit").on("click",()=>{
      // if($("#username").val()==="" || $("#password").val()===""){
      //    return swal("Please fill in all the fields!","OOPS!","error");
      // }

      var username = $("#username").val();
      var password  = $("#password").val();

      var url = "http://localhost:8080/validate?username=" + username + "&password=" + password;

      $.ajax({
         url : url,
         method :"GET",
         headers : {
            /*    "content-type":"application/json",*/
            "Authorization" : "Bearer "+JSON.parse(localStorage.getItem("adminAuthToken"))
         },
         // data : JSON.stringify(hotel),
         success : (res)=>{
            console.log("Server : "+res.statusCode)

            if(res.data != null) {
               console.log(res.data.userName)
               console.log(res.data.isValidated)
               console.log(res.data.role)
               if (res.data.role === "VA" && selectedService === "VehicleAdmin") {
                  swal("Login Success!", "Redirecting you to the admin dashboard!", "success");
                  window.location.href = "../Vehicle/VehicleDashBoard.html";
               }
               return swal("Wrong Service!", "OOPS!", "error")
            }
            return swal("Incorrect Username or Password!","OOPS!","error")
         },
         error : (err)=>{
            console.log("An error occurred : "+err.statusText)
         }
      })
   });
}

function packageService() {
   $(document).ready(()=>{
      localStorage.setItem("adminAuthToken",JSON.stringify(PAToken))
   });


   $("#submit").on("click",()=>{
      // if($("#username").val()==="" || $("#password").val()===""){
      //    return swal("Please fill in all the fields!","OOPS!","error");
      // }

      var username = $("#username").val();
      var password  = $("#password").val();

      var url = "http://localhost:8080/validate?username=" + username + "&password=" + password;

      $.ajax({
         url : url,
         method :"GET",
         headers : {
            /*    "content-type":"application/json",*/
            "Authorization" : "Bearer "+JSON.parse(localStorage.getItem("adminAuthToken"))
         },
         // data : JSON.stringify(hotel),
         success : (res)=>{
            console.log("Server : "+res.statusCode)
            console.log(res.data.userName)
            console.log(res.data.isValidated)
            console.log(res.data.role)

            if(res.data.role === "PA" && selectedService === "PackageAdmin"){
               swal("Login Success!", "Redirecting you to the admin dashboard!", "success");
               window.location.href = "../Package/PackagedashBoard.html";

            }
            return swal("Wrong Service!","OOPS!","error")

         },
         error : (err)=>{
            console.log("An error occurred : "+err.statusText)
         }
      })
   });
}




function packageDetailsService() {
   $(document).ready(()=>{
      localStorage.setItem("adminAuthToken",JSON.stringify(PDAToken))
   });


   $("#submit").on("click",()=>{
      // if($("#username").val()==="" || $("#password").val()===""){
      //    return swal("Please fill in all the fields!","OOPS!","error");
      // }

      var username = $("#username").val();
      var password  = $("#password").val();

      var url = "http://localhost:8080/validate?username=" + username + "&password=" + password;

      $.ajax({
         url : url,
         method :"GET",
         headers : {
            /*    "content-type":"application/json",*/
            "Authorization" : "Bearer "+JSON.parse(localStorage.getItem("adminAuthToken"))
         },
         // data : JSON.stringify(hotel),
         success : (res)=>{
            console.log("Server : "+res.statusCode)
            console.log(res.data.userName)
            console.log(res.data.isValidated)
            console.log(res.data.role)

            if(res.data.role === "PDA" && selectedService === "PackageDetailAdmin"){
               swal("Login Success!", "Redirecting you to the admin dashboard!", "success");
               window.location.href = "../PackageDetails/PackageDetaildashBoard.html";

            }
            return swal("Wrong Service!","OOPS!","error")

         },
         error : (err)=>{
            console.log("An error occurred : "+err.statusText)
         }
      })
   });
}

function paymentService() {
   $(document).ready(()=>{
      localStorage.setItem("adminAuthToken",JSON.stringify(PAYAToken))
   });


   $("#submit").on("click",()=>{
      // if($("#username").val()==="" || $("#password").val()===""){
      //    return swal("Please fill in all the fields!","OOPS!","error");
      // }

      var username = $("#username").val();
      var password  = $("#password").val();

      var url = "http://localhost:8080/validate?username=" + username + "&password=" + password;

      $.ajax({
         url : url,
         method :"GET",
         headers : {
            /*    "content-type":"application/json",*/
            "Authorization" : "Bearer "+JSON.parse(localStorage.getItem("adminAuthToken"))
         },
         // data : JSON.stringify(hotel),
         success : (res)=>{
            console.log("Server : "+res.statusCode)
            console.log(res.data.userName)
            console.log(res.data.isValidated)
            console.log(res.data.role)

            if(res.data.role === "PAYA" && selectedService === "PaymentAdmin"){
               swal("Login Success!", "Redirecting you to the admin dashboard!", "success");
               window.location.href = "../Payment/paymentDashBoard.html";

            }
            return swal("Bad Credentials!","OOPS!","error")

         },
         error : (err)=>{
            console.log("An error occurred : "+err.statusText)
         }
      })
   });
}

function userService() {
   $(document).ready(()=>{
      localStorage.setItem("adminAuthToken",JSON.stringify(UAToken))
   });


   $("#submit").on("click",()=>{
      // if($("#username").val()==="" || $("#password").val()===""){
      //    return swal("Please fill in all the fields!","OOPS!","error");
      // }

      var username = $("#username").val();
      var password  = $("#password").val();

      var url = "http://localhost:8080/validate?username=" + username + "&password=" + password;

      $.ajax({
         url : url,
         method :"GET",
         headers : {
            /*    "content-type":"application/json",*/
            "Authorization" : "Bearer "+JSON.parse(localStorage.getItem("adminAuthToken"))
         },
         // data : JSON.stringify(hotel),
         success : (res)=>{
            console.log("Server : "+res.statusCode)
            console.log(res.data.userName)
            console.log(res.data.isValidated)
            console.log(res.data.role)

            if(res.data.role === "UA" && selectedService === "UserAdmin"){
               swal("Login Success!", "Redirecting you to the admin dashboard!", "success");
               window.location.href = "../User/UserDashBoard.html";

            }
            return swal("Bad Credentials!","OOPS!","error")

         },
         error : (err)=>{
            console.log("An error occurred : "+err.statusText)
         }
      })
   });
}














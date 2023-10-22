//anjali
var HAToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbmphbGkiLCJpYXQiOjE2OTc4OTE5OTIsImV4cCI6NDg1MTQ5MTk5Mn0.xxxS3CU8HGIkvd4vETMO7m95EU2vryQTTDPHe6e9o-g";
//kasun
var VAToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrYXN1biIsImlhdCI6MTY5Nzg5MjEzMSwiZXhwIjo0ODUxNDkyMTMxfQ.hweUKUmxIJT77ugJBBkYoyRxjbZ1eHmEJNKcu0yTQ2U"
//dulanjana
var GAToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkdWxhbmphbmEiLCJpYXQiOjE2OTc4OTIyOTUsImV4cCI6NDg1MTQ5MjI5NX0.DmVOZDFi5b1o630bJ8BZP1pxEbuolQgFycv0pOe2uhI"
//malithi
var PAToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYWxpdGhpIiwiaWF0IjoxNjk3ODkyNDAyLCJleHAiOjQ4NTE0OTI0MDJ9.gtcCEpHg3WDTq5DIYKu27WyMGP-JYMJmHTnmcgJzLIM"
//prasadi
var PDAToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwcmFzYWRpIiwiaWF0IjoxNjk3ODkyNTE5LCJleHAiOjQ4NTE0OTI1MTl9.TU0_2KNTJx5Mafwb0DPLUSCriM_VXfq-HFHpdyaOM68"
//sandasi
var PAYAToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYW5kYXNpIiwiaWF0IjoxNjk3ODkyNjI5LCJleHAiOjQ4NTE0OTI2Mjl9.woXWzlMHyW_cEPITfyzEOwuk5R3lfIie9J2gCVDR03Y"
//damian
var UAToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkYW1pYW4iLCJpYXQiOjE2OTc4OTI3MzMsImV4cCI6NDg1MTQ5MjczM30.yKtbgU1-n7yi_vgrrTNtHKASUOdGJUQL3WVf3H9Iah8"


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


function guideService() {

   $(document).ready(()=>{
      localStorage.setItem("adminAuthToken",JSON.stringify(GAToken))
   });


   $("#submit").on("click",()=>{
      if($("#username").val()==="" || $("#password").val()===""){
         return swal("Please fill in all the fields!","OOPS!","error");
      }

      var username = $("#username").val();
      var password  = $("#password").val();

      var url = "http://localhost:8080/api/v1/user/validate?username=" + username + "&password=" + password;

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
      if($("#username").val()==="" || $("#password").val()===""){
         return swal("Please fill in all the fields!","OOPS!","error");
      }

      var username = $("#username").val();
      var password  = $("#password").val();

      var url = "http://localhost:8080/api/v1/user/validate?username=" + username + "&password=" + password;

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
      if($("#username").val()==="" || $("#password").val()===""){
         return swal("Please fill in all the fields!","OOPS!","error");
      }

      var username = $("#username").val();
      var password  = $("#password").val();

      var url = "http://localhost:8080/api/v1/user/validate?username=" + username + "&password=" + password;

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
      if($("#username").val()==="" || $("#password").val()===""){
         return swal("Please fill in all the fields!","OOPS!","error");
      }

      var username = $("#username").val();
      var password  = $("#password").val();

      var url = "http://localhost:8080/api/v1/user/validate?username=" + username + "&password=" + password;

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



//
// function packageDetailsService() {
//    $(document).ready(()=>{
//       localStorage.setItem("adminAuthToken",JSON.stringify(GAToken))
//    });
//
//
//    $("#submit").on("click",()=>{
//       if($("#username").val()==="" || $("#password").val()===""){
//          return swal("Please fill in all the fields!","OOPS!","error");
//       }
//
//       var username = $("#username").val();
//       var password  = $("#password").val();
//
//       var url = "http://localhost:8080/api/v1/user/validate?username=" + username + "&password=" + password;
//
//       $.ajax({
//          url : url,
//          method :"GET",
//          headers : {
//             /*    "content-type":"application/json",*/
//             "Authorization" : "Bearer "+JSON.parse(localStorage.getItem("adminAuthToken"))
//          },
//          // data : JSON.stringify(hotel),
//          success : (res)=>{
//             console.log("Server : "+res.statusCode)
//             console.log(res.data.userName)
//             console.log(res.data.isValidated)
//             console.log(res.data.role)
//
//             if(res.data.role === "GA" && selectedService === "GuideAdmin"){
//                swal("Login Success!", "Redirecting you to the admin dashboard!", "success");
//                window.location.href = "../Guide/GuideDashBoard.html";
//
//             }
//             return swal("Bad Credentials!","OOPS!","error")
//
//          },
//          error : (err)=>{
//             console.log("An error occurred : "+err.statusText)
//          }
//       })
//    });
// }
//
// function paymentService() {
//    $(document).ready(()=>{
//       localStorage.setItem("adminAuthToken",JSON.stringify(GAToken))
//    });
//
//
//    $("#submit").on("click",()=>{
//       if($("#username").val()==="" || $("#password").val()===""){
//          return swal("Please fill in all the fields!","OOPS!","error");
//       }
//
//       var username = $("#username").val();
//       var password  = $("#password").val();
//
//       var url = "http://localhost:8080/api/v1/user/validate?username=" + username + "&password=" + password;
//
//       $.ajax({
//          url : url,
//          method :"GET",
//          headers : {
//             /*    "content-type":"application/json",*/
//             "Authorization" : "Bearer "+JSON.parse(localStorage.getItem("adminAuthToken"))
//          },
//          // data : JSON.stringify(hotel),
//          success : (res)=>{
//             console.log("Server : "+res.statusCode)
//             console.log(res.data.userName)
//             console.log(res.data.isValidated)
//             console.log(res.data.role)
//
//             if(res.data.role === "GA" && selectedService === "GuideAdmin"){
//                swal("Login Success!", "Redirecting you to the admin dashboard!", "success");
//                window.location.href = "../Guide/GuideDashBoard.html";
//
//             }
//             return swal("Bad Credentials!","OOPS!","error")
//
//          },
//          error : (err)=>{
//             console.log("An error occurred : "+err.statusText)
//          }
//       })
//    });
// }
//
// function userService() {
//    $(document).ready(()=>{
//       localStorage.setItem("adminAuthToken",JSON.stringify(GAToken))
//    });
//
//
//    $("#submit").on("click",()=>{
//       if($("#username").val()==="" || $("#password").val()===""){
//          return swal("Please fill in all the fields!","OOPS!","error");
//       }
//
//       var username = $("#username").val();
//       var password  = $("#password").val();
//
//       var url = "http://localhost:8080/api/v1/user/validate?username=" + username + "&password=" + password;
//
//       $.ajax({
//          url : url,
//          method :"GET",
//          headers : {
//             /*    "content-type":"application/json",*/
//             "Authorization" : "Bearer "+JSON.parse(localStorage.getItem("adminAuthToken"))
//          },
//          // data : JSON.stringify(hotel),
//          success : (res)=>{
//             console.log("Server : "+res.statusCode)
//             console.log(res.data.userName)
//             console.log(res.data.isValidated)
//             console.log(res.data.role)
//
//             if(res.data.role === "GA" && selectedService === "GuideAdmin"){
//                swal("Login Success!", "Redirecting you to the admin dashboard!", "success");
//                window.location.href = "../Guide/GuideDashBoard.html";
//
//             }
//             return swal("Bad Credentials!","OOPS!","error")
//
//          },
//          error : (err)=>{
//             console.log("An error occurred : "+err.statusText)
//          }
//       })
//    });
// }














$(document).ready(()=>{
    localStorage.setItem("paymentAuthToken",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IlBBWUEiLCJzdWIiOiJzYW5kYXNpIiwiaWF0IjoxNjk4MDQxMDExLCJleHAiOjQ4NTE2NDEwMTF9.0fN8DLh3wpx_D3UeY1caA1nXpLYxKX1JWUfhdVF6MHk"))

    var userrr = JSON.parse(localStorage.getItem("userName"));
    console.log(userrr);

    clearFields()
});


document.querySelector('.card-number-input').oninput = () =>{
    document.querySelector('.card-number-box').innerText = document.querySelector('.card-number-input').value;
}

document.querySelector('.card-holder-input').oninput = () =>{
    document.querySelector('.card-holder-name').innerText = document.querySelector('.card-holder-input').value;
}

document.querySelector('.month-input').oninput = () =>{
    document.querySelector('.exp-month').innerText = document.querySelector('.month-input').value;
}

document.querySelector('.year-input').oninput = () =>{
    document.querySelector('.exp-year').innerText = document.querySelector('.year-input').value;
}

document.querySelector('.cvv-input').onmouseenter = () =>{
    document.querySelector('.front').style.transform = 'perspective(1000px) rotateY(-180deg)';
    document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(0deg)';
}

document.querySelector('.cvv-input').onmouseleave = () =>{
    document.querySelector('.front').style.transform = 'perspective(1000px) rotateY(0deg)';
    document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(180deg)';
}

document.querySelector('.cvv-input').oninput = () =>{
    document.querySelector('.cvv-box').innerText = document.querySelector('.cvv-input').value;
}

//---------------------------------------------------------------------------------------------------------------------------

var PackageDetailId = "";
var PackageValue = 0;
var userID = "";

var userNamee ="";
var userEmail ="";
// console.log(userID)
$(document).ready(function(){
    let username = JSON.parse(localStorage.getItem("userName"));


    $.ajax({
        url: "http://localhost:8080/getUserDetailsByUserName?UserName=" + username,
        method: "GET",
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("paymentAuthToken"))
        },
        success: (res) => {
            console.log(res.data)
            if (res.statusCode === 200 || res.statusCode === 201) {

                console.log(res.data.userId)

                $("#userid").val(res.data.userId);

                userNamee = res.data.userName;
                userEmail = res.data.userEmail;

                userID = res.data.userId;

                // return swal("Done!", "success");

            }
            // swal("OOPS!","error");
            // clearFields();

        },
        error: (error) => {
            swal("OOPS!", "An error occurred while communicating with the server ! ", "error");
        }
    });

    setTimeout(() => {
    $.ajax({
        url: "http://localhost:8083/getPackageDetailByUserName?PackageDetailName=" + $("#userid").val(),
        method: "GET",
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("paymentAuthToken"))
        },
        success: (res) => {
            console.log(res.message)
            console.log(res.data)
            if (res.statusCode === 200 || res.statusCode === 201) {

                console.log(res.data.userId)
                console.log(res.data.packageDetailId)
                console.log(res.data.packageValue)

                $("#userid").val(res.data.userId);
                $("#packdetailid").val(res.data.packageDetailId);
                $("#amount").val(res.data.packageValue);

                PackageDetailId = res.data.packageDetailId;
                PackageValue = res.data.packageValue;

                // return swal("Done!", "success");

            }
            // swal("OOPS!","error");
            // clearFields();

        },
        error: (error) => {
            swal("OOPS!", "An error occurred while communicating with the server ! ", "error");
        }
    });
    },5000)
});


var dateval = document.getElementById('date');
var useridval = document.getElementById('userid');
var packagedetailidval = document.getElementById('packdetailid');
var amountval = document.getElementById('amount');
var cvvval = document.getElementById('cvv');
var cardnoval = document.getElementById('cardno');
var cardholderval = document.getElementById('cardholder');
var form = document.getElementById('form');

const date_error = document.getElementById('date_error');
const userid_error = document.getElementById('userid_error');
const packdetailid_error = document.getElementById('packdetailid_error');
const amount_error = document.getElementById('amount_error');
const cvv_error = document.getElementById('cvv_error');
const cardno_error = document.getElementById('cardno_error');
const cardholder_error = document.getElementById('cardholder_error');

const lowercaseRegex = /[a-z]/;
const uppercaseRegex = /[A-Z]/;
const digitRegex = /[0-9]/;


form.addEventListener('submit',(e) => {
    e.preventDefault();
    if (dateval.value === '' || dateval.value == null) {
        e.preventDefault();
        date_error.innerHTML = "Date is required";
        dateval.style.borderColor = "red";
    } else {
        e.preventDefault();
        date_error.innerHTML = "";
        dateval.style.borderColor = "green";
    }


    if (useridval.value === '' || useridval.value == null) {
        e.preventDefault();
        userid_error.innerHTML = "UserId is required";
        useridval.style.borderColor = "red";
    } else {
        e.preventDefault();
        userid_error.innerHTML = "";
        useridval.style.borderColor = "green";
    }

    if (packagedetailidval.value === '' || packagedetailidval.value == null) {
        e.preventDefault();
        packdetailid_error.innerHTML = "PId is required";
        packagedetailidval.style.borderColor = "red";
    } else {
        e.preventDefault();
        packdetailid_error.innerHTML = "";
        packagedetailidval.style.borderColor = "green";
    }

    if (amountval.value === '' || amountval.value == null) {
        e.preventDefault();
        amount_error.innerHTML = "Amount is required";
        amountval.style.borderColor = "red";
    } else {
        e.preventDefault();
        amount_error.innerHTML = "";
        amountval.style.borderColor = "green";
    }

    if (cvvval.value === '' || cvvval.value == null || lowercaseRegex.test(cvvval.value)|| uppercaseRegex.test(cvvval.value)) {
        e.preventDefault();
        cvv_error.innerHTML = "Valid CVV is required";
        cvvval.style.borderColor = "red";
    }else if (!digitRegex.test(cvvval.value)){
        e.preventDefault();
        cvv_error.innerHTML = "Valid CVV must be numbers";
        cvvval.style.borderColor = "red";
    }else {
        e.preventDefault();
        cvv_error.innerHTML = "";
        cvvval.style.borderColor = "green";
    }

    if (cardnoval.value === '' || cardnoval.value == null || lowercaseRegex.test(cardnoval.value)|| uppercaseRegex.test(cardnoval.value) || !(cardnoval.value.length === 16)  ) {
        e.preventDefault();
        cardno_error.innerHTML = "Valid Card Number is required";
        cardnoval.style.borderColor = "red";
    } else {
        e.preventDefault();
        cardno_error.innerHTML = "";
        cardnoval.style.borderColor = "green";
    }

    if (cardholderval.value === '' || cardholderval.value == null) {
        e.preventDefault();
        cardholder_error.innerHTML = "name is required";
        cardholderval.style.borderColor = "red";
    } else {
        e.preventDefault();
        cardholder_error.innerHTML = "";
        cardholderval.style.borderColor = "green";
    }
})


// function sendMail() {
//     var params = {
//         cardNo:document.getElementById("cardno").value,
//         cardHolder:document.getElementById("cardholder").value,
//         date:document.getElementById("date").value,
//         userid:document.getElementById("userid").value,
//         packDetailId:document.getElementById("packdetailid").value,
//         amount:document.getElementById("amount").value,
//         usernamee: userNamee,
//         useremaill: userEmail
//     };
//
//     const serviceId = "service_l6o1bun";
//     const templateId = "template_216j9i9";
//
//
//     emailjs.send(serviceId,templateId,params)
//         .then(
//             res =>{
//                 console.log(res);
//                 swal("Done!", response.message, "success")
//             }
//         )
//         .catch(err=>console.log(err));
// }

function sendMail() {
    // var cardNo = document.getElementById("cardno").value;
    // var cardHolder = document.getElementById("cardholder").value;
    // var date = document.getElementById("date").value;
    // // var userid = document.getElementById("userid").value; // Make sure this field is enabled for input
    // var packDetailId = document.getElementById("packdetailid").value; // Make sure this field is enabled for input
    // var amount = document.getElementById("amount").value; // Make sure this field is enabled for input

    const params = {

        cardHolder: document.getElementById("cardholder").value,
        cardNo: document.getElementById("cardno").value,
        packDetailId: document.getElementById("packdetailid").value,
        amount: document.getElementById("amount").value,
        date: document.getElementById("date").value
    };

    const serviceId = "service_l6o1bun";
    const templateId = "template_216j9i9";

    emailjs.send(serviceId,templateId,params)
        .then(
            res => {
                console.log(res);
                swal("Done!", "Your payment has been sent successfully", "success");
            }
        )
        .catch(err => console.log(err));
}












// save
$(document).ready(() => {
    $(document).on("click", "#Submit", () => {
        if (!validator()) {
            return swal("Operation failed!", "Please fill all the fields!", "error")
        }

        setTimeout(() => {
            let payment = {
                paymentId: "",
                paymentDate: $("#date").val(),
                paymentAmount: $("#amount").val(),
                userId: $("#userid").val(),
                packageDetailsId: $("#packdetailid").val()
            }

            $.ajax({
                url: "http://localhost:8086/sp",
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("paymentAuthToken"))
                },
                data: JSON.stringify(payment),
                success: (response) => {
                    if (response.statusCode === 200 || response.statusCode === 201) {
                        sendMail();
                        swal("Done!", response.message, "success")
                        clearFields();

                    } else {
                        return swal("OOPS!", response.message, "error")
                    }


                }, error: (error) => {
                    swal("OOPS!", "An error occurred while communicating with the server ! ", "error");
                },
            })
        },5000)
    })
});

function validator() {
    if ($("#date").val() === "" || $("#amount").val() === "" || $("#userid").val() === "" || $("#packdetailid").val() === "" || $("#cardno").val() === "" || $("#cardholder").val() === ""  || $("#cvv").val() === "") {
        return false;
    }
    return true;
}

function clearFields() {
    $("#date").val("");
    $("#amount").val("");
    $("#userid").val("");
    $("#packdetailid").val("");
    $("#cardno").val("");
    $("#cardholder").val("");
    $("#cvv").val("");
    // $("#month").val("") ;
    // $("#year").val("");
}



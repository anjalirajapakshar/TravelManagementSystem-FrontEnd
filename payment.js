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
                        clearFields();
                        swal("Done!", response.message, "success")
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



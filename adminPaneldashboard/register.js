$(document).ready(() => {
    clearFields()
})


var nameval = document.getElementById('name');
var passwordval = document.getElementById('password');
var roleval = document.getElementById('role');
var nicval = document.getElementById('nic');
var addressval = document.getElementById('address');
var dobval = document.getElementById('dob');
var phoneval = document.getElementById('phone');
var emailval = document.getElementById('email');
var genderval = document.getElementById('gender');
var form = document.getElementById('form');
//
// form.addEventListener('submit' , e =>{
//    e.preventDefault();
//
//    validateInputs();
//
// });
//
//
//
// const setError = (element , message) => {
//     const inputControl = element.parentElement;
//     const  errorDisplay = inputControl.querySelector('.error');
//
//     errorDisplay.innerText = message;
//     inputControl.classList.add('error');
//     inputControl.classList.remove('success');
// }
//
//
// const setSuccess = element => {
//     const inputControl = element.parentElement;
//     const  errorDisplay = inputControl.querySelector('.error');
//
//     errorDisplay.innerText = '';
//     inputControl.classList.add('success');
//     inputControl.classList.remove('error');
//
// }
//
//
// function validateInputs() {
//     const namee = nameval.value.trim();
//     const passwordd = passwordval.value.trim();
//     const rolee = roleval.value.trim();
//     const nicc = nicval.value.trim();
//     const addresss = addressval.value.trim();
//     const dobb = dobval.value.trim();
//     const phonee = phoneval.value.trim();
//     const emiall = emailval.value.trim();
//     const genderr = genderval.value.trim();
//
//     if (namee === ''){
//         setError(nameval,"UserName is Required!!!")
//     }else {
//         setSuccess(nameval)
//     }
//
//
// }
//
//
//


const name_error = document.getElementById('name_error');
const password_error = document.getElementById('password_error');
const role_error = document.getElementById('role_error');
const nic_error = document.getElementById('nic_error');
const address_error = document.getElementById('address_error');
const dob_error = document.getElementById('dob_error');
const phone_error = document.getElementById('phone_error');
const email_error = document.getElementById('email_error');
const gender_error = document.getElementById('gender_error');


const lowercaseRegex = /[a-z]/;
const uppercaseRegex = /[A-Z]/;
const digitRegex = /\d/;
const specialCharacterRegex = /[!@#\$%^&*]/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const nicRegex = /^[0-9]{12}[Vv]$/;
const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
const phoneRegex = /^0\d{9}$/;

form.addEventListener('submit',(e) =>{

    if (nameval.value === '' || nameval.value == null) {
        e.preventDefault();
        name_error.innerHTML = "Name is required";
        nameval.style.borderColor = "red";
    } else {
        e.preventDefault();
        name_error.innerHTML = "";
        nameval.style.borderColor = "green";
    }

//-------------------------------------------------------------------------------------------------------------
    if (passwordval.value === '' || passwordval.value === null || passwordval.value.length < 8) {
        e.preventDefault();
        password_error.innerHTML = "Password is required and must be 8 digits long";
        passwordval.style.borderColor = "red";
    } else if (!uppercaseRegex.test(passwordval.value) || !lowercaseRegex.test(passwordval.value)) {
        e.preventDefault();
        password_error.innerHTML = "Password must contain at least one uppercase letter and one lowercase letter.";
        passwordval.style.borderColor = "red";
    } else if (!digitRegex.test(passwordval.value)) {
        e.preventDefault();
        password_error.innerHTML = "Password must contain at least one digit.";
        passwordval.style.borderColor = "red";
    } else if (!specialCharacterRegex.test(passwordval.value)) {
        e.preventDefault();
        password_error.innerHTML = "Password must contain at least one special character.";
        passwordval.style.borderColor = "red";
    } else {
        e.preventDefault();
        passwordval.style.borderColor = "green";
        password_error.innerHTML = "";
    }

//-----------------------------------------------------------------------------------------------------------
    if (emailRegex.test(emailval.value)) {
        e.preventDefault();
        emailval.style.borderColor = "green";
        email_error.innerHTML = "";
    } else {
        e.preventDefault();
        email_error.innerHTML = "Please enter a valid email address.";
        emailval.style.borderColor = "red";
    }
//-----------------------------------------------------------------------------------------------------------

    if (roleval.value === "USER") {
        e.preventDefault();
        roleval.style.borderColor = "green";
        role_error.innerHTML = "";
    } else {
        e.preventDefault();
        role_error.innerHTML = "Your role should be a USER otherwise you cant register!!";
        roleval.style.borderColor = "red";
    }

//-----------------------------------------------------------------------------------------------------------
    if (nicval.value === "") {
        e.preventDefault();
        nic_error.innerHTML = "Please enter a valid Sri Lankan NIC number (e.g., 123456789V).!!";
        nicval.style.borderColor = "red";

    }else if (nicRegex.test(nicval.value) || nicval.value.length < 13){
        e.preventDefault();
        nicval.style.borderColor = "green";
        nic_error.innerHTML = "";
    }

//-----------------------------------------------------------------------------------------------------------

    // if (dateRegex.test(dobval.value)) {
    //     e.preventDefault();
    //     dobval.style.borderColor = "green";
    //     dob_error.innerHTML = "";
    // } else {
    //     e.preventDefault();
    //     dobval.style.borderColor = "red";
    //     dob_error.innerHTML = "Please enter a valid date(MM/DD/YYYY).";
    // }

//-----------------------------------------------------------------------------------------------------------

    if (phoneRegex.test(phoneval.value)) {
        e.preventDefault();
        phoneval.style.borderColor = "green";
        phone_error.innerHTML = "";
    } else {
        e.preventDefault();
        phoneval.style.borderColor = "red";
        phone_error.innerHTML = "Please enter a valid phone number (e.g., 0712345678).";
    }

    //-----------------------------------------------------------------------------------------------------------

    if (genderval.value === "Male" || genderval.value === "Female") {
        e.preventDefault();
        genderval.style.borderColor = "green";
        gender_error.innerHTML = "";
    } else {
        e.preventDefault();
        gender_error.innerHTML = "Your gender should be a Male/Female/other!!";
        genderval.style.borderColor = "red";
    }

})


//save
$(document).ready(() => {
    $(document).on("click", "#submitRegister", () => {
        if (!validator()) {
            return swal("Operation failed!", "Please fill all the fields!", "error")
        }

        setTimeout(() => {
            let user = {
                userId: "",
                userName: $("#name").val(),
                pw: $("#password").val(),
                role: $("#role").val(),
                userNIC: $("#nic").val(),
                userAddress: $("#address").val(),
                userDOB: $("#dob").val(),
                userPhone: $("#phone").val(),
                userEmail: $("#email").val(),
                gender: $("#gender").val(),
                userNICimageLocation: $("#userNICimageLocation").val(),
                userImageLocation: $("#userImageLocation").val(),
                isValidated : false
            }

            $.ajax({
                url: "http://localhost:8080/api/v1/auth/register",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // "Authorization": "Bearer " + JSON.parse(localStorage.getItem("userAuthToken"))
                },
                data: JSON.stringify(user),
                success: (response) => {
                    if (response.statusCode === 200 || response.statusCode === 201) {
                        $("#name").val("");$("#password").val("");$("#role").val("");$("#nic").val("");$("#address").val("");$("#dob").val("");
                        $("#phone").val("");$("#email").val("");$("#gender").val("");$("#userNICimageLocation").val("");$("#userImageLocation").val("");
                        swal("Done!", response.message, "success")

                        localStorage.setItem("userAuthToken",JSON.stringify(response.data))
                        localStorage.setItem("userName",JSON.stringify(user.userName));

                        window.location.href ="../index.html";

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
    if ($("#name").val() === "" || $("#password").val() === "" || $("#role").val() === "" || $("#nic").val() === "" || $("#address").val() === "" || $("#dob").val() === "" || $("#phone").val() === "" || $("#email").val() === "" || $("#gender").val() === "") {
        return false;
    }
    return true;
}

function clearFields() {
    $("#name").val("");
    $("#password").val("");
    $("#role").val("");
    $("#nic").val("");
    $("#address").val("");
    $("#dob").val("");
    $("#phone").val("");
    $("#email").val("");
    $("#gender").val("");
    $("#userNICImageLocation").val("");
    $("#userImageLocation").val("");

}






























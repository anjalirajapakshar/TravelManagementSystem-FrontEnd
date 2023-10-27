$(document).ready(()=>{
    localStorage.setItem("userToken",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IlVBIiwic3ViIjoiZGFtaWFuIiwiaWF0IjoxNjk4MDQxMDY0LCJleHAiOjQ4NTE2NDEwNjR9.QG68GCMTuVWxPmU4JcuB1qHP7OzDhuw418bSQVqJnpU"))
    $("#UserId").prop("disabled", true);
    addTableField();
});


// save
$(document).ready(() => {
    $(document).on("click", "#Submit", () => {
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
                userNICimageLocation: $("#userNICImageLocation").val(),
                userImageLocation: $("#userimageLocation").val(),
                isValidated : false
            }

            $.ajax({
                url: "http://localhost:8080/api/v1/auth/register",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("userToken"))
                },
                data: JSON.stringify(user),
                success: (response) => {
                    if (response.statusCode === 200 || response.statusCode === 201) {
                        addTableField();
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

// update
$(document).ready(() => {
    $(document).on("click", "#Update", () => {
        if (!validator()) {
            return swal("Operation failed!", "Please fill all the fields!", "error")
        }

        setTimeout(() => {
            let user = {
                userId: $("#UserId").val(),
                userName: $("#name").val(),
                pw: $("#password").val(),
                role: $("#role").val(),
                userNIC: $("#nic").val(),
                userAddress: $("#address").val(),
                userDOB: $("#dob").val(),
                userPhone: $("#phone").val(),
                userEmail: $("#email").val(),
                gender: $("#gender").val(),
                userNICimageLocation: $("#userNICImageLocation").val(),
                userImageLocation: $("#userimageLocation").val(),
                isValidated : false
            }

            $.ajax({
                url: "http://localhost:8080/update",
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("userToken"))
                },
                data: JSON.stringify(user),
                success: (response) => {
                    if (response.statusCode === 200 || response.statusCode === 201) {
                        addTableField();
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

//search
$(document).ready(() => {
    $(document).on("keydown", "#name", (event) => {

        if (event.key === 'Enter') {
            $.ajax({
                url: "http://localhost:8080/getUserDetailsByUserName?UserName=" + $("#name").val(),
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("userToken"))
                },
                success: (res) => {
                    console.log(res.data)
                    if (res.statusCode === 200 || res.statusCode === 201) {
                        $("#UserId").prop("disabled", false);
                        $("#UserId").val(res.data.userId);
                        $("#UserId").prop("disabled", true);
                        $("#name").val(res.data.userName),
                        $("#password").val(res.data.pw),
                        $("#role").val(res.data.role),
                        $("#nic").val(res.data.userNIC),
                        $("#address").val(res.data.userAddress),
                        $("#dob").val(res.data.userDOB),
                        $("#phone").val(res.data.userPhone),
                        $("#email").val(res.data.userEmail),
                        $("#gender").val(res.data.gender)

                        return swal("Done!", "success");

                    }
                    swal("OOPS!","error");
                    clearFields();

                },
                error: (error) => {
                    swal("OOPS!", "An error occurred while communicating with the server ! ", "error");
                }
            });
        }
    })
});

//delete
$(document).ready(() => {

        $(document).on("click", "#deleteGuide", () => {
            if ($("#UserId").val() === "") {
                return swal("OOPS!", "Please enter a Guide name to delete!", "error");
            }

            $.ajax({
                url: "http://localhost:8080/delete?userId=" + $("#UserId").val(),
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("userToken"))
                },
                success: (res) => {
                    console.log(res.data)
                    if (res.statusCode === 200 || res.statusCode === 201) {
                        addTableField();
                        clearFields();
                        return swal("Done!", res.message, "success");


                    }
                    swal("OOPS!", res.message, "error");

                },
                error: (error) => {
                    swal("OOPS!", "An error occurred while communicating with the server ! ", "error");
                }


            });


        })

});



$(document).ready(() => {
    $(document).on("click", "#clearButton", () => {
        clearFields();
    })
})

function validator() {
    if ($("#name").val() === "" || $("#password").val() === "" || $("#role").val() === "" || $("#nic").val() === "" || $("#address").val() === "" || $("#dob").val() === "" || $("#phone").val() === "" || $("#email").val() === "" || $("#gender").val() === ""  || $("#userNICimageLocation").val() === "" || $("#userImageLocation").val() === "" ) {
        return false;
    }
    return true;
}

function clearFields() {
    $("#UserId").val("");
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
    $("#userimageLocation").val("");

}

function  addTableField(){
    $.ajax({
        url: "http://localhost:8080/fetchAll",
        method: "GET",
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("userToken"))
        },
        success: (res) => {

            var html = "";
            res.data.forEach(function (user){
                let userId = user.userId;
                let userName = user.userName;


                html += "<tr>";
                html += "<td>" + user.userId + "</td>";
                html += "<td>" + user.userName + "</td>";
                html += "<td>" + user.userAddress + "</td>";
                html += "<td>" + user.role + "</td>";
                html += "<td>" + user.userEmail + "</td>";
                html += "<td>" + user.gender + "</td>";
                html += "<td>" + user.userDOB + "</td>";
                html += '<td><button onclick="deleteDataa(' + userId + ')" class="btn btn-danger">Delete</button><button onclick="UpdateData(' + userName + ')" class="btn btn-warning m-2">Edit</button></td>';
                html += "</tr>";
            })

            document.querySelector("#crudTable tbody").innerHTML = html;

        }, error: (error) => {
            swal("OOPS!", "An error occurred while communicating with the server ! ", "error");
        }
    })
}
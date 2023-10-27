$(document).ready(()=>{
    localStorage.setItem("guideAuthToken",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IkdBIiwic3ViIjoiZHVsYW5qYW5hIiwiaWF0IjoxNjk4MDQwODQ0LCJleHAiOjQ4NTE2NDA4NDR9.ZVFku0nnsLCSc9QN-1sQtCgAzlND9-eGwpsEqEaHt0I"))
    // $("#GuideId").prop("disabled", true);
    addTableField();
});

var selectedService = '';

$(document).ready(function(){
    $('.dataForm #gender-select').click(function(){

        var comboBox = document.getElementById("gender-select");

        selectedService = comboBox.options[comboBox.selectedIndex].text;

        console.log(selectedService);
    });
});

// save
$(document).ready(() => {
    $(document).on("click", "#Submit", () => {
        if (!validator()) {
            return swal("Operation failed!", "Please fill all the fields!", "error")
        }

        // var guideID = document.getElementById("guideId");
        // var guideIdText = guideID.textContent;
        // console.log(guideIdText);

        setTimeout(() => {
            let guide = {
                guideId: $("#GuideId").val(),
                guideName: $("#name").val(),
                guideAddress: $("#address").val(),
                guideAge: $("#age").val(),
                gender: selectedService,
                guideContact: $("#contact").val(),
                guideImageLocation: $("#guideImageLocation").val(),
                guideNICImageLocation: $("#guideNICImageLocation").val(),
                guideIDImageLocation: $("#guideIDimageLocation").val(),
                guideExperience: $("#experience").val(),
                manDayValue: $("#manDayValue").val()
            }

            $.ajax({
                url: "http://localhost:8084/save",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("guideAuthToken"))
                },
                data: JSON.stringify(guide),
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
            let guide = {
                guideId: $("#GuideId").val(),
                guideName: $("#name").val(),
                guideAddress: $("#address").val(),
                guideAge: $("#age").val(),
                gender: selectedService,
                guideContact: $("#contact").val(),
                guideImageLocation: $("#guideImageLocation").val(),
                guideNICImageLocation: $("#guideNICImageLocation").val(),
                guideIDImageLocation: $("#guideIDimageLocation").val(),
                guideExperience: $("#experience").val(),
                manDayValue: $("#manDayValue").val()
            }

            $.ajax({
                url: "http://localhost:8084/update",
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("guideAuthToken"))
                },
                data: JSON.stringify(guide),
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
                url: "http://localhost:8084/getGuideByUserName?GuideUserName=" + $("#name").val(),
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("guideAuthToken"))
                },
                success: (res) => {
                    console.log(res.data)
                    if (res.statusCode === 200 || res.statusCode === 201) {
                        $("#GuideId").prop("disabled", false);
                        $("#GuideId").val(res.data.guideId);
                        $("#GuideId").prop("disabled", true);
                        $("#name").val(res.data.guideName);
                        $("#address").val(res.data.guideAddress);
                        $("#age").val(res.data.guideAge);
                        // $("#gender-select").append("<option value='" + res.data.gender + "'>" + res.data.gender + "</option>");
                        $("#contact").val(res.data.guideContact);
                        // $("#guideImageLocation").val(res.data.guideImageLocation);
                        // $("#guideNICImageLocation").val(res.data.guideNICImageLocation);
                        // $("#guideIDimageLocation").val(res.data.guideIDImageLocation);
                        $("#experience").val(res.data.guideExperience);
                        $("#manDayValue").val(res.data.manDayValue);

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
    $(document).on("keydown", "#name", (event) => {

        if (event.key === 'Enter') {
            $.ajax({
                url: "http://localhost:8084/getGuideByUserName?GuideUserName=" + $("#name").val(),
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("guideAuthToken"))
                },
                success: (res) => {
                    console.log(res.data)
                    if (res.statusCode === 200 || res.statusCode === 201) {
                        $("#GuideId").prop("disabled", false);
                        $("#GuideId").val(res.data.guideId);
                        $("#GuideId").prop("disabled", true);
                        $("#name").val(res.data.guideName);
                        $("#address").val(res.data.guideAddress);
                        $("#age").val(res.data.guideAge);
                        // $("#gender-select").append("<option value='" + res.data.gender + "'>" + res.data.gender + "</option>");
                        $("#contact").val(res.data.guideContact);
                        // $("#guideImageLocation").val(res.data.guideImageLocation);
                        // $("#guideNICImageLocation").val(res.data.guideNICImageLocation);
                        // $("#guideIDimageLocation").val(res.data.guideIDImageLocation);
                        $("#experience").val(res.data.guideExperience);
                        $("#manDayValue").val(res.data.manDayValue);

                        // swal("OOPS!","cannot find guide");


                        $(document).on("click", "#deleteGuide", () => {
                            if ($("#GuideId").val() === "") {
                                return swal("OOPS!", "Please enter a Guide name to delete!", "error");
                            }

                            $.ajax({
                                url: "http://localhost:8084/delete?guideId=" + $("#GuideId").val(),
                                method: "DELETE",
                                headers: {
                                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("guideAuthToken"))
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
                    }
                    swal("OOPS!","error");

                },
                error: (error) => {
                    swal("OOPS!", "An error occurred while communicating with the server ! ", "error");
                }
            });
        }
    });
});

function validator() {
    if ($("#name").val() === "" || $("#address").val() === "" || $("#age").val() === "" || $("#contact").val() === "" || $("#guideImageLocation").val() === "" || $("#guideNICImageLocation").val() === "" || $("#guideIDimageLocation").val() === "" || $("#experience").val() === "" || $("#manDayValue").val() === "") {
        return false;
    }
    return true;
}

function clearFields() {
    $("#GuideId").val("");
    $("#name").val("");
    $("#address").val("");
    $("#age").val("");
    $("#contact").val("");
    $("#guideImageLocation").val("");
    $("#guideNICImageLocation").val("");
    $("#guideIDimageLocation").val("");
    $("#experience").val("");
    $("#manDayValue").val("");
}

$(document).ready(() => {
    $(document).on("click", "#clearButton", () => {
        clearFields();
    })
})


function  addTableField(){
    $.ajax({
        url: "http://localhost:8084/fetchAll",
        method: "GET",
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("guideAuthToken"))
        },
        success: (res) => {

            var html = "";
            res.data.forEach(function (guide){
                let guideId = guide.guideId;
                let guideName = guide.guideName;


                html += "<tr>";
                html += "<td>" + guide.guideId + "</td>";
                html += "<td>" + guide.guideName + "</td>";
                html += "<td>" + guide.guideAddress + "</td>";
                html += "<td>" + guide.guideAge + "</td>";
                html += "<td>" + guide.gender + "</td>";
                html += "<td>" + guide.guideContact + "</td>";
                html += "<td>" + guide.guideExperience + "</td>";
                html += "<td>" + guide.manDayValue + "</td>";
                html += '<td><button onclick="deleteDataa(' + guideId + ')" class="btn btn-danger">Delete</button><button onclick="UpdateData(' + guideName + ')" class="btn btn-warning m-2">Edit</button></td>';
                html += "</tr>";
            })

            document.querySelector("#crudTable tbody").innerHTML = html;

        }, error: (error) => {
            swal("OOPS!", "An error occurred while communicating with the server ! ", "error");
        }
    })
}


// function UpdateData(guideName){
//     $.ajax({
//         url: "http://localhost:8080/api/v1/guide/getGuideByUserName?GuideUserName=" + guideName,
//         method: "GET",
//         headers: {
//             "Authorization": "Bearer " + JSON.parse(localStorage.getItem("adminAuthToken"))
//         },
//         success: (res) => {
//             console.log(res.data)
//             if (res.statusCode === 200 || res.statusCode === 201) {
//                 $("#GuideId").prop("disabled", false);
//                 $("#GuideId").val(res.data.guideId);
//                 $("#GuideId").prop("disabled", true);
//                 $("#name").val(res.data.guideName);
//                 $("#address").val(res.data.guideAddress);
//                 $("#age").val(res.data.guideAge);
//                 // $("#gender-select").append("<option value='" + res.data.gender + "'>" + res.data.gender + "</option>");
//                 $("#contact").val(res.data.guideContact);
//                 // $("#guideImageLocation").val(res.data.guideImageLocation);
//                 // $("#guideNICImageLocation").val(res.data.guideNICImageLocation);
//                 // $("#guideIDimageLocation").val(res.data.guideIDImageLocation);
//                 $("#experience").val(res.data.guideExperience);
//                 $("#manDayValue").val(res.data.manDayValue);
//
//                 return swal("Done!", "success");
//
//             }
//             swal("OOPS!","error");
//
//         },
//         error: (error) => {
//             swal("OOPS!", "An error occurred while communicating with the server ! ", "error");
//         }
//     });
// }

// function deleteDataa(guideId) {
//     console.log(guideId)
//         if (guideId === "") {
//             return swal("OOPS!", "Please enter a Guide name to delete!", "error");
//         }
//
//         $.ajax({
//             url: "http://localhost:8080/api/v1/guide/deleteGuide?guideId=" + guideId,
//             method: "DELETE",
//             headers: {
//                 "Authorization": "Bearer " + JSON.parse(localStorage.getItem("adminAuthToken"))
//             },
//             success: (res) => {
//                 console.log(res.data)
//                 if (res.statusCode === 200 || res.statusCode === 201) {
//                     clearFields();
//                     return swal("Done!", res.message, "success");
//
//
//                 }
//                 swal("OOPS!", res.message, "error");
//
//             },
//             error: (error) => {
//                 swal("OOPS!", "An error occurred while communicating with the server ! ", "error");
//             }
//
//
//         });
//
// }


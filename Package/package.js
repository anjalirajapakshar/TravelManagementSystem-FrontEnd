$(document).ready(()=>{
    localStorage.setItem("packageAuthToken",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IlBBIiwic3ViIjoibWFsaXRoaSIsImlhdCI6MTY5ODA0MDkwNSwiZXhwIjo0ODUxNjQwOTA1fQ.I-0C7nqNmU22YEifSWvVLgtbrynlh61TZfPy98NHlmU"))
    $("#PackageId").prop("disabled", true);
    addTableField();
});

var selectedService = '';

$(document).ready(function(){
    $('.dataForm #hybrid-select').click(function(){

        var comboBox = document.getElementById("hybrid-select");

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

        setTimeout(() => {
            let packages = {
                packageId: "",
                packageCategory: $("#Packcategory").val(),
                vehicleCategory: $("#Vehiclecategory").val(),
                hotelCategory: $("#Hotelcategory").val()
            }

            $.ajax({
                url: "http://localhost:8082/save",
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("packageAuthToken"))
                },
                data: JSON.stringify(packages),
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
            let packages = {
                packageId: $("#PackageId").val(),
                packageCategory: $("#Packcategory").val(),
                vehicleCategory: $("#Vehiclecategory").val(),
                hotelCategory: $("#Hotelcategory").val()
            }

            $.ajax({
                url: "http://localhost:8082/update",
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("packageAuthToken"))
                },
                data: JSON.stringify(packages),
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
    $(document).on("keydown", "#Packcategory", (event) => {

        if (event.key === 'Enter') {
            $.ajax({
                url: "http://localhost:8082/getPackageByUserName?PackageName=" + $("#Packcategory").val(),
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("packageAuthToken"))
                },
                success: (res) => {
                    console.log(res.data)
                    if (res.statusCode === 200 || res.statusCode === 201) {
                        $("#PackageId").prop("disabled", false);
                        $("#PackageId").val(res.data.packageId);
                        $("#PackageId").prop("disabled", true);
                        $("#Packcategory").val(res.data.packageCategory);
                        $("#Vehiclecategory").val(res.data.vehicleCategory);
                        $("#Hotelcategory").val(res.data.hotelCategory);

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
    // $(document).on("keydown", "#Packcategory", (event) => {
    //
    //     if (event.key === 'Enter') {
    //         $.ajax({
    //             url: "http://localhost:8082/getPackageByUserName?PackageName=" + $("#Packcategory").val(),
    //             method: "GET",
    //             headers: {
    //                 "Authorization": "Bearer " + JSON.parse(localStorage.getItem("packageAuthToken"))
    //             },
    //             success: (res) => {
    //                 console.log(res.data)
    //                 if (res.statusCode === 200 || res.statusCode === 201) {
    //                     $("#PackageId").prop("disabled", false);
    //                     $("#PackageId").val(res.data.packageId);
    //                     $("#PackageId").prop("disabled", true);
    //                     $("#Packcategory").val(res.data.packageCategory);
    //                     $("#Vehiclecategory").val(res.data.vehicleCategory);
    //                     $("#Hotelcategory").val(res.data.hotelCategory);
    //
    //                     swal("OOPS!","cannot find guide");
    //
    //
    //                     $(document).on("click", "#deleteGuide", () => {
    //                         if ($("#PackageId").val() === "") {
    //                             return swal("OOPS!", "Please enter a Package name to delete!", "error");
    //                         }

                            $.ajax({
                                url: "http://localhost:8082/delete?packagesId=" + $("#PackageId").val(),
                                method: "DELETE",
                                headers: {
                                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("packageAuthToken"))
                                },
                                success: (res) => {
                                    console.log(res.message)
                                    if (res.statusCode === 200 || res.statusCode === 201) {
                                        addTableField();
                                        clearFields();
                                        return swal("Done!", "success");


                                    }

                                    swal("OOPS!", "error");

                                },
                                error: (error) => {
                                    console.log(error.responseJSON.message)
                                    swal("OOPS!", "An error occurred while communicating with the server ! ", "error");
                                }


                            });
    //
    //
    //                     })
    //                 }
    //                 swal("OOPS!","error");
    //
    //             },
    //             error: (error) => {
    //                 swal("OOPS!", "An error occurred while communicating with the server ! ", "error");
    //             }
    //         });
    //     }
    // });
});

function validator() {
    if ($("#Packcategory").val() === "" || $("#Hotelcategory").val() === "" || $("#Vehiclecategory").val() === "") {
        return false;
    }
    return true;
}

function clearFields() {
    $("#PackageId").val("");
    $("#Packcategory").val("");
    $("#Hotelcategory").val("");
    $("#Vehiclecategory").val("");
}

$(document).ready(() => {
    $(document).on("click", "#clearButton", () => {
        clearFields();
    })
})

function  addTableField(){
    $.ajax({
        url: "http://localhost:8082/fetchAll",
        method: "GET",
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("packageAuthToken"))
        },
        success: (res) => {

            var html = "";
            res.data.forEach(function (packages){
                let guideId = packages.packageId;
                let guideName = packages.packageCategory;

                html += "<tr>";
                html += "<td>" + packages.packageId + "</td>";
                html += "<td>" + packages.packageCategory + "</td>";
                html += "<td>" + packages.hotelCategory + "</td>";
                html += "<td>" + packages.vehicleCategory + "</td>";
                html += '<td><button onclick="deleteDataa(' + guideId + ')" class="btn btn-danger">Delete</button><button onclick="UpdateData(' + guideName + ')" class="btn btn-warning m-2">Edit</button></td>';
                html += "</tr>";
            })

            document.querySelector("#crudTable tbody").innerHTML = html;

        }, error: (error) => {
            swal("OOPS!", "An error occurred while communicating with the server ! ", "error");
        }
    })
}
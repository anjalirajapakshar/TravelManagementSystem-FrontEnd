$(document).ready(()=>{
    localStorage.setItem("adminAuthToken",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrYXN1biIsImlhdCI6MTY5Nzg5MjEzMSwiZXhwIjo0ODUxNDkyMTMxfQ.hweUKUmxIJT77ugJBBkYoyRxjbZ1eHmEJNKcu0yTQ2U"))
    $("#VehicleId").prop("disabled", true);
    addTableField();
    packageIds();
});

// function getVehicleid( vehicleId , packageId) {
//     $.ajax({
//         url: "http://localhost:8080/api/v1packages/getVehicleId?vehicleID=" + vehicleId + "&packageID=" + packageId,
//         method: "PUT",
//         headers: {
//             // "content-type": "application/json",
//             "Authorization": "Bearer " + JSON.parse(localStorage.getItem("adminAuthToken"))
//         },
//         success: (response) => {
//             if (response.statusCode === 302) {
//                 swal("Done!", response.message, "success")
//             } else {
//                 return swal("OOPS!", response.message, "error")
//             }
//         }, error: (error) => {
//             swal("OOPS!", "An error occurred while communicating with the server ! ", "error");
//         },
//     })
// }

var regularId = '';
var midrangeId = '';
var luxuryId = '';
var superluxuryId = '';

function packageIds() {
    $.ajax({
        url: "http://localhost:8080/api/v1/packages/fetchAllPackages",
        method: "GET",
        headers: {
            // "content-type": "application/json",
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("adminAuthToken"))
        },
        success: (response) => {
            if (response.statusCode === 302) {

                response.data.forEach(function (packages) {
                    switch (packages.packageCategory) {
                        case "Regular" :regularId = packages.packageId;
                            break;
                        case "Mid-level" :midrangeId = packages.packageId;
                            break;
                        case "Luxury" :luxuryId = packages.packageId;
                            break;
                        case "Super Luxury" :superluxuryId = packages.packageId;
                            break;
                    }

                })
            } else {
                return swal("OOPS!", response.message, "error")
            }
        }, error: (error) => {
            swal("OOPS!", "An error occurred while communicating with the server ! ", "error");
        },
    })
}

var hybridSelected = '';

$(document).ready(function(){
    $('.dataForm #hybrid-select').click(function(){

        var comboBox = document.getElementById("hybrid-select");

        hybridSelected = comboBox.options[comboBox.selectedIndex].text;

        console.log(hybridSelected);
    });
});

var packageSelected = '';
var packageSelectedId = '';

$(document).ready(function(){
    $('.dataForm #package-select').click(function(){

        var comboBox = document.getElementById("package-select");

        packageSelected = comboBox.options[comboBox.selectedIndex].text;

        switch (packageSelected) {
            case "Regular" :packageSelectedId = regularId;
                break;
            case "Mid-level" :packageSelectedId = midrangeId;
                break;
            case "Luxury" :packageSelectedId = luxuryId;
                break;
            case "Super Luxury" :packageSelectedId = superluxuryId;
                break;
        }



        console.log(packageSelected);
    });
});

// save
$(document).ready(() => {
    $(document).on("click", "#Submit", () => {
        if (!validator()) {
            return swal("Operation failed!", "Please fill all the fields!", "error")
        }

        setTimeout(() => {
            let vehicle = {
                vehicleID: "",
                vehicleBrand: $("#brand").val(),
                vehicleCategory: $("#category").val(),
                fuelType: $("#fueltype").val(),
                hybridOrNot: hybridSelected,
                fuelUsage: $("#fuelusage").val(),
                vehicleImage: $("#vehicleImageLocation").val(),
                seatCapacity: $("#seatCap").val(),
                vehicleType: $("#vehicletype").val(),
                transmissionType: $("#transmissiontype").val(),
                driversName: $("#drivername").val(),
                driversContactNumber: $("#drivercontact").val(),
                driverLicenseImageLocation: $("#driverLicenseImageLocation").val(),
                packageId: packageSelectedId
            }

            $.ajax({
                url: "http://localhost:8080/api/v1/vehicle/sv",
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("adminAuthToken"))
                },
                data: JSON.stringify(vehicle),
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
            let vehicle = {
                vehicleID: $("#VehicleId").val(),
                vehicleBrand: $("#brand").val(),
                vehicleCategory: $("#category").val(),
                fuelType: $("#fueltype").val(),
                hybridOrNot: hybridSelected,
                fuelUsage: $("#fuelusage").val(),
                vehicleImage: $("#vehicleImageLocation").val(),
                seatCapacity: $("#seatCap").val(),
                vehicleType: $("#vehicletype").val(),
                transmissionType: $("#transmissiontype").val(),
                driversName: $("#drivername").val(),
                driversContactNumber: $("#drivercontact").val(),
                driverLicenseImageLocation: $("#driverLicenseImageLocation").val(),
                packageId: packageSelectedId
            }

            $.ajax({
                url: "http://localhost:8080/api/v1/vehicle/update",
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("adminAuthToken"))
                },
                data: JSON.stringify(vehicle),
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
    $(document).on("keydown", "#brand", (event) => {

        if (event.key === 'Enter') {
            $.ajax({
                url: "http://localhost:8080/api/v1/vehicle/getVehicleByUserName?VehicleBrand=" + $("#brand").val(),
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("adminAuthToken"))
                },
                success: (res) => {
                    console.log(res.data)
                    if (res.statusCode === 200 || res.statusCode === 201) {
                        $("#VehicleId").prop("disabled", false);
                        $("#VehicleId").val(res.data.vehicleID);
                        $("#VehicleId").prop("disabled", true);
                        $("#brand").val(res.data.vehicleBrand);
                        $("#category").val(res.data.vehicleCategory);
                        $("#fueltype").val(res.data.fuelType);
                        $("#fuelusage").val(res.data.fuelUsage);
                        // $("#vehicleImageLocation").val(res.data.vehicleImage);
                        $("#seatCap").val(res.data.seatCapacity);
                        $("#vehicletype").val(res.data.vehicleType);
                        $("#transmissiontype").val(res.data.transmissionType);
                        $("#drivername").val(res.data.driversName);
                        $("#drivercontact").val(res.data.driversContactNumber);
                        // $("#driverLicenseImageLocation").val(res.data.driverLicenseImageLocation);

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
    $(document).on("keydown", "#brand", (event) => {

        if (event.key === 'Enter') {
            $.ajax({
                url: "http://localhost:8080/api/v1/vehicle/getVehicleByUserName?VehicleBrand=" + $("#brand").val(),
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("adminAuthToken"))
                },
                success: (res) => {
                    console.log(res.data)
                    if (res.statusCode === 200 || res.statusCode === 201) {
                        $("#VehicleId").prop("disabled", false);
                        $("#VehicleId").val(res.data.vehicleID);
                        $("#VehicleId").prop("disabled", true);
                        $("#brand").val(res.data.vehicleBrand);
                        $("#category").val(res.data.vehicleCategory);
                        $("#fueltype").val(res.data.fuelType);
                        $("#fuelusage").val(res.data.fuelUsage);
                        // $("#vehicleImageLocation").val(res.data.vehicleImage);
                        $("#seatCap").val(res.data.seatCapacity);
                        $("#vehicletype").val(res.data.vehicleType);
                        $("#transmissiontype").val(res.data.transmissionType);
                        $("#drivername").val(res.data.driversName);
                        $("#drivercontact").val(res.data.driversContactNumber);
                        // $("#driverLicenseImageLocation").val(res.data.driverLicenseImageLocation);

                        // swal("OOPS!","cannot find guide");


                        $(document).on("click", "#deleteGuide", () => {
                            if ($("#VehicleId").val() === "") {
                                return swal("OOPS!", "Please enter a Vehicle name to delete!", "error");
                            }

                            $.ajax({
                                url: "http://localhost:8080/api/v1/vehicle/delete?vehicleId=" + $("#VehicleId").val(),
                                method: "DELETE",
                                headers: {
                                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("adminAuthToken"))
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
    if ($("#brand").val() === "" || $("#category").val() === "" || $("#fueltype").val() === "" || $("#fuelusage").val() === "" || $("#vehicleImageLocation").val() === "" || $("#seatCap").val() === "" || $("#vehicletype").val() === "" || $("#transmissiontype").val() === "" || $("#drivername").val() === "" || $("#drivercontact").val() === "" || $("#driverLicenseImageLocation").val() === "") {
        return false;
    }
    return true;
}

function clearFields() {
    $("#VehicleId").val("");
    $("#brand").val("");
    $("#category").val("");
    $("#fueltype").val("");
    $("#fuelusage").val("");
    $("#vehicleImageLocation").val("");
    $("#seatCap").val("");
    $("#vehicletype").val("");
    $("#transmissiontype").val("");
    $("#drivername").val("");
    $("#drivercontact").val("");
    $("#driverLicenseImageLocation").val("");
}

$(document).ready(() => {
    $(document).on("click", "#clearButton", () => {
        clearFields();
    })
})

function  addTableField(){
    $.ajax({
        url: "http://localhost:8080/api/v1/vehicle/fetchAll",
        method: "GET",
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("adminAuthToken"))
        },
        success: (res) => {

            var html = "";
            res.data.forEach(function (vehicle , vehicleId ,vehicleName){
                vehicleId = vehicle.vehicleID;
                vehicleName = vehicle.vehicleBrand;


                html += "<tr>";
                html += "<td>" + vehicle.vehicleID + "</td>";
                html += "<td>" + vehicle.vehicleBrand + "</td>";
                html += "<td>" + vehicle.fuelType + "</td>";
                html += "<td>" + vehicle.fuelUsage + "</td>";
                html += "<td>" + vehicle.hybridOrNot + "</td>";
                html += "<td>" + vehicle.seatCapacity + "</td>";
                html += "<td>" + vehicle.vehicleType + "</td>";
                html += "<td>" + vehicle.driversName + "</td>";
                html += '<td><button onclick="deleteDataa(' + vehicleId + ')" class="btn btn-danger">Delete</button><button onclick="UpdateData(' + vehicleName + ')" class="btn btn-warning m-2">Edit</button></td>';
                html += "</tr>";
            })

            document.querySelector("#crudTable tbody").innerHTML = html;

        }, error: (error) => {
            swal("OOPS!", "An error occurred while communicating with the server ! ", "error");
        }
    })
}
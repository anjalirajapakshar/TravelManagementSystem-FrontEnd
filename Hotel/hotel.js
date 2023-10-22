$(document).ready(()=>{
    localStorage.setItem("adminAuthToken",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbmphbGkiLCJpYXQiOjE2OTc4OTE5OTIsImV4cCI6NDg1MTQ5MTk5Mn0.xxxS3CU8HGIkvd4vETMO7m95EU2vryQTTDPHe6e9o-g"))
    $("#HotelId").prop("disabled", true);
    addTableField();
    packageIds();
});

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

var petSelected = '';

$(document).ready(function(){
    $('.dataForm #pet-select').click(function(){

        var comboBox = document.getElementById("pet-select");

        petSelected = comboBox.options[comboBox.selectedIndex].text;

        console.log(petSelected);
    });
});

// save
$(document).ready(() => {
    $(document).on("click", "#Submit", () => {
        if (!validator()) {
            return swal("Operation failed!", "Please fill all the fields!", "error")
        }

        setTimeout(() => {
            let hotel = {
                hotelID: "",
                hotelName: $("#name").val(),
                hotelCatageory: $("#category").val(),
                hotelLocation: $("#location").val(),
                hotelLocationWithCoordinates: $("#locwithCoordinators").val(),
                hotelEmail: $("#email").val(),
                hotelContactNumber: $("#contact").val(),
                isPetsAllowed: petSelected,
                FullBoardDoublehotelFee: $("#fulldouble").val(),
                HalfBoardDoublehotelFee: $("#halfdouble").val(),
                FullBoardTriplehotelFee: $("#fulltriple").val(),
                HalfBoardTriplehotelFee: $("#halftriple").val(),
                cancellationCriteria: $("#cancellation").val(),
                packageId: packageSelectedId
            }

            $.ajax({
                url: "http://localhost:8080/api/v1/hotel/sh",
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("adminAuthToken"))
                },
                data: JSON.stringify(hotel),
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
            let hotel = {
                hotelID: $("#HotelId").val(),
                hotelName: $("#name").val(),
                hotelCatageory: $("#category").val(),
                hotelLocation: $("#location").val(),
                hotelLocationWithCoordinates: $("#locwithCoordinators").val(),
                hotelEmail: $("#email").val(),
                hotelContactNumber: $("#contact").val(),
                isPetsAllowed: petSelected,
                FullBoardDoublehotelFee: $("#fulldouble").val(),
                HalfBoardDoublehotelFee: $("#halfdouble").val(),
                FullBoardTriplehotelFee: $("#fulltriple").val(),
                HalfBoardTriplehotelFee: $("#halftriple").val(),
                cancellationCriteria: $("#cancellation").val(),
                packageId: packageSelectedId
            }

            $.ajax({
                url: "http://localhost:8080/api/v1/hotel/updateHotel",
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("adminAuthToken"))
                },
                data: JSON.stringify(hotel),
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
                url: "http://localhost:8080/api/v1/hotel/getHotelByUserName?HotelName=" + $("#name").val(),
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("adminAuthToken"))
                },
                success: (res) => {
                    console.log(res.data)
                    if (res.statusCode === 200 || res.statusCode === 201) {
                        $("#HotelId").prop("disabled", false);
                        $("#HotelId").val(res.data.hotelID);
                        $("#HotelId").prop("disabled", true);
                        $("#name").val(res.data.hotelName);
                        $("#category").val(res.data.hotelCatageory);
                        $("#location").val(res.data.hotelLocation);
                        $("#locwithCoordinators").val(res.data.hotelLocationWithCoordinates);
                        $("#email").val(res.data.hotelEmail);
                        $("#contact").val(res.data.hotelContactNumber);
                        $("#fulldouble").val(res.data.FullBoardDoublehotelFee);
                        $("#halfdouble").val(res.data.HalfBoardDoublehotelFee);
                        $("#fulltriple").val(res.data.FullBoardTriplehotelFee);
                        $("#halftriple").val(res.data.HalfBoardTriplehotelFee);
                        $("#cancellation").val(res.data.cancellationCriteria);


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
                url: "http://localhost:8080/api/v1/hotel/getHotelByUserName?HotelName=" + $("#name").val(),
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("adminAuthToken"))
                },
                success: (res) => {
                    console.log(res.data)
                    if (res.statusCode === 200 || res.statusCode === 201) {
                        $("#HotelId").prop("disabled", false);
                        $("#HotelId").val(res.data.hotelID);
                        $("#HotelId").prop("disabled", true);
                        $("#name").val(res.data.hotelName);
                        $("#category").val(res.data.hotelCatageory);
                        $("#location").val(res.data.hotelLocation);
                        $("#locwithCoordinators").val(res.data.hotelLocationWithCoordinates);
                        $("#email").val(res.data.hotelEmail);
                        $("#contact").val(res.data.hotelContactNumber);
                        $("#fulldouble").val(res.data.FullBoardDoublehotelFee);
                        $("#halfdouble").val(res.data.HalfBoardDoublehotelFee);
                        $("#fulltriple").val(res.data.FullBoardTriplehotelFee);
                        $("#halftriple").val(res.data.HalfBoardTriplehotelFee);
                        $("#cancellation").val(res.data.cancellationCriteria);

                        swal("Done!", "success");

                        $(document).on("click", "#deleteGuide", () => {
                            // if (!validator()) {
                            //     return swal("Operation failed!", "Please fill all the fields!", "error")
                            // }

                            if ($("#HotelId").val() === "") {
                                return swal("OOPS!", "Please enter a Vehicle name to delete!", "error");
                            }

                            $.ajax({
                                url: "http://localhost:8080/api/v1/hotel/deleteHotel?hotelId=" + $("#HotelId").val(),
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
                    clearFields();

                },
                error: (error) => {
                    swal("OOPS!", "An error occurred while communicating with the server ! ", "error");
                }
            });
        }
    })
});





function validator() {
    if ($("#name").val() === "" || $("#category").val() === "" || $("#location").val() === "" || $("#locwithCoordinators").val() === "" || $("#email").val() === "" || $("#contact").val() === "" || $("#fulldouble").val() === "" || $("#halfdouble").val() === "" || $("#fulltriple").val() === "" || $("#halftriple").val() === "" || $("#cancellation").val() === "") {
        return false;
    }
    return true;
}

function clearFields() {
    $("#HotelId").val("");
    $("#name").val("");
    $("#category").val("");
    $("#location").val("");
    $("#locwithCoordinators").val("");
    $("#email").val("");
    $("#contact").val("");
    $("#fulldouble").val("");
    $("#halfdouble").val("");
    $("#fulltriple").val("");
    $("#halftriple").val("");
    $("#cancellation").val("");
}

$(document).ready(() => {
    $(document).on("click", "#clearButton", () => {
        clearFields();
    })
})

function  addTableField(){
    $.ajax({
        url: "http://localhost:8080/api/v1/hotel/fetchAllHotel",
        method: "GET",
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("adminAuthToken"))
        },
        success: (res) => {

            var html = "";
            res.data.forEach(function (hotel , hotelId ,hotelName){
                hotelId = hotel.vehicleID;
                hotelName = hotel.vehicleBrand;


                html += "<tr>";
                html += "<td>" + hotel.hotelID + "</td>";
                html += "<td>" + hotel.hotelName + "</td>";
                html += "<td>" + hotel.hotelCatageory + "</td>";
                html += "<td>" + hotel.hotelLocation + "</td>";
                html += "<td>" + hotel.hotelEmail + "</td>";
                html += "<td>" + hotel.hotelContactNumber + "</td>";
                html += "<td>" + hotel.isPetsAllowed + "</td>";
                html += "<td>" + hotel.cancellationCriteria + "</td>";
                html += '<td><button onclick="deleteDataa(' + hotelId + ')" class="btn btn-danger">Delete</button><button onclick="UpdateData(' + hotelName + ')" class="btn btn-warning m-2">Edit</button></td>';
                html += "</tr>";
            })

            document.querySelector("#crudTable tbody").innerHTML = html;

        }, error: (error) => {
            swal("OOPS!", "An error occurred while communicating with the server ! ", "error");
        }
    })
}

























$(document).ready(()=>{
    localStorage.setItem("packageDetailAuthToken",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IlBEQSIsInN1YiI6InByYXNhZGkiLCJpYXQiOjE2OTgwNDA5NjMsImV4cCI6NDg1MTY0MDk2M30.sz-7PTGq2A8K35crnZbe2HThRRy7cJjcHfG43XDGSYM"))

    $("#PackageDetailId").prop("disabled", true);
    $("#guide-select").val("guides");

    packageIds();
    clearFields();

    var userrr = JSON.parse(localStorage.getItem("userName"));
    console.log(userrr);
});

var regularId = '';
var midrangeId = '';
var luxuryId = '';
var superluxuryId = '';

function packageIds() {
    $.ajax({
        url: "http://localhost:8082/fetchAll",
        method: "GET",
        headers: {
            // "content-type": "application/json",
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("packageDetailAuthToken"))
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
                return swal("OOPS!", "error")
            }
        }, error: (error) => {
            swal("OOPS!", "An error occurred while communicating with the server ! ", "error");
        },
    })
}

var packageSelected = '';  // this is category type
var packageSelectedId = ''; //this is the package id

$(document).ready(function(){
    $('.dataForm #package-select').click(function(){

        var comboBox = document.getElementById("package-select");

        packageSelected = comboBox.options[comboBox.selectedIndex].text;

        switch (packageSelected) {
            case "Regular" :packageSelectedId = regularId;
                $.ajax({
                    url: "http://localhost:8087/getVehiclesByPackageId?packageId="+ packageSelectedId,
                    method: "GET",
                    headers: {
                        // "content-type": "application/json",
                        "Authorization": "Bearer " + JSON.parse(localStorage.getItem("packageDetailAuthToken"))
                    },
                    success: (response) => {
                        if (response.statusCode === 200) {

                            $("#vehicle-select").empty();

                            response.data.forEach(function (vehicles) {
                                $("#vehicle-select").append("<option value='" + vehicles.vehicleBrand + "'>" + vehicles.vehicleBrand + "</option>")

                            })
                        } else {
                            return swal("OOPS!", "error")
                        }
                    }, error: (error) => {
                        swal("OOPS!", "An error occurred while communicating with the server ! ", "error");
                    },
                })
                $.ajax({
                    url: "http://localhost:8085/getHotelsByPackageId?packageId="+ packageSelectedId,
                    method: "GET",
                    headers: {
                        // "content-type": "application/json",
                        "Authorization": "Bearer " + JSON.parse(localStorage.getItem("packageDetailAuthToken"))
                    },
                    success: (response) => {
                        if (response.statusCode === 200) {

                            $("#hotel-select").empty();

                            response.data.forEach(function (hotels) {
                                $("#hotel-select").append("<option value='" + hotels.hotelName + "'>" + hotels.hotelName + "</option>")

                            })
                        } else {
                            return swal("OOPS!", "error")
                        }
                    }, error: (error) => {
                        swal("OOPS!", "An error occurred while communicating with the server ! ", "error");
                    },
                })
                break;
            case "Mid-level" :packageSelectedId = midrangeId;
                $.ajax({
                    url: "http://localhost:8087/getVehiclesByPackageId?packageId="+ packageSelectedId,
                    method: "GET",
                    headers: {
                        // "content-type": "application/json",
                        "Authorization": "Bearer " + JSON.parse(localStorage.getItem("packageDetailAuthToken"))
                    },
                    success: (response) => {
                        if (response.statusCode === 200) {

                            $("#vehicle-select").empty();

                            response.data.forEach(function (vehicles) {
                                $("#vehicle-select").append("<option value='" + vehicles.vehicleBrand + "'>" + vehicles.vehicleBrand + "</option>")


                            })
                        } else {
                            return swal("OOPS!", "error")
                        }
                    }, error: (error) => {
                        swal("OOPS!", "An error occurred while communicating with the server ! ", "error");
                    },
                })
                $.ajax({
                    url: "http://localhost:8085/getHotelsByPackageId?packageId="+ packageSelectedId,
                    method: "GET",
                    headers: {
                        // "content-type": "application/json",
                        "Authorization": "Bearer " + JSON.parse(localStorage.getItem("packageDetailAuthToken"))
                    },
                    success: (response) => {
                        if (response.statusCode === 200) {

                            $("#hotel-select").empty();

                            response.data.forEach(function (hotels) {
                                $("#hotel-select").append("<option value='" + hotels.hotelName + "'>" + hotels.hotelName + "</option>")

                            })
                        } else {
                            return swal("OOPS!", "error")
                        }
                    }, error: (error) => {
                        swal("OOPS!", "An error occurred while communicating with the server ! ", "error");
                    },
                })
                break;
            case "Luxury" :packageSelectedId = luxuryId;
                $.ajax({
                    url: "http://localhost:8087/getVehiclesByPackageId?packageId="+ packageSelectedId,
                    method: "GET",
                    headers: {
                        // "content-type": "application/json",
                        "Authorization": "Bearer " + JSON.parse(localStorage.getItem("packageDetailAuthToken"))
                    },
                    success: (response) => {
                        if (response.statusCode === 200) {

                            $("#vehicle-select").empty();

                            response.data.forEach(function (vehicles) {
                                $("#vehicle-select").append("<option value='" + vehicles.vehicleBrand + "'>" + vehicles.vehicleBrand + "</option>")


                            })
                        } else {
                            return swal("OOPS!", "error")
                        }
                    }, error: (error) => {
                        swal("OOPS!", "An error occurred while communicating with the server ! ", "error");
                    },
                })
                $.ajax({
                    url: "http://localhost:8085/getHotelsByPackageId?packageId="+ packageSelectedId,
                    method: "GET",
                    headers: {
                        // "content-type": "application/json",
                        "Authorization": "Bearer " + JSON.parse(localStorage.getItem("packageDetailAuthToken"))
                    },
                    success: (response) => {
                        if (response.statusCode === 200) {

                            $("#hotel-select").empty();

                            response.data.forEach(function (hotels) {
                                $("#hotel-select").append("<option value='" + hotels.hotelName + "'>" + hotels.hotelName + "</option>")

                            })
                        } else {
                            return swal("OOPS!", "error")
                        }
                    }, error: (error) => {
                        swal("OOPS!", "An error occurred while communicating with the server ! ", "error");
                    },
                })
                break;
            case "Super Luxury" :packageSelectedId = superluxuryId;
                $.ajax({
                    url: "http://localhost:8087/getVehiclesByPackageId?packageId="+ packageSelectedId,
                    method: "GET",
                    headers: {
                        // "content-type": "application/json",
                        "Authorization": "Bearer " + JSON.parse(localStorage.getItem("packageDetailAuthToken"))
                    },
                    success: (response) => {
                        if (response.statusCode === 200) {

                            $("#vehicle-select").empty();

                            response.data.forEach(function (vehicles) {
                                $("#vehicle-select").append("<option value='" + vehicles.vehicleBrand + "'>" + vehicles.vehicleBrand + "</option>")


                            })
                        } else {
                            return swal("OOPS!", "error")
                        }
                    }, error: (error) => {
                        swal("OOPS!", "An error occurred while communicating with the server ! ", "error");
                    },
                })
                $.ajax({
                    url: "http://localhost:8085/getHotelsByPackageId?packageId="+ packageSelectedId,
                    method: "GET",
                    headers: {
                        // "content-type": "application/json",
                        "Authorization": "Bearer " + JSON.parse(localStorage.getItem("packageDetailAuthToken"))
                    },
                    success: (response) => {
                        if (response.statusCode === 200) {

                            $("#hotel-select").empty();

                            response.data.forEach(function (hotels) {
                                $("#hotel-select").append("<option value='" + hotels.hotelName + "'>" + hotels.hotelName + "</option>")

                            })
                        } else {
                            return swal("OOPS!", "error")
                        }
                    }, error: (error) => {
                        swal("OOPS!", "An error occurred while communicating with the server ! ", "error");
                    },
                })
                break;
        }
        console.log(packageSelected);
        $("#package").val(packageSelectedId);
    });
});

var areaselected = ""; //selected travel area

$(document).ready(function(){
    $('.dataForm .row2 #area-select').click(function(){

        var comboBox = document.getElementById("area-select");

        areaSelected = comboBox.options[comboBox.selectedIndex].text;
        console.log(areaSelected);

        areaselected = areaSelected;

    });
});

var totheadcount = ""; //total head count

$(document).ready(function(){
    $(document).on("keydown", "#kids", (event) => {

        if (event.key === 'Enter') {
            let adults = $("#adults").val();
            let kids = $("#kids").val();

            totheadcount = parseInt(adults, 10) + parseInt(kids, 10) ;
            console.log(totheadcount)
            $("#totalcount").val(totheadcount);
        }
    })


    let adults = $("#adults").val();
    let kids = $("#kids").val();

    totheadcount = adults + kids ;
});

var petSelected = ''; //pet selected

$(document).ready(function(){
    $('.dataForm #pet-select').click(function(){

        var comboBox = document.getElementById("pet-select");

        petSelected = comboBox.options[comboBox.selectedIndex].text;

        console.log(petSelected);
    });
});

var guideincluded = ''; // if guide included

$(document).ready(function(){
    $('.dataForm .row2 #guideincluded-select').click(function(){

        var comboBox = document.getElementById("guideincluded-select");

        guideincluded = comboBox.options[comboBox.selectedIndex].text;
        // console.log(guideincluded);
        if (guideincluded === "Yes"){
            $.ajax({
                url: "http://localhost:8084/fetchAll",
                method: "GET",
                headers: {
                    // "content-type": "application/json",
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("packageDetailAuthToken"))
                },
                success: (response) => {
                    if (response.statusCode === 302) {

                        $("#guide-select").empty();

                        response.data.forEach(function (guides) {
                            $("#guide-select").append("<option value='" + guides.guideName + "'>" + guides.guideName + "</option>")
                        })
                    } else {
                        return swal("OOPS!", "error")
                    }
                }, error: (error) => {
                    swal("OOPS!", "An error occurred while communicating with the server ! ", "error");
                },
            })
        }else {
            // Clear the options in #guide-select when "No" is selected
            $("#guide-select").empty();
            $("#guide-select").val("guides");
        }

    });
});

var guideId = ""; //guideid

var totalPackagePrice = 0; //tot package value
var servicecharge = 0;  //service charge
var totbooking = 0; //totbooking price --------------------------

$(document).ready(function(){
    $('.dataForm #guide-select').click(function(){

        var comboBox = document.getElementById("guide-select");

        guideSelected = comboBox.options[comboBox.selectedIndex].text;
        console.log(guideSelected);

        $.ajax({
            url: "http://localhost:8084/getGuideByUserName?GuideUserName=" + guideSelected,
            method: "GET",
            headers: {
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem("packageDetailAuthToken"))
            },
            success: (res) => {
                console.log(res.data)
                if (res.statusCode === 200 || res.statusCode === 201) {

                    totalPackagePrice = 0;

                    guideId = res.data.guideId;

                    let manDayValue = res.data.manDayValue;
                    console.log(manDayValue)


                    if($("#duration").val() != null){
                        days = $("#duration").val();
                    }else {
                        swal("OOPS!","pls enter travel duration");
                    }


                    let guidecharge = parseInt(manDayValue, 10) * parseInt(days, 10) ;
                    $("#guideCharge").val(guidecharge);


                    if (guidecharge != null){
                        totalPackagePrice = parseInt(totalPackagePrice, 10) + parseInt(guidecharge, 10) ;
                        console.log(totalPackagePrice)

                        $("#totPackageCharge").val(totalPackagePrice);
                    }




                    // return swal("Done!", "success");

                }
                // swal("OOPS!","error");
                // clearFields();

            },
            error: (error) => {
                swal("OOPS!", "An error occurred while communicating with the server ! ", "error");
            }
        });

    });
});

var vehicleid = ""; //vehicleid

$(document).ready(function(){
    var prevVehicleCharge = 0;

    $('.dataForm #vehicle-select').click(function(){

        var comboBox = document.getElementById("vehicle-select");

        vehicleSelected = comboBox.options[comboBox.selectedIndex].text;
        console.log(vehicleSelected);

        $.ajax({
            url: "http://localhost:8087/getVehicleByUserName?VehicleBrand=" + vehicleSelected,
            method: "GET",
            headers: {
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem("packageDetailAuthToken"))
            },
            success: (res) => {
                console.log(res.data)
                if (res.statusCode === 200 || res.statusCode === 201) {

                    vehicleid = res.data.vehicleID;

                    feeForDay = res.data.feeForDay;
                    console.log(feeForDay)

                    if($("#duration").val() != null){
                        days = $("#duration").val();
                    }else {
                        swal("OOPS!","pls enter travel duration");
                    }


                    let vehiclecharge = parseInt(feeForDay, 10) * parseInt(days, 10) ;

                    totalPackagePrice -= prevVehicleCharge;

                    $("#vehicleCharge").val(vehiclecharge);

                    if (vehiclecharge != null){
                        totalPackagePrice = parseInt(totalPackagePrice, 10) + parseInt(vehiclecharge, 10) ;
                        prevVehicleCharge = vehiclecharge;
                        console.log(totalPackagePrice)

                        $("#totPackageCharge").val(totalPackagePrice);
                    }




                    // return swal("Done!", "success");

                }
                // swal("OOPS!","error");
                // clearFields();

            },
            error: (error) => {
                swal("OOPS!", "An error occurred while communicating with the server ! ", "error");
            }
        });

    });
});

var hotelId = ""; //hotel id
$(document).ready(function(){
    var prevVehicleCharge = 0;

    $('.dataForm #hotel-select').click(function(){

        var comboBox = document.getElementById("hotel-select");

        hotelSelected = comboBox.options[comboBox.selectedIndex].text;
        console.log(hotelSelected);


        $.ajax({
            url: "http://localhost:8085/getHotelByUserName?HotelName=" + hotelSelected,
            method: "GET",
            headers: {
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem("packageDetailAuthToken"))
            },
            success: (res) => {
                console.log(res.data)
                if (res.statusCode === 200 || res.statusCode === 201) {

                    hotelId = res.data.hotelID;

                    if($("#duration").val() != null){
                        days = $("#duration").val();
                    }else {
                        swal("OOPS!","pls enter travel duration");
                    }

                    // var hotelRoomFee = "";

                    var roomSelected ="";
                    $('.dataForm #room-select').click(function(){

                        var comboBox = document.getElementById("room-select");

                        roomSelected = comboBox.options[comboBox.selectedIndex].text;
                        console.log(roomSelected);

                        switch (roomSelected) {
                            case "Full Board A/C Luxury Room – Double" : hotelRoomFee = res.data.fullDbl;
                                let hotel1Charge = parseInt(hotelRoomFee, 10) * parseInt(days, 10) ;

                                totalPackagePrice -= prevVehicleCharge;

                                console.log(hotel1Charge)
                                $("#hotelCharge").val(hotel1Charge);

                                if (hotel1Charge != null){
                                    totalPackagePrice = parseInt(totalPackagePrice, 10) + parseInt(hotel1Charge, 10) ;

                                    console.log(totalPackagePrice)

                                    prevVehicleCharge = hotel1Charge;

                                    servicecharge = parseInt(totalPackagePrice, 10) * 5 / 100 ;
                                    totbooking = parseInt(totalPackagePrice, 10) + parseInt(servicecharge, 10)

                                    $("#totPackageCharge").val(totalPackagePrice);
                                    $("#serviceCharge").val(servicecharge);
                                    $("#totbookingprice").val(totbooking);
                                }

                                break;
                            case "Half Board A/C Luxury Room - Double" : hotelRoomFee = res.data.halfDbl;
                                let hotel2Charge = parseInt(hotelRoomFee, 10) * parseInt(days, 10) ;

                                totalPackagePrice -= prevVehicleCharge;

                                console.log(hotel2Charge)
                                $("#hotelCharge").val(hotel2Charge);

                                if (hotel2Charge != null){
                                    totalPackagePrice = parseInt(totalPackagePrice, 10) + parseInt(hotel2Charge, 10) ;
                                    console.log(totalPackagePrice)

                                    prevVehicleCharge = hotel2Charge;

                                    servicecharge = parseInt(totalPackagePrice, 10) * 5 / 100 ;
                                    totbooking = parseInt(totalPackagePrice, 10) + parseInt(servicecharge, 10)

                                    $("#totPackageCharge").val(totalPackagePrice);
                                    $("#serviceCharge").val(servicecharge);
                                    $("#totbookingprice").val(totbooking);
                                }

                                break;
                            case "Full Board A/C Luxury Room – Triple" : hotelRoomFee = res.data.fullTpl;
                                let hotel3Charge = parseInt(hotelRoomFee, 10) * parseInt(days, 10) ;

                                totalPackagePrice -= prevVehicleCharge;

                                console.log(hotel3Charge)
                                $("#hotelCharge").val(hotel3Charge);

                                if (hotel3Charge != null){
                                    totalPackagePrice = parseInt(totalPackagePrice, 10) + parseInt(hotel3Charge, 10) ;
                                    console.log(totalPackagePrice)

                                    prevVehicleCharge = hotel3Charge;

                                    servicecharge = parseInt(totalPackagePrice, 10) * 5 / 100 ;
                                    totbooking = parseInt(totalPackagePrice, 10) + parseInt(servicecharge, 10)

                                    $("#totPackageCharge").val(totalPackagePrice);
                                    $("#serviceCharge").val(servicecharge);
                                    $("#totbookingprice").val(totbooking);
                                }

                                break;
                            case "Half Board A/C Luxury Room - Triple" : hotelRoomFee = res.data.halfTpl;
                                let hotel4Charge = parseInt(hotelRoomFee, 10) * parseInt(days, 10) ;

                                totalPackagePrice -= prevVehicleCharge;

                                console.log(hotel4Charge)
                                $("#hotelCharge").val(hotel4Charge);

                                if (hotel4Charge != null){
                                    totalPackagePrice = parseInt(totalPackagePrice, 10) + parseInt(hotel4Charge, 10) ;
                                    console.log(totalPackagePrice)

                                    prevVehicleCharge = hotel4Charge;

                                    servicecharge = parseInt(totalPackagePrice, 10) * 5 / 100 ;
                                    totbooking = parseInt(totalPackagePrice, 10) + parseInt(servicecharge, 10)

                                    $("#totPackageCharge").val(totalPackagePrice);
                                    $("#serviceCharge").val(servicecharge);
                                    $("#totbookingprice").val(totbooking);
                                }
                                break;
                        }
                    });

      // return swal("Done!", "success");

                }
                // swal("OOPS!","error");
                // clearFields();

            },
            error: (error) => {
                swal("OOPS!", "An error occurred while communicating with the server ! ", "error");
            }
        });

    });
});

var userId = "";
$(document).ready(function(){
    let username = JSON.parse(localStorage.getItem("userName"));

    $.ajax({
        url: "http://localhost:8080/getUserDetailsByUserName?UserName=" + username,
        method: "GET",
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("packageDetailAuthToken"))
        },
        success: (res) => {
            console.log(res.data)
            if (res.statusCode === 200 || res.statusCode === 201) {

                console.log(res.data.userId)

                $("#user").val(res.data.userId);

                userId = res.data.userId;

                // return swal("Done!", "success");

            }
            // swal("OOPS!","error");
            // clearFields();

        },
        error: (error) => {
            swal("OOPS!", "An error occurred while communicating with the server ! ", "error");
        }
    });
});


var packageval = document.getElementById('package');
var durationval = document.getElementById('duration');
var adultsval = document.getElementById('adults');
var kidsval = document.getElementById('kids');
var vehicleval = document.getElementById('vehicleCharge');
var hotelval = document.getElementById('hotelCharge');
var form = document.getElementById('form');

const package_error = document.getElementById('package_error');
const duration_error = document.getElementById('duration_error');
const adults_error = document.getElementById('adults_error');
const kids_error = document.getElementById('kids_error');
const vehicle_error = document.getElementById('vehicle_error');
const hotel_error = document.getElementById('hotel_error');

const digitRegex = /\d/;

form.addEventListener('submit',(e) =>{

    if (packageval.value === '' || packageval.value == null) {
        e.preventDefault();
        package_error.innerHTML = "Package is required";
        packageval.style.borderColor = "red";
    } else {
        e.preventDefault();
        package_error.innerHTML = "";
        packageval.style.borderColor = "green";
    }


    if (durationval.value === '' || durationval.value == null) {
        e.preventDefault();
        duration_error.innerHTML = "Duration is required";
        durationval.style.borderColor = "red";
    } else {
        e.preventDefault();
        duration_error.innerHTML = "";
        durationval.style.borderColor = "green";
    }

    if (adultsval.value === '' || adultsval.value == null ) {
        e.preventDefault();
        adults_error.innerHTML = "Adults is required";
        adultsval.style.borderColor = "red";
    } else{
        e.preventDefault();
        adults_error.innerHTML = "";
        adultsval.style.borderColor = "green";
    }

    if (kidsval.value === '' || kidsval.value == null ) {
        e.preventDefault();
        kids_error.innerHTML = "count is required";
        kidsval.style.borderColor = "red";
    } else {
        e.preventDefault();
        kids_error.innerHTML = "";
        kidsval.style.borderColor = "green";
    }

    if (vehicleval.value === '' || vehicleval.value == null) {
        e.preventDefault();
        vehicle_error.innerHTML = "Vehicle Charge is required";
        vehicleval.style.borderColor = "red";
    } else {
        e.preventDefault();
        vehicle_error.innerHTML = "";
        vehicleval.style.borderColor = "green";
    }

    if (hotelval.value === '' || hotelval.value == null) {
        e.preventDefault();
        hotel_error.innerHTML = "Hotel Charge is required";
        hotelval.style.borderColor = "red";
    } else {
        e.preventDefault();
        hotel_error.innerHTML = "";
        hotelval.style.borderColor = "green";
    }

})



// save
$(document).ready(() => {
    $(document).on("click", "#Submit", () => {
        if (!validator()) {
            return swal("Operation failed!", "Please fill all the fields!", "error")
        }

        setTimeout(() => {
            let packageDetail = {
                packageDetailId: "",
                packageCategory: packageSelected,
                travelDuration: $("#duration").val(),
                travelArea: areaselected,
                noOfAdults: $("#adults").val(),
                noOfChildren: $("#kids").val() ,
                totalHeadCount: totheadcount,
                withPetsOrNot: petSelected,
                isGuideIncluded: guideincluded,
                packageValue: totbooking,
                vehicleId: vehicleid,
                hotelId: hotelId,
                guideId: guideId,
                packageId: packageSelectedId,
                userId: $("#user").val()
            }

            $.ajax({
                url: "http://localhost:8083/save",
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("packageDetailAuthToken"))
                },
                data: JSON.stringify(packageDetail),
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
    if ($("#user").val() === "" || $("#package").val() === "" || $("#area-select").val() === "" || $("#duration").val() === "" || $("#adults").val() === "" || $("#kids").val() === "" || $("#totalcount").val() === "" || $("#pet-select").val() === "" || $("#guideincluded-select").val() === "" || $("#guide-select").val() === ""  || $("#guideCharge").val() === ""  || $("#vehicle-select").val() === ""  || $("#vehicleCharge").val() === ""  || $("#hotel-select").val() === ""  || $("#hotelCharge").val() === ""  || $("#totPackageCharge").val() === ""  || $("#serviceCharge").val() === ""  || $("#totbookingprice").val() === "") {
        return false;
    }
    return true;
}


function clearFields() {
    $("#PackageDetailId").val("");
    $("#user").val("");
    $("#package").val("");
    $("#duration").val("");
    $("#adults").val("");
    $("#kids").val("");
    $("#totalcount").val("");
    // $("#pet-select").def;
    $("#guideCharge").val("");
    $("#guide-select").empty();
    $("#vehicleCharge").val("");
    $("#vehicle-select").empty();
    $("#hotelCharge").val("");
    $("#hotel-select").empty();
    $("#totPackageCharge").val("");
    $("#serviceCharge").val("");
    $("#totbookingprice").val("");
}

$(document).ready(() => {
    $(document).on("click", "#clearButton", () => {
        clearFields();
    })
})

$(document).ready(() => {
    $(document).on("click", "#payment", () => {
        window.location.href = "payment.html";
    })
})

































// console.log(packageSelected)
// console.log(packageSelectedId)
// console.log(areaselected)
// console.log(totheadcount)
// console.log(petSelected)
// console.log(guideincluded)
// console.log(guideId)
// console.log(vehicleid)
// console.log(hotelId)





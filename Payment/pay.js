$(document).ready(()=>{
    localStorage.setItem("paymentAuthToken",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IlBBWUEiLCJzdWIiOiJzYW5kYXNpIiwiaWF0IjoxNjk4MDQxMDExLCJleHAiOjQ4NTE2NDEwMTF9.0fN8DLh3wpx_D3UeY1caA1nXpLYxKX1JWUfhdVF6MHk"))
    // $("#GuideId").prop("disabled", true);
    addTableField();
});

function  addTableField(){
    $.ajax({
        url: "http://localhost:8086/fetchAll",
        method: "GET",
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("paymentAuthToken"))
        },
        success: (res) => {
            console.log(res.data)

            var html = "";
            res.data.forEach(function (payment){

                html += "<tr>";
                html += "<td>" + payment.paymentId + "</td>";
                html += "<td>" + payment.paymentDate + "</td>";
                html += "<td>" + payment.paymentAmount + "</td>";
                html += "<td>" + payment.userId + "</td>";
                html += "<td>" + payment.packageDetailsId + "</td>";
                html += '<td><button onclick="deleteDataa(' + payment.paymentId + ')" class="btn btn-danger">Delete</button><button onclick="UpdateData(' + payment.paymentId + ')" class="btn btn-warning m-2">Edit</button></td>';
                html += "</tr>";
            })

            document.querySelector("#crudTable tbody").innerHTML = html;

        }, error: (error) => {
            swal("OOPS!", "An error occurred while communicating with the server ! ", "error");
        }
    })
}
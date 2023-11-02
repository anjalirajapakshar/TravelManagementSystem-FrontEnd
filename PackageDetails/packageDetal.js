$(document).ready(()=>{
    localStorage.setItem("packDAuthToken",JSON.stringify("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyUm9sZSI6IlBEQSIsInN1YiI6InByYXNhZGkiLCJpYXQiOjE2OTgwNDA5NjMsImV4cCI6NDg1MTY0MDk2M30.sz-7PTGq2A8K35crnZbe2HThRRy7cJjcHfG43XDGSYM"))
    // $("#GuideId").prop("disabled", true);
    addTableField();
});

function  addTableField(){
    $.ajax({
        url: "http://localhost:8083/fetchAll",
        method: "GET",
        headers: {
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("packDAuthToken"))
        },
        success: (res) => {
            console.log(res.data)

            var html = "";
            res.data.forEach(function (packd){

                html += "<tr>";
                html += "<td>" + packd.packageDetailId + "</td>";
                html += "<td>" + packd.packageCategory + "</td>";
                html += "<td>" + packd.totalHeadCount + "</td>";
                html += "<td>" + packd.travelDuration + "</td>";
                html += "<td>" + packd.packageValue + "</td>";
                html += '<td><button onclick="deleteDataa(' + packd.packageDetailId + ')" class="btn btn-danger">Delete</button><button onclick="UpdateData(' + packd.packageDetailId + ')" class="btn btn-warning m-2">Edit</button></td>';
                html += "</tr>";
            })

            document.querySelector("#crudTable tbody").innerHTML = html;

        }, error: (error) => {
            swal("OOPS!", "An error occurred while communicating with the server ! ", "error");
        }
    })
}
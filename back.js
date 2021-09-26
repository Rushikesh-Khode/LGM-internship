json=[]
table=document.getElementById("grid")
loader=document.getElementById("loader")
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

fetch("https://reqres.in/api/users?page=1", requestOptions)
.then(response => response.text())
.then(result => getJson(result))
.catch(error =>error_alert(error));
function error_alert(error){
    console.log(error)
}



function getJson(data) {
    json=JSON.parse(data)
   

}

function showLoader(){
    loader.style.display="block"
    setTimeout(function(){ showUsers()}, 1000);
}

function showUsers(){
    loader.style.display="none"
    for (const key in json.data) {
        user=json.data[key]
        usercard="<tr><td><div class='card'><img src='"+user["avatar"]+"' alt='UserImg' style='width:100%'><h1>"+user["first_name"]+" "+user["last_name"]+"</h1><p class='title'>"+user["email"]+"</p><p><button></button></p></div></td></tr><br><br>"
        table.innerHTML+=usercard;
    }
}
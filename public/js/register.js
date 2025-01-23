async function register(){
   let user= document.getElementById("username").value;
   let password = document.getElementById("password").value;

   const response = await fetch("/register",{
    method: "POST",
    headers:{
        "Content-Type": "application/json"
    },
    body: JSON.stringify({name:name,rounds:rounds,time:time,rest:rest,link:link,description:description,token:token})


})

const data = await response.json();


   

}
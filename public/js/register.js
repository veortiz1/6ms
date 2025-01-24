async function register(){
   let user= document.getElementById("username").value;
   let password = document.getElementById("password").value;

   const response = await fetch("/register",{
    method: "POST",
    headers:{
        "Content-Type": "application/json"
    },
    body: JSON.stringify({user:user,password:password})


})

const data = await response.json();

if(!response.ok){

}
else{
    
}


   

}
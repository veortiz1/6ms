async function register(){
   let user= document.getElementById("username").value;
   let password = document.getElementById("password").value;
   let retype = document.getElementById("verify_password").value;

   if(retype!=password){
    document.getElementById("error").style.display="flex";
    document.getElementById("error").style.color="red";
    document.getElementById("error").innerText="Passwords are not the same!";
    return;

   }
   document.getElementById("registerButton").disabled=true;

   const response = await fetch("/register",{
    method: "POST",
    headers:{
        "Content-Type": "application/json"
    },
    body: JSON.stringify({user:user,password:password})


})

const data = await response.json();

if(!response.ok){
console.log("Error registering user!");
if(data.error){
    document.getElementById("error").style.display="flex";
    document.getElementById("error").style.color="red";
    document.getElementById("error").innerText=data.error;

}
else{
    document.getElementById("error").style.display="flex";
    document.getElementById("error").style.color="red";
    document.getElementById("error").innerText="User exists!";
}
}
else{

    window.location.href = '/profile';

}


document.getElementById("registerButton").disabled=false;

   

}



async function login(){
    let user= document.getElementById("username").value;
    let password = document.getElementById("password").value;
    const response = await fetch("/register/login",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({user:user,password:password})
    
    
    })

    const data = await response.json();

    if(!response.ok){
        document.getElementById("error").style.display="flex";
        document.getElementById("error").style.color="red";
        document.getElementById("error").innerText=data.message;
    }
    else{
        window.location.href = '/profile';
    }
    
}
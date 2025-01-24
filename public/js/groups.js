async function create_group(){
    let name= document.getElementById("name").value;
    let password = document.getElementById("password").value;
    let description = document.getElementById("description").value;
 
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
 }
 else{
 
     window.location.href = '/profile';
 
 }
 
 
    
 
 }
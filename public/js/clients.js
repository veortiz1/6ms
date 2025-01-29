async function create_client(){
    let name=document.getElementById("name").value;
   let email = document.getElementById("email").value;
   let phone = document.getElementById("phone").value;
   let height = document.getElementById("height").value;
   let weight = document.getElementById("weight").value;




    const response = await fetch("/client/add",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name:name,email:email,phone:phone,height:height,weight:weight})
    
    
    })


const data = await response.json();

if(!response.ok){
    console.log("Client Not Added!");
    if(data.error){
        document.getElementById("error").style.display="flex";
        document.getElementById("error").innerText=data.error;
    }
}
else{
    window.location.href = '/profile';
}



}
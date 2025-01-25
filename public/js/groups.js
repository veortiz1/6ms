async function create_group(){
    let name= document.getElementById("name").value;
    let password = document.getElementById("password").value;
    let description = document.getElementById("description").value;


try{

    const response = await fetch("/groups",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name:name,password:password,description:description})
    
    
    })
    
    const data = await response.json();
    
    if(!response.ok){
    console.log("Error registering user!");
    if(data.error){
        document.getElementById("create_group_error").style.display="flex";
        document.getElementById("create_group_error").style.color="red";
        document.getElementById("create_group_error").innerText=data.error;

    }
    }
    else{
       console.log("Group Created!"); 
       document.getElementById("create_group_error").style.display="flex";
       document.getElementById("create_group_error").style.color="green";
       document.getElementById("create_group_error").innerText="Group Created!";
        
    
    }
}
catch(err){
    console.log("Error creating group!" + err);
}
 

 
 
    
 
 }
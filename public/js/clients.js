async function create_client(){
    let name=document.getElementById("name").value;
   
   let height = document.getElementById("height").value;
   let weight = document.getElementById("weight").value;




    const response = await fetch("/client/add",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name:name,height:height,weight:weight})
    
    
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



async function set_client_id(id,option){
  

    const response = await fetch("/client/edit_id",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id:id})
    
    
    })

    if(response.ok){

        if(parseInt(option)==1){
            window.location.href = '/edit_client';
        }
        else{
            window.location.href = '/delete_client';
        }

    

    }

}


async function edit_client(){
    let name=document.getElementById("name").value;

    let height = document.getElementById("height").value;
    let weight = document.getElementById("weight").value;
    const response = await fetch("/client/edit",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name:name,height:height,weight:weight})
    
    
    })

    const data = await response.json();


    if(response.ok){
        window.location.href = '/manage_client';
    }
    else{
        console.log("not edited!");
        if(data.error){
            document.getElementById("error").style.display="flex";
            document.getElementById("error").innerText=data.error;
            document.getElementById("error").style.color="red";
        }
    }


}

async function delete_client(id){

    const response = await fetch("/client/delete",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id:id})
    
    
    })

    const data = await response.json();


    if(response.ok){ 
            window.location.href = '/manage_client';
    }
  


}
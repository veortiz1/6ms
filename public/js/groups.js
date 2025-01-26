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




async function get_created_groups(){
try{

    const response = await fetch("groups/Created_Groups",{
        method: "get"
    })
    
    const data = await response.json();
    
    if(!response.ok){
    console.log("Error getting groups!!");
    
    }
    
    else{
     console.log("Groups Got!");
     const results = data.results;


     document.getElementById("created_groups").style.display="flex";

     document.getElementById("create_group_form").style.display="none";

     document.getElementById("created_groups").innerHTML = "";

     for(let i = 0;i<results.length;i++){
        let results_frame = document.createElement("div");
        results_frame.classList.add("created_groups_row");
        console.log(results[i].name);
       
        let results_text = document.createElement("p");
        results_text.textContent = results[i].name;
        results_text.classList.add("orange_highlight");
        results_text.id="created_group_name";
        results_frame.appendChild(results_text);


        let edit_group_button = document.createElement("button");
        edit_group_button.textContent="Edit";
        edit_group_button.classList.add("orange_bg");
        edit_group_button.addEventListener("click", function() {
            edit_group(results[i]._id);
        });
        results_frame.appendChild(edit_group_button);




        let delete_group_button = document.createElement("button");
        delete_group_button.textContent="Delete";
        delete_group_button.classList.add("orange_bg");
        delete_group_button.addEventListener("click", function() {
            delete_group(results[i]._id);
        });
        results_frame.appendChild(delete_group_button);
     
        
        document.getElementById("created_groups").appendChild(results_frame);
     }

    


    }
}
catch(err){
    console.log("Error creating group!" + err);
}
 

 }


async function edit_group(id){
    console.log(id);
}

async function delete_group(id){
    console.log(id);
}
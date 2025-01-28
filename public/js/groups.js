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

     document.getElementById("delete_user_frame").style.display="none";

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
            delete_group(results[i]._id,results[i].name);
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

async function delete_group(id,name){

    console.log(id);

    document.getElementById("created_groups").style.display="none";

    document.getElementById("delete_user_frame").style.display="flex";

    document.getElementById("create_group_form").style.display="none";

    document.getElementById("delete_user_frame").innerHTML = "";



    let delete_title_p = document.createElement("p");
    delete_title_p.textContent="Delete group "+name+" ?";
    delete_title_p.classList.add("orange_highlight");

    let button_frame = document.createElement("div");
    button_frame.classList.add("space_evenly");

    let yes_button=document.createElement("button");
    yes_button.id="yes";
    yes_button.textContent="Yes";
    yes_button.addEventListener("click", async function() {
        const response = await fetch("/groups/delete",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id:id})
        
        
        })
        
        const data = await response.json();
        
        if(!response.ok){
        console.log("Error deleting group!");

        }
        else{
            console.log("Group is deleted!");
        }
        

     });
 


    let no_button=document.createElement("button");
    no_button.id="no";
    no_button.textContent="No";
    no_button.addEventListener("click", function() {
       get_created_groups();
    });


    button_frame.appendChild(yes_button);
    button_frame.appendChild(no_button);



    document.getElementById("delete_user_frame").appendChild(delete_title_p);
    document.getElementById("delete_user_frame").appendChild(button_frame);




}


function joined_clicked(){
    document.getElementById("create_group_form").style.display="flex";
    document.getElementById("created_groups").style.display="none";
    document.getElementById("delete_user_frame").style.display="none";
}
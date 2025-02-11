let exercises= [ ];
let wid;



function add_exercise_to_workout(id,button_val){
    console.log(button_val);
    let exists=-1;
    for(let i = 0;i<exercises.length;i++){
    
        if(id==exercises[i]){
          exists=i;
          break;
          
        }
    }

    if(exists==-1){
        exercises.push(id);
        document.getElementById("select_exercise_button_bg_"+button_val).style.backgroundColor="yellow";
    }
    else{
        exercises.splice(exists, 1);
        document.getElementById("select_exercise_button_bg_"+button_val).style.background="none";

    }

    console.log(exercises);
}

async function add_workout(){

    if(exercises==0){
        document.getElementById("error").style.display="flex";
        document.getElementById("error").innerText="Please Select an exercise!";
        return
    }
    let name =document.getElementById("name").value;

    const response = await fetch("/workout/add",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name:name,exercises:exercises})
    
    
    })

    const data = await response.json();

    if(!response.ok){
        console.log("Workout not added!");
        if(data.error){
        document.getElementById("error").style.display="flex";
        document.getElementById("error").innerText=data.error;
        }
        else{
            document.getElementById("error").style.display="flex";
        document.getElementById("error").innerText="Error adding workout!";
        }

        
    }
    else{
        window.location.href = '/profile';
    }

}

async function edit_workout(id){
  

    const response = await fetch("/workout/set_wid",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id:id})
    
    
    })

    const data = await response.json();

    if(!response.ok){
      
        
    }
    else{
        window.location.href = '/edit_workout';
    }

}

async function remove_exercise(index,array,w_id){

    index = parseInt(index, 10);
   
    if (typeof array === "string") {
        array = JSON.parse(array);
    }
    console.log(array);
    array.splice(index, 1);
    console.log(array);

    const response = await fetch("/workout/remove_exercise",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({exercises:array,w_id:w_id})
    
    
    })

    if(response.ok){
        location.reload();
    }

}

async function add_exercise(id,w_id){


    const response = await fetch("/workout/add_exercise",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id:id,w_id:w_id})
    })

    if(response.ok){
        location.reload();
    }
}


async function edit_name(w_id){
    let name=document.getElementById("name").value;
    const response = await fetch("/workout/edit_name",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name:name,w_id:w_id})
    })

    if(response.ok){
        location.reload();
    }

    

}

async function set_wid(w_id){
    const response = await fetch("/workout/set_wid",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id:w_id})
    })
    if(response.ok){
        window.location.href = '/delete_workout';
    }
}

async function delete_workout(){

    const response = await fetch("/workout/delete_workout",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        }
    })

    if(response.ok){
        window.location.href = '/manage_workout';
    }

}


async function move_up(w_id,i,length,arr){
    i = parseInt(i, 10);

    console.log("i "+i);
    console.log("Type of i:", typeof i);
    let do_nothing=0;

    if (typeof arr === "string") {
        arr = JSON.parse(arr);
    }

   
    console.log("pre arr!");
    console.log(arr);


    if(i==0 || arr.length==0){
     do_nothing=1;
    }
    else{
        let swapped=arr[i];
       let swapped1=arr[i-1];
       

        arr[i]=swapped1;
        arr[i-1]=swapped;        
        


    }

    if(do_nothing==0){

        const response = await fetch("/workout/update_arr",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({arr:arr,w_id:w_id})
        })
        if(response.ok){
            location.reload();
        }
    
    }
    
    

    console.log(arr);
 

    

}


async function move_down(w_id,i,length,arr){
    i = parseInt(i, 10);

    console.log("i "+i);
    console.log("Type of i:", typeof i);
    let do_nothing=0;

    if (typeof arr === "string") {
        arr = JSON.parse(arr);
    }

    console.log("PRE ARRAY:");

    console.log(arr);
    if(i==arr.length-1 || arr.length==0){
     do_nothing=1;
    }
    else{
       let swapped=arr[i];
       let swapped1=arr[i+1];

       console.log("swapped: "+swapped);

       console.log("swapped 1: "+swapped1);

        arr[i]=swapped1; 
        arr[i+1]=swapped;        
        


    }

    if(do_nothing==0){

        const response = await fetch("/workout/update_arr",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({arr:arr,w_id:w_id})
        })
        if(response.ok){
            location.reload();
        }
    
    }
    
    


    console.log(arr);
    

}
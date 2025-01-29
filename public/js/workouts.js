let exercises= [ ];



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
    document.getElementById("Name");
}


function get_link(){
    let id=document.getElementById("options").value;

    let link="http://localhost:3000/view_workout?id="+id;

    document.getElementById("link").innerText=link;
    document.getElementById("link").href=link;

    
}


function get_plan_link(){
    let id=document.getElementById("options").value;

    let link="http://localhost:3000/view_plan?id="+id;

    document.getElementById("link").innerText=link;
    document.getElementById("link").href=link;

    
}

async function add_plan(){
    let id= document.getElementById("options").value;
    let monday = document.getElementById("monday").value;
let tuesday = document.getElementById("tuesday").value;
let wednesday = document.getElementById("wednesday").value;
let thursday = document.getElementById("thursday").value;
let friday = document.getElementById("friday").value;
let saturday = document.getElementById("saturday").value;
let sunday = document.getElementById("sunday").value;
    console.log(monday);
    const response = await fetch("/workout/add_plan",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({  id:id,monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
            saturday: saturday,
            sunday: sunday})
    
    
    })

}
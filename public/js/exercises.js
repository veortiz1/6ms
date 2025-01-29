async function add_exercise(){
    let name=document.getElementById("name").value;
    let rounds = document.getElementById("rounds").value;
    let time = document.getElementById("time").value;
    let rest = document.getElementById("rest").value;
    let tips = document.getElementById("tips").value;
 
 
 
 
     const response = await fetch("/exercise/add",{
         method: "POST",
         headers:{
             "Content-Type": "application/json"
         },
         body: JSON.stringify({name:name,rounds:rounds,time:time,rest:rest,tips:tips})
     
     
     })
 
 
 const data = await response.json();
 
 if(!response.ok){
     console.log("Exercise not added!");
     if(data.error){
         document.getElementById("error").style.display="flex";
         document.getElementById("error").innerText=data.error;
     }
 }
 else{
     window.location.href = '/profile';
 }
 
}
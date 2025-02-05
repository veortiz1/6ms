

function get_link(){
    let id=document.getElementById("options").value;

    let link="localhost:3000/view_workout?id="+id;

    document.getElementById("link").innerText=link;
    document.getElementById("link").href=link;

    
}
async function logout(){
    const response = await fetch("/register/logout",{
        method: "GET"
    })

    if(response.ok){
        window.location.href = '/';
    }
    

}
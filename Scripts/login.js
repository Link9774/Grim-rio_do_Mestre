const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();


    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const response = await fetch("http://localhost:3000/mestres");
    const mestres = await response.json();

    console.log(mestres);
console.log(loginEmail.value);
console.log(loginPassword.value);
    
    const findMaster = mestres.find(
        mestre => mestre.userEmail === email && mestre.password === password
    );
    if(findMaster){
        
        localStorage.setItem(
            "loggedMaster",
            JSON.stringify(findMaster)
        );
        console.log("Login realizado");
        
        window.location.href = "dashboard.html";
    }

});
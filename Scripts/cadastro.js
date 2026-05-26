const form = document.getElementById("registerForm");

form.addEventListener("submit", function(event){
    
    event.preventDefault();

    const userName = document.getElementById("userName").value;
    const userEmail = document.getElementById("userEmail").value;
    const password = document.getElementById("password").value;
    const confPassword = document.getElementById("confPassword").value;

    const userNameError = document.getElementById("userNameError");
    const userEmailError = document.getElementById("userEmailError");
    

    userNameError.innerHTML = "";
    userEmailError.innerHTML = "";

    let valid = true;

    if(userName.length < 3){
        userNameError.innerHTML = "O nome precisa ter pelo menos 3 caracteres.";

        valid = false;
    }

    if(!userEmail.includes("@")){

        userEmailError.innerHTML = "Digite um email válido.";

        valid = false;
    }

    if(password.length < 6){
        alert("A senha precisa ter no mínimo 6 caracteres.");

        valid = false;
    }

    if(password !== confPassword){
        alert("As senhas não coincidem");
        valid = false;
    }

    if(valid){
        const userData = {
            userName: userName,
            email: userEmail,
            password: password
        };
    }



});
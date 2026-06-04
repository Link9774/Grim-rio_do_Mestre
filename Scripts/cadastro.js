const form = document.getElementById("registerForm");

form.addEventListener("submit", function(event){
    event.preventDefault();

    const userName = document.getElementById("userName");
    const userEmail = document.getElementById("userEmail");
    const password = document.getElementById("password");
    const confPassword = document.getElementById("confPassword");

    const userNameError = document.getElementById("userNameError");
    const userEmailError = document.getElementById("userEmailError");

    let valid = true;

    userName.classList.remove("error");
    userNameError.textContent = "";   

    if(userName.value.trim() === ""){
        userName.classList.add("error")
        userNameError.textContent = "O campo Nome de Usuário é obrigatório";
        valid = false;
    }
     if(userName.value.length < 3){
        userNameError.innerHTML = "O nome precisa ter pelo menos 3 caracteres.";

        valid = false;
    }
    
    userEmail.classList.remove("error"); 
     userNameError.textContent = "";
     
     if(userEmail.value.trim() === ""){
        userEmail.classList.add("error")
        userEmailError.textContent = "O campo Email é obrigatório";
        valid = false;
    }
    if(password.value == null){
        alert("O campo Senha é obrigatorio")
        valid = false;
    }
    
    
    if(password.value !== confPassword.value){
        alert("As senhas não coincidem!");
        valid = false;
    }  
    if(!userEmail.value.includes("@")){

        userEmailError.innerHTML = "Digite um email válido.";

        valid = false;
    }

    if(password.value.length < 6){
        alert("A senha precisa ter no mínimo 6 caracteres.");

        valid = false;
    }
    
    
    
    if(valid){
        const userData = {
            userName: userName.value,
            userEmail: userEmail.value,
            password: password.value
        };
        fetch("http://localhost:3000/mestres",{
        method: "POST",
        body: JSON.stringify(userData),
        headers:{
            "Content-Type": "application/json"
        }
        })
         .then(()=>{
            alert("Usuário cadastrado");
        }); 
    }
    window.location.href = "login.html";

})
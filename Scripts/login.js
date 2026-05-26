const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (event) => {

    event.preventDefault();


    const email = document.getElementById("loginEmail").value;

    const password = document.getElementById("loginPassword").value;


    if(email !== "" && password !== ""){


        localStorage.setItem("logado", "true");

        window.location.href = dashboard.html;

    }else{

        alert("Preencha todos os campos!");

    }

});
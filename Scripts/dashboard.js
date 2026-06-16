console.log("dashboard carregado");
const showSessions = document.getElementById("showSessions");
const showCreate = document.getElementById("showCreate");
const sessionsSection = document.getElementById("sessionsSection");
const createSection = document.getElementById("createSection");
const createSessionBtn = document.getElementById("createSessionBtn");
const sessionsList = document.getElementById("sessionsList");
const lastSession = document.getElementById("lastSession");
const loggedMaster = JSON.parse(
    localStorage.getItem("loggedMaster")
);
console.log(loggedMaster);
loadSessions();
console.log(showSessions);
console.log(showCreate);
console.log(createSection);

async function loadSessions() {
    
    const response = await fetch(
        `http://localhost:3000/sessions?masterId=${loggedMaster.id}`
    );
    sessions = await response.json();

    renderSessions();
}



showSessions.addEventListener("click", () => {

    sessionsSection.classList.remove("hidden");

    createSection.classList.add("hidden");

});


showCreate.addEventListener("click", () => {

    createSection.classList.remove("hidden");

    sessionsSection.classList.add("hidden");

});

createSessionBtn.addEventListener("click", async () =>{
    const name = document.getElementById("sessionName").value;
    const system = document.getElementById("systemSelect").value;

    if(name === ""){
        alert("Uma aventura precisa de um grande nome, Digite o nome da sessão");

        return;
    }

    const session = {

        name,
        system,
        masterId: loggedMaster.id 
    };

    await fetch("http://localhost:3000/sessions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(session)
    });

    await loadSessions();

    lastSession.innerHTML = `${name} / ${system}`;
}); 

function renderSessions(){

    sessionsList.innerHTML = "";


    sessions.forEach(session => {

        const card = document.createElement("div");
        
        card.classList.add("session-card");
        card.innerHTML = `
        
            <h2>${session.name}</h2>

            <p>${session.system}</p>

        `;
        card.addEventListener("click", () =>{
            window.location.href = `session.html?id=${session.id}`;
            
            formFields.innerHTML = "";
        });
        
        sessionsList.appendChild(card);

    });

}
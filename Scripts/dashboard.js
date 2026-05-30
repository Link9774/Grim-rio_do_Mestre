console.log("dashboard carregado");
const showSessions = document.getElementById("showSessions");
const showCreate = document.getElementById("showCreate");
const sessionsSection = document.getElementById("sessionsSection");
const createSection = document.getElementById("createSection");
const createSessionBtn = document.getElementById("createSessionBtn");
const sessionsList = document.getElementById("sessionsList");
const lastSession = document.getElementById("lastSession");

console.log(showSessions);
console.log(showCreate);
console.log(createSection);

let sessions =[];

showSessions.addEventListener("click", () => {

    sessionsSection.classList.remove("hidden");

    createSection.classList.add("hidden");

});


showCreate.addEventListener("click", () => {

    createSection.classList.remove("hidden");

    sessionsSection.classList.add("hidden");

});

createSessionBtn.addEventListener("click", () =>{
    const name = document.getElementById("sessionName").value;
    const system = document.getElementById("systemSelect").value;

    if(name === ""){
        alert("Uma aventura precisa de um grande nome, Digite o nome da sessão");

        return;
    }

    const session = {

        name,
        system
    };

    sessions.unshift(session);

    renderSessions();

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

        sessionsList.appendChild(card);

    });

}
console.log("sessão carregada");

const sessionTitle = document.getElementById("sessionTitle");
const systemName = document.getElementById("systemName");

const playersList = document.getElementById("playersList");
const monstersList = document.getElementById("monstersList");
const npcList = document.getElementById("npcList");

const params = new URLSearchParams(window.location.search);
const sessionId = params.get("id");

let currentSession;

loadSession();

async function loadSession() {
    
    const response = await fetch(
        `http://localhost:3000/sessions/${sessionId}`
    );

currentSession = await response.json();

if(!currentSession.id){
    alert("Sessão não encontrada.");
    window.location.href = "dashboard.html";
    return;
}

sessionTitle.textContent = currentSession.name;
systemName.textContent = currentSession.system;

applyTheme(currentSession.system);

loadChar();
}

function applyTheme(system){

    switch(system){
        case "D&D 5e":
            document.body.classList.add("dnd");
        break;
    
        case "Call of Cthulhu":
            document.body.classList.add("cthulhu");
        break;

        case "Tormenta 20":
            document.body.classList.add("tormenta");
        break;

        case "Cyberpunk RED":
            document.body.classList.add("cyberpunk");
        break;
    }
}

async function loadChar() {
    const response = await fetch(
        `http://localhost:3000/char?sessionId=${sessionId}`
    );
    const chars = await response.json();

    renderChar(chars);
}

function renderChar(chars){
    playersList.innerHTML = "";
    monstersList.innerHTML = "";
    npcList.innerHTML = "";

    chars.forEach(char =>{
        const card = document.createElement("div");

        card.classList.add("char-card");

        card.innerHTML = `
            <h4>${char.name}</h4>
            <p>HP: ${char.hp}/${char.maxHp}</p>
        `;

        switch(char.type){
            case "player":
                playersList.appendChild(card);
                break;
        
                case "monster":
                monstersList.appendChild(card);
                break;
                
                case "npc":
                npcList.appendChild(card);
                break;
        
         }
    });


}

const deleteSessionBtn = document.getElementById("deleteSessionBtn");

deleteSessionBtn.addEventListener("click", async () =>{
    const confirmDelete = confirm(
        "Deseja realmente excluir esta sessão ?"
    );
    if(!confirmDelete){
        return;
    }
    await fetch(
        `http://localhost:3000/sessions/${sessionId}`,
        {
            method: "DELETE"
        }
    );
    window.location.href = "dashboard.html";
});
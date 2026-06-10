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

        let sanityHtml = "";
        if(char.sanityMax > 0){
            sanityHtml = `<p>SAN: ${char.sanity}/${char.sanityMax}</p>`;
        }

        let roleText = "Classe";
        
        if(char.type === "monster"){
            roleText = "Tipo";
        }
        
        card.innerHTML = `
            <h4>${char.name}</h4>
            <p>HP: ${char.hp}/${char.maxHp}</p>
            <p>${roleText}: ${char.class}<p>
            ${sanityHtml}
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
    
    const response = await fetch(
        `http://localhost:3000/char?sessionId=${sessionId}`
    );
    
    const chars = await response.json();

    for(const char of chars){
        await fetch(
            `http://localhost:3000/char/${char.id}`,{
                method: "DELETE"
            }
        );
    }

    await fetch(
        `http://localhost:3000/sessions/${sessionId}`,
        {
            method: "DELETE"
        }
    );
    window.location.href = "dashboard.html";
});

const createCharBtn= document.getElementById("createCharBtn");
const charForm = document.getElementById("charForm");

createCharBtn.addEventListener("click", () =>{
    charForm.classList.toggle("hidden");
});

const charType = document.getElementById("charType");
const formFields = document.getElementById("formFields");

charType.addEventListener("change", () =>{

    switch(charType.value){

        case "player":
            renderPlayerForm();
            break;

        case "monster":
            renderMonsterForm();
            break;

        case "npc":
            renderNpcForm();
            break;
    }
});

function renderPlayerForm(){

    let sanityField = "";

    if(
        currentSession.system === "Call of Cthulhu"
    ){
        sanityField = `
        <input
        id="sanityMax"
        type="number"
        placeholder="Sanidade Máxima">
        `;
    }

formFields.innerHTML = `
<input
        id="charName"
        placeholder="Nome">

        <input
        id="charClass"
        placeholder="Classe">

        <input
        id="maxHp"
        type="number"
        placeholder="HP Máximo">

        ${sanityField}

        <button id="saveCharBtn">
            Salvar
        </button>
`;

document.getElementById("saveCharBtn").addEventListener("click", savePlayer)
}

async function savePlayer(){
    const name = document.getElementById("charName").value;
    const playerClass = document.getElementById("charClass").value;
    const maxHp = document.getElementById("maxHp").value;
    const sanityInput = document.getElementById("sanityMax");

    let sanityMax = 0;

    if(sanityInput){
        sanityMax = Number(sanityInput.value);
    }
    const player = {
        type: "player",
        name: name,
        class: playerClass,
        hp: maxHp,
        maxHp: maxHp,
        sanity: sanityMax,
        sanityMax: sanityMax,
        sessionId: sessionId
    };
    await fetch(
        "http://localhost:3000/char",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(player)
        }
    );
   await loadChar();
   formFields.innerHTML = ""; 
   charName.value = "";

}

function renderMonsterForm(){
    formFields.innerHTML = `
    <input
    id="charName"
        placeholder="Nome">

        <input
        id="charClass"
        placeholder="Tipo">

        <input
        id="maxHp"
        type="number"
        placeholder="HP Máximo">
    
        <button id="saveCharBtn">
            Salvar
        </button>
    
        `;
    document.getElementById("saveCharBtn").addEventListener("click", saveMonster)
}

async function saveMonster(){
    const name = document.getElementById("charName").value;
    const monsterType = document.getElementById("charClass").value;
    const maxHp = document.getElementById("maxHp").value;

    const monster = {
        type: "monster",
        name: name,
        class: monsterType,
        hp: maxHp,
        maxHp: maxHp,
        sessionId: sessionId
    };
    await fetch(
        "http://localhost:3000/char", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(monster)
        }
    );
    await loadChar();
    formFields.innerHTML = "";
    charType.value = "";

}
const sendFeedback = document.getElementById("sendFeedback");

const feedbackList = document.getElementById("feedbackList");

sendFeedback.addEventListener("click", () => {

    const name = document.getElementById("nameInput").value;

    const feedback = document.getElementById("feedbackInput").value;


    if(name === "" || feedback === ""){

        alert("Preencha todos os campos!");

        return;
    }


    const card = document.createElement("div");

    card.classList.add("feedback-card");


    card.innerHTML = `
    
        <p>"${feedback}"</p>

        <span>- ${name}</span>

    `;


    feedbackList.prepend(card);

    document.getElementById("nameInput").value = "";

    document.getElementById("feedbackInput").value = "";

});
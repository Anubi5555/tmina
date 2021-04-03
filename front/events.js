GetData();

async function GetData() {
    try {
        let events = await axios.get("/api/events");
        RenderCards(events.data.events);
        AddEventListeners();
    } catch (err) {
        console.log(err);
    }
}

function AddEventListeners() {
    let moreInfoBtn = [...document.querySelectorAll(".is-info")];
    moreInfoBtn.forEach((btn) =>
        btn.addEventListener("click", () => {
            window.location.href = `event.html?id=${getId(btn)}`;
        })
    );

    let deleteBtns = [...document.querySelectorAll(".delete")];
    deleteBtns.forEach((btn) =>
        btn.addEventListener("click", () => DeleteData(btn))
    );
}

function RenderCards(events) {
    const cardsDiv = document.querySelector("#cards");
    let cards = "";
    events.forEach((event) => {
        cards += CreateCard(event);
    });

    cardsDiv.innerHTML = cards;
}

function CreateCard(event) {

    let card = `
      <div event-id=${event._id} data-role="tile" id="tile" data-size="large"  style="background-color:#242526; border-color: #242526;">
        <h2>${event.name}</h2>
        <button class="button is-info is-light">Info</button>
        <button class="delete"></button>
        <button class="fas fa-info-circle"></button>
      </div>`;

    return card;
}

async function DeleteData(btn) {
    let id = getId(btn);
    try {
        await axios.delete(`/api/events/${id}`);
        window.location.href = "events.html";
    } catch (err) {
        console.log(err);
    }
}

function getId(btn) {
    let parent = btn.parentElement;
    let id = parent.getAttribute("event-id");
    return id;
}

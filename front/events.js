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
    let moreInfoBtn = [...document.querySelectorAll(".info-button")];
    moreInfoBtn.forEach((btn) =>
        btn.addEventListener("click", () => {
            window.location.href = `event.html?id=${getId(btn)}`;
        })
    );

    let deleteBtns = [...document.querySelectorAll(".delete-button")];
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
    
    <div class="row">
    <div class="col s12 m7">
      <div class="card">
        <div class="card-image">
          
          <span class="card-title">Card Title</span>
        </div>
        <div class="card-content">
         <h1 class="title">${event.name}</h1>
          <p>Opis</p>
        </div>
        <div class="card-action">
          <button class="button info-button is-info is-focused">Info</button>

        <button class="button delete-button is-danger is-outlined" style="margin-left:50%;">
            <span>Delete</span>
            <span class="icon is-small">
            <i class="fas fa-times"></i>
            </span>
        </button>
        </div>
      </div>
    </div>
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

GetData();

async function GetData() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    let event;
    try {
        event = await axios.get(`/api/event?id=${id}`);
        console.log(event);
    } catch (err) {
        console.log(err);
        window.location.href = "events.html";
    }

    RenderInfo(event.data.events);
    const deleteBtn = document.querySelector(".delete-event-button");
    deleteBtn.addEventListener("click", () => DeleteData(id));
}

function RenderInfo(event) {
    const name = document.querySelector("#name");
    name.innerHTML = `<td><p style="margin-left: 60%;"><b>${event.name}</b></p></td><td></td>`;

    const organizator = document.querySelector("#organizer");
    organizator.innerHTML = `<td><p>Organizator:</p></td><td><p>${event.info.organizer}</p></td>`;

    const gameroom = document.querySelector("#gameroom");
    gameroom.innerHTML = `<td><p>Mesto:</p></td><td><p>${event.info.gameroom}</p></td>`;

    const game = document.querySelector("#game");
    game.innerHTML = `<td><p>Igra:</p></td><td><p>${event.info.game}</p></td>`;

    const price = document.querySelector("#price");
    price.innerHTML = `<td><p>Cena ucesca</p></td><td><p>${event.info.price}</p></td>`;

    const attendees = document.querySelector("#attendees");
    attendees.innerHTML = `<td><p>Broj ucesnika:</p></td><td><p>${event.info.attendees}</p></td>`;

    const prize = document.querySelector("#prize");
    prize.innerHTML = `<td><p>Nagrada:</p></td><td><p>${event.info.prize}</p></td>`;

    /* const desc = document.querySelector("#desc");
    desc.innerHTML = `<p style="text-align: center;">${event.desc}</p>`; */
}

async function DeleteData(id) {
    try {
        await axios.delete(`api/events/${id}`);
        window.location.href = "events.html";
    } catch (err) {
        console.log(err);
    }
}

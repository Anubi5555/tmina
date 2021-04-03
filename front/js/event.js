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
    name.innerHTML = `<td><p style="margin-left: 100%;"><b>${event.name}</b></p></td><td></td>`;

    /* const organizator = document.querySelector("#organizer");
    organizator.innerHTML = `<td><p>Organizator:</p></td><td><p>${event.organizer}</p></td>`; */

    const type = document.querySelector("#type");
    type.innerHTML = `<td><p>Igra:</p></td><td><p>${event.type}</p></td>`;

    const gameroom = document.querySelector("#gameroom");
    gameroom.innerHTML = `<td><p>Mesto:</p></td><td><p>${event.gameroom}</p></td>`;

    /* const attendees = document.querySelector("#attendees");
    attendees.innerHTML = `<td><p>Broj ucesnika:</p></td><td><p>${event.info.attendees}</p></td>`; */

    const desc = document.querySelector("#desc");
    desc.innerHTML = `<td><p>Opis:</p></td><td><p>${event.desc}</p></td>`;
}

async function DeleteData(id) {
    try {
        await axios.delete(`api/events/${id}`);
        window.location.href = "events.html";
    } catch (err) {
        console.log(err);
    }
}

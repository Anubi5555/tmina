const addButton = document.querySelector(".add-button");
addButton.addEventListener("click", GetInput);

async function GetInput() {
    const nameInput = document.querySelector("#name-input");
    const organizerInput = document.querySelector("#organizer-input");
    const radionica = document.querySelector("#radionica");
    const gameroomInput = document.querySelector("#gameroom-input");
    //const attendeesInput = document.querySelector("#attendees-input");
    const descInput = document.querySelector("#desc-input");

    const name = nameInput.value;
    const organizer = organizerInput.value;
    let type;
    if(radionica.value)
        type="radionica";
    else
        type="takmicenje";
    const gameroom = gameroomInput.value;
    //const attendees = attendeesInput.value;
    const desc = descInput.value;

    let event = {
        name: name,
        organizer: organizer,
        type: type,
        gameroom: gameroom,
        //attendees: attendees,
        desc: desc
    };

    let newEvent;

    try {
        newEvent = await axios.post("api/events", event);
    } catch (err) {
        console.log(err);
    }

    window.location.href = "events.html";
}

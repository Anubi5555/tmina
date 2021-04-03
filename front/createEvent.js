const addButton = document.querySelector(".add-button");
addButton.addEventListener("click", GetInput);

async function GetInput() {
    const nameInput = document.querySelector("#name-input");
    const organizerInput = document.querySelector("#organizer-input");
    const gameroomInput = document.querySelector("#gameroom-input");
    const gameInput = document.querySelector("#game-input");
    const priceInput = document.querySelector("#price-input");
    const attendeesInput = document.querySelector("#attendees-input");
    const prizeInput = document.querySelector("#prize-input");
    //const descInput = document.querySelector("#desc-input");

    const name = nameInput.value;
    const organizer = organizerInput.value;
    const gameroom = gameroomInput.value;
    const game = gameInput.value;
    const price = priceInput.value;
    const attendees = attendeesInput.value;
    const prize = prizeInput.value;
    //const desc = descInput.value;

    let event = {
        name: name,
        info: {
            organizer: organizer,
            gameroom: gameroom,
            game: game,
            price: price,
            attendees: attendees,
            prize: prize
        },
        //desc: desc
    };

    let newEvent;

    try {
        newEvent = await axios.post("api/events", event);
    } catch (err) {
        console.log(err);
    }

    window.location.href = "events.html";
}

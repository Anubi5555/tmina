GetData();

async function GetData() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    let event;
    try {
        event = await axios.get(`/api/gameroom?id=${id}`);
        console.log(event);
    } catch (err) {
        console.log(err);
        window.location.href = "gamerooms.html";
    }

    RenderInfo(event.data.events);
}

function RenderInfo(gameroom) {
    const name = document.querySelector("#name");
    name.innerHTML = `<h1>${gameroom.name}</h1>`;

    const img = document.querySelector("#img");
    img.innerHTML = `<img class="image-igraonica" src="${gameroom.img}"/>`;

    const desc = document.querySelector("#desc");
    desc.innerHTML = `
    <h3>Opis:</h3></br>
    <p>${gameroom.desc}</p>`;

    const hours = document.querySelector("#hours");
    hours.innerHTML = `
    <h3>Radno vreme:</h3></br>
    <p>
        Ponedeljak: ${gameroom.hours.mon}</br>
        Utorak: ${gameroom.hours.tue}</br>
        Sreda: ${gameroom.hours.wed}</br>
        Cetvrtak: ${gameroom.hours.thu}</br>
        Petak: ${gameroom.hours.fri}</br>
        Subota: ${gameroom.hours.sat}</br>
        Nedelja: ${gameroom.hours.sun}</br>
    </p>`;

    const prices = document.querySelector("#prices");
    prices.innerHTML = `
    <h3>Cenovnik:</h3></br>
    <p>
        1h: ${gameroom.prices.one}</br>
        5h: ${gameroom.prices.five}</br>
        10h: ${gameroom.prices.ten}</br>
    </p>`;

    const contact = document.querySelector("#contact");
    contact.innerHTML = `
    <h3>Kontakt:</h3></br>
    <p>
        Telefon: ${gameroom.contact.phone}</br>
        Email: ${gameroom.contact.email}</br>
    </p>`;

    const specs = document.querySelector("#specs");
    specs.innerHTML = `
    <h3>Specifikacije:</h3></br>
    <p>
        CPU: ${gameroom.specs.cpu}</br>
        GPU: ${gameroom.specs.gpu}</br>
        RAM: ${gameroom.specs.ram}</br>
    </p>`;

    const map = document.querySelector("#map");
    map.innerHTML = `<iframe src="${gameroom.map}" class="rounded google-map" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`;
}
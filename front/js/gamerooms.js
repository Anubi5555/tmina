GetData();

async function GetData() {
    try {
        let gamerooms = await axios.get("/api/gamerooms");
        RenderNavbar(gamerooms.data.gamerooms);
    } catch (err) {
        console.log(err);
    }
}

function RenderNavbar(gamerooms) {
    const navbar = document.querySelector(".navbar-dropdown");
    const gameroomChoose = document.querySelector("#gameroomChoose");
    let navbars = "";
    let gameroomChooses = "";
    gamerooms.forEach((gameroom) => {
        navbars += `<a href="gameroom.html?id=${gameroom._id}" class="navbar-item">${gameroom.name}</a><br/>`;
        gameroomChooses += `<option value="${gameroom.name}">${gameroom.name}</option>`
    });
    navbar.innerHTML = navbars;
    gameroomChoose.innerHTML = gameroomChooses;
}

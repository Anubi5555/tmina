GetData();

async function GetData() {
    try {
        let gamerooms = await axios.get("/api/gamerooms");
        RenderCarousel(gamerooms.data.gamerooms);
    } catch (err) {
        console.log(err);
    }
}

function RenderCarousel(gamerooms) {
    const carousel = document.querySelector("#carousel");
    let carousels = "";
    gamerooms.forEach((gameroom) => {
        carousels += `<div class="carousel-cell"></div>`;
    });
    carousel.innerHTML = carousels;
}

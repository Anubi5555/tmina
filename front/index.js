GetData();

async function GetData() {
    try {
        let gamerooms = await axios.get("/api/gamerooms");
        RenderSlider(gamerooms.data.gamerooms);
    } catch (err) {
        console.log(err);
    }
}

function RenderSlider(gamerooms) {
    const slider = document.querySelector("#slider");
    let sliders = "";
	let i = 1;
    gamerooms.forEach((gameroom) => {
        sliders += `<input type="radio" name="slider" id="item-${i}" value="${gameroom.name}">`;
		i++;
    });
	sliders += `<div class="cards">`;
	let j = 1;
	gamerooms.forEach((gameroom) => {
		cards += `
		<label class="card" for="item-${j}" id="${gameroom.name}">
			<img src="${gameroom.game}">
			<a href="gameroom.html/?id=${gameroom._id}" class="button">${gameroom.name}</a>
		</label>`;
		j++;
	});
	sliders += `</div>`;
    slider.innerHTML = sliders;
}

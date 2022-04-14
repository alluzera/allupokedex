document.addEventListener("DOMContentLoaded", function (event) {
    const myCustomDiv = document.createElement('div');
    myCustomDiv.classList.add('pokedex');

    const updateViewWithPokemons = (pokemons) => {
        pokemons.forEach((pokemon) => {

            const pokemonCard = document.createElement('div');
            const pokeImg = document.createElement('img');
            pokeImg.src = pokemon.img;
            pokeImg.classList.add('pokemon-img');

            const pokeSoundButton = document.createElement('img');
            pokeSoundButton.src = "images/sound-button.png"
            pokeSoundButton.classList.add('sound-button')
            pokeSoundButton.addEventListener("click", function () {
                console.log(pokemon.name)
                let audio = new Audio(`https://play.pokemonshowdown.com/audio/cries/${pokemon.name.replace(' ', '').replace('.', '').replace("'", '').toLowerCase()}.ogg`);
                audio.oncanplaythrough = function () {
                    audio.play();
                }
            })

            const pokeNumber = document.createElement('p');
            if (pokemon.id < 10) {
                pokeNumber.textContent = 'Nº00' + pokemon.id;
            } else if (pokemon.id < 100) {
                pokeNumber.textContent = 'Nº0' + pokemon.id;
            } else {
                pokeNumber.textContent = 'Nº' + pokemon.id;
            }
            pokeNumber.classList.add("pokemon-number");

            const pokeName = document.createElement('p');
            pokeName.textContent = pokemon.name;
            pokeName.classList.add("pokemon-name");

            

            pokemonCard.appendChild(pokeSoundButton);
            pokemonCard.appendChild(pokeImg);
            pokemonCard.appendChild(pokeNumber);
            pokemonCard.appendChild(pokeName);
            pokemonCard.classList.add('poke-card');

            for (let i = 0; i < pokemon.type.length; i++) {
                const pokeType = document.createElement('span');
                pokeType.textContent = pokemon.type[i] + ' ';
                pokemonCard.appendChild(pokeType);
                pokeType.classList.add('badge', `badge-${pokemon.type[i]}`);
            }

            myCustomDiv.appendChild(pokemonCard);

        })

        document.body.appendChild(myCustomDiv);

    }
    fetch("https://raw.githubusercontent.com/alluzera/allupokedex/pokedex-API/pokestats.json?pageSize=20")
        .then(response => response.json())
        .then(jsonResponse => updateViewWithPokemons(jsonResponse.data))
});
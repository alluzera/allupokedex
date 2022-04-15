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
            pokeSoundButton.addEventListener('click', function () {
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
            pokemonCard.classList.add('pokemon-card');

            for (let i = 0; i < pokemon.type.length; i++) {
                const pokeType = document.createElement('span');
                pokeType.textContent = pokemon.type[i] + ' ';
                pokemonCard.appendChild(pokeType);
                pokeType.classList.add('badge', `badge-${pokemon.type[i]}`);
            }

            myCustomDiv.appendChild(pokemonCard);

            const pokeSwitch = document.getElementById('poke-switch');
            pokeSwitch.addEventListener('click', function () {
                if (pokeSwitch.checked) {
                    document.body.style.backgroundColor = 'rgb(58, 58, 58)';
                    pokeName.style.color = 'rgb(246, 246, 246)';
                    pokemonCard.style.backgroundColor = 'rgb(46, 46, 46)';
                    pokemonCard.style['boxShadow'] = '5px 3px 3px rgb(24, 24, 24)';
                } else {
                    document.body.style.backgroundColor = 'rgb(255, 255, 255)';
                    pokeName.style.color = 'rgb(44, 44, 44)';
                    pokemonCard.style.backgroundColor = 'rgb(242, 242, 242)';
                    pokemonCard.style['boxShadow'] = '5px 3px 3px rgb(168, 168, 168)';
                }
            })

        })
        document.body.appendChild(myCustomDiv);
    }
    fetch("https://raw.githubusercontent.com/alluzera/allupokedex/pokedex-API/pokestats.json?pageSize=20")
        .then(response => response.json())
        .then(jsonResponse => updateViewWithPokemons(jsonResponse.data))
});
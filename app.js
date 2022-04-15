document.addEventListener("DOMContentLoaded", function (event) {
    const myCustomDiv = document.createElement('div');
    myCustomDiv.classList.add('pokedex');
    const updateViewWithPokemons = (pokemons) => {
        pokemons.forEach((pokemon) => {
            const pokemonCard = document.createElement('div');

            const pokeImg = document.createElement('img');
            pokeImg.src = pokemon.img;
            pokeImg.classList.add('pokemon-img');

            const pokeSoundButton = document.createElement('i');
            pokeSoundButton.dataset.feather = 'volume-2';
            pokeSoundButton.classList.add('sound-button');
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

            const pokeNameInput = document.getElementById('form-input');
            const pokeTypeInput = document.getElementById('filter-type');
            const pokeSwitchLabel = document.getElementById('switch-label');
            const pokeSwitch = document.getElementById('poke-switch');
            pokeSwitch.addEventListener('click', function () {
                if (pokeSwitch.checked) {
                    document.body.style.backgroundColor = '#3a3a3a';
                    pokeNameInput.style.backgroundColor = '#3a3a3a';
                    pokeSwitchLabel.style.backgroundColor = '#3a3a3a'
                    pokeSwitchLabel.style.border = '4px solid #2e2e2e'
                    pokeName.style.color = '#f6f6f6';
                    pokemonCard.style.backgroundColor = '#2e2e2e';
                    pokemonCard.style.boxShadow = '5px 3px 3px #181818';
                } else {
                    document.body.style.backgroundColor = '#fff';
                    pokeNameInput.style.backgroundColor = '#fff';
                    pokeSwitchLabel.style.backgroundColor = '#fff'
                    pokeSwitchLabel.style.border = '4px solid #f2f2f2'
                    pokeName.style.color = '#2c2c2c';
                    pokemonCard.style.backgroundColor = '#f2f2f2';
                    pokemonCard.style.boxShadow = '5px 3px 3px #a8a8a8';
                }
            })

        })
        document.body.appendChild(myCustomDiv);
        feather.replace();
    }
    fetch("https://raw.githubusercontent.com/alluzera/allupokedex/pokedex-API/pokestats.json?pageSize=20")
        .then(response => response.json())
        .then(jsonResponse => updateViewWithPokemons(jsonResponse.data))
});
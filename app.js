document.addEventListener("DOMContentLoaded", function(event) {
    const updateViewWithPokemons = (pokemons) => {
       pokemons.forEach((pokemon) => {
        console.log(pokemon);
        document.getElementById('apiName').textContent = pokemon.name
        document.getElementById('apiDescription').textContent = pokemon.flavorText
        document.getElementById('apiType').textContent = pokemon.types[0]
        document.getElementById('apiNumber').textContent = pokemon.nationalPokedexNumbers[0]

        console.log(pokemon.images.small)
     })
   }
   
   

  fetch("https://api.pokemontcg.io/v2/cards?pageSize=5")
    .then(response => response.json())
    .then(jsonResponse => updateViewWithPokemons(jsonResponse.data))
  });

  

  
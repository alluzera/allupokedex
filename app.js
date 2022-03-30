document.addEventListener("DOMContentLoaded", function(event) {
    const updateViewWithPokemons = (pokemons) => {
       pokemons.forEach((pokemon) => {
        console.log(pokemon);
     })
   }
     
  fetch("https://raw.githubusercontent.com/alluzera/allupokedex/pokedex-API/pokestats.json")
    .then(response => response.json())
    .then(jsonResponse => updateViewWithPokemons(jsonResponse.data))
  });

  

  
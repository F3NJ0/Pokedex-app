// Creating an array to hold pokemon objects
let pokemonList = [];
pokemonList[0] = {
  name: 'Bulasaur',
  height: 0.7,
  types: ['grass', 'poison']
};
pokemonList[1] = {
  name: 'Charmander',
  height: 0.6,
  types: ['fire']
};
pokemonList[2] = {
  name: 'Squirtle',
  height: 0.5,
  types: ['water']
};

// Printing the name and size of all pokemon onto page

function printArrayDetails(list){
  let output = "";
  pokemonList.forEach(function(pokemon){
    output =  `${output} <br> ${pokemon.name} (height: ${pokemon.height})`;
    // Adding the comment "Wow, that's big" to pokemon that are taller than 0.6m
    if(pokemon.height > 0.6){
      output = `${output} - Wow, that's big!`;
    }
  });
  return output;
}
let str = printArrayDetails(pokemonList);
document.getElementById("container").innerHTML = str;

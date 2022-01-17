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
for(let i = 0; i < pokemonList.length; i++){
  document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height})<br>`)
}

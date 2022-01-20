// Creating and IIFE for pokemonList
let pokemonRepository = (function(){
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

  function add(pokemon) {
    //validating type of passed parameter to be an object
    if(typeof pokemon === 'object' && !Array.isArray(pokemon)){
      //validating Object.keys() to equal expected keys
      if(Object.keys(pokemon)[0] === 'name' &&
        Object.keys(pokemon)[1] === 'height' &&
        Object.keys(pokemon)[2] === 'types'){
        pokemonList.push(pokemon);
      }
    }
  }

  function getAll() {
    return pokemonList;
  }

// function that allows to find specific Pokémon only by name
  function findPokemon(searchName){
    let filteredPokemon = pokemonList.filter(pokemon => pokemon.name === searchName);
    return filteredPokemon
  }

  return {
    add: add,
    getAll: getAll,
    findPokemon: findPokemon
  };
})();

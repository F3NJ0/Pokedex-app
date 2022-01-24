// Creating and IIFE for pokemonList
let pokemonRepository = (function(){
  // Creating an array to hold pokemon objects
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

// function to add a pokemon to the pokemonList
  function add(pokemon) {
    //validating type of passed parameter to be an object
    if(typeof pokemon === 'object' && !Array.isArray(pokemon)){
      //validating Object.keys() to equal expected keys
      if(Object.keys(pokemon)[0] === 'name' &&
        Object.keys(pokemon)[1] === 'detailsUrl'){
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

// function that creates a button as list item for a passed pokemon
  function addListItem(pokemon) {
    let ulElement = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    listItem.appendChild(button);
    ulElement.appendChild(listItem);

    // Adding an event listener to newly created button
    buttonEventListener(button,pokemon);
  }

// function to add an event listener to a button that will show details of the pokemon when the button is clicked
  function buttonEventListener(button,pokemon){
    button.addEventListener('click', function(){
      showDetails(pokemon);
    });
  }

// function that loads details from api & then prints pokemon details onto console
  function showDetails(pokemon){
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

// function to load list of pokemon from apiUrl, stores name & detailsUrl in pokemonList via add()
  function loadList(){
    showLoadingMessage();
    return fetch(apiUrl).then(function(response){
      hideLoadingMessage();
      return response.json();
    }).then(function(json){
      json.results.forEach(function(item){
        let pokemon  = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function(e){
      hideLoadingMessage();
      console.error(e);
    });
  }

// function to load further details about pokemon (items) in the pokemonList: image, height & types
  function loadDetails(item){
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function(response){
      hideLoadingMessage();
      return response.json();
    }).then(function(details){
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function(e){
      hideLoadingMessage();
      console.error(e);
    });
  }

// function to show loading animation when loading pokemon details
  function showLoadingMessage(){
    let loading = document.querySelector('#loading');
    loading.classList.add("display");
  }

// function to hide loading animation when loading pokemon details
  function hideLoadingMessage(){
    let loading = document.querySelector('#loading');
    loading.classList.remove("display");
  }



  return {
    getAll: getAll,
    findPokemon: findPokemon,
    addListItem: addListItem,
    loadList: loadList
  };
})();

pokemonRepository.loadList().then(function(){
  // Creating a list of buttons for each pokemon in the repository
  pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
  });
});

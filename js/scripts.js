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

// function to load list of pokemon from apiUrl, stores name & detailsUrl in pokemonList via add()
  function loadList(){
    showLoadingSpinner();
    return fetch(apiUrl).then(function(response){
      hideLoadingSpinner();
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
      hideLoadingSpinner();
      console.error(e);
    });
  }

// function to load further details about pokemon (items) in the pokemonList: image, height & types
  function loadDetails(item){
    showLoadingSpinner();
    let url = item.detailsUrl;
    return fetch(url).then(function(response){
      hideLoadingSpinner();
      return response.json();
    }).then(function(details){
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
      item.weight = details.weight;
    }).catch(function(e){
      hideLoadingSpinner();
      console.error(e);
    });
  }

// function to show loading animation when loading pokemon details
  function showLoadingSpinner(){
    let loadingContainer = document.querySelector('#loading-container');

    // Clear preexisting content
    loadingContainer.innerHTML = '';

    // Add spinner element
    let spinner = document.createElement('div');
    spinner.classList.add('spinner');
    loadingContainer.appendChild(spinner);

    // make container and spinner visible
    loadingContainer.classList.add('is-visible');
  }

// function to hide loading animation when loading pokemon details
  function hideLoadingSpinner(){
    let loadingContainer = document.querySelector('#loading-container');
    loadingContainer.classList.remove('is-visible');
  }

// function that creates a button as list item for a passed pokemon
  function addListItem(pokemon) {
    let listGroupElement = document.querySelector('.pokemon-list');
    let listItemButton = document.createElement('button');
    listItemButton.innerText = pokemon.name;
    listItemButton.classList.add('list-group-item', 'list-group-item-action',
      'text-center', 'text-uppercase');

    // Adding the data toggle and data target to trigger the modal
    listItemButton.setAttribute('data-toggle', 'modal');
    listItemButton.setAttribute('data-target', '#pokemonModal');

    // Appending the button to the parent div element
    listGroupElement.appendChild(listItemButton);

/*
    $('#pokemonModal').on('show.bs.modal', function(e){
      showDetails(pokemon);
    })*/

    // Adding an event listener to newly created button
    buttonEventListener(listItemButton,pokemon);
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
      showModal(pokemon);
    });
  }

// function to show modal with pokemon details
  function showModal(pokemon) {
    let modalTitle = $('.modal-title');
    let modalBody = $('.modal-body');

    // Clear preexisting content
    modalTitle.empty();
    modalBody.empty();

    // Adding pokemon name as Title
    let titleElement = $('<h1>' + pokemon.name + '</h1>');
    modalTitle.append(titleElement);

    // Creating elements for the modalBody
    // 1. image
    let imageElement = document.createElement('img');
    imageElement.classList.add('modal-img');
    imageElement.src = pokemon.imageUrl;

    // 2. Height
    let heightElement = $('<p>' + 'Height: ' + pokemon.height + '</p>');

    // 3. weight
    let weightElement = $('<p>' + 'Weight: ' + pokemon.weight + '</p>');

    // 4. Types
    let typesElement = $('<p>' + 'Types: ' + pokemon.types + '</p>');

    // Appending elements to modalBody
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);


    /*
    let modalContainer = document.querySelector('#modal-container');

    // Clear preexisting content
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    // Add new modal content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';

    // Close modal when user clicks on 'Close'
    closeButtonElement.addEventListener('click', hideModal);

    let modalTitle = document.createElement('h1');
    modalTitle.innerText = title;

    let modalText = document.createElement('p');
    modalText.innerText = text;

    let modalImg = document.createElement('img');
    modalImg.classList.add('modal-img');
    modalImg.src = img_src;

    modal.appendChild(closeButtonElement);
    modal.appendChild(modalTitle);
    modal.appendChild(modalText);
    modal.appendChild(modalImg);
    modalContainer.appendChild(modal);

    // make modal visible
    modalContainer.classList.add('is-visible');

    // Close modal when user clicks on 'Close'
    closeButtonElement.addEventListener('click', hideModal);

    // Close modal when modal is open and user clicks outside of the modal
    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer){
        hideModal();
      }
    });
    */
  }

/*
  // function to hide modal
  function hideModal(){
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }

  // Close modal when modal is open and user clicks 'Escape'
  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
      hideModal();
    }
  });
  */

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

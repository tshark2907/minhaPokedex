let pokeball = document.querySelector('#pokeball');
let sideMenu = document.querySelector('.filters');
let exitMenu = document.querySelector('.exitFilters');
let loadMore = document.querySelector('.expand_more');
let pokedexContainer = document.querySelector('.pokedexContainer');

let url = "https://pokeapi.co/api/v2/pokemon/"

let counterPokemon = 0;
let limit = counterPokemon + 8;

async function getPokeList(){
    const response = await fetch(url + `?offset=${counterPokemon}&limit=${limit}`);

    if(!response.ok){
        throw new Error("Erro ao consultar a API");
    } else {
        counterPokemon += 8;
    }
    const pokeList = await response.json();

    async function fetchPokemonData() {
        const pokemons = [];

        for(const result of pokeList.results) {
            const newResponse = await fetch(result.url);
            const newPokemon = await newResponse.json();
            pokemons.push(newPokemon);
        }

        return pokemons;
    }

    fetchPokemonData()
        .then(pokemons => {
            console.log(pokemons);
            
            for(let pokemon of pokemons) {
                let pokedexEntry = document.createElement('div');
                pokedexEntry.classList.add('pokedexEntry');
                pokedexContainer.appendChild(pokedexEntry);
                pokedexEntry.classList.add(pokemon.types[0].type.name);

                let pokemonImage = document.createElement('img');
                pokemonImage.classList.add('pokemonImage');
                pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
                pokedexEntry.appendChild(pokemonImage);

                let pokemonInfo = document.createElement('div');
                pokemonInfo.classList.add('pokemonInfo');
                pokedexEntry.appendChild(pokemonInfo);

                let pokemonTitle = document.createElement('div');
                pokemonTitle.classList.add('pokemonTitle');
                pokemonInfo.appendChild(pokemonTitle);

                let pokemonNumber = document.createElement('span');
                pokemonNumber.classList.add('pokemonNumber');
                pokemonNumber.textContent = pokemon.id;
                pokemonTitle.appendChild(pokemonNumber);

                let pokemonName = document.createElement('span');
                pokemonName.classList.add('pokemonName');
                pokemonName.textContent = pokemon.name;
                pokemonTitle.appendChild(pokemonName);

                let pokemonTypeage = document.createElement('ul');
                pokemonTypeage.classList.add('pokemonTypeage');
                pokemonInfo.appendChild(pokemonTypeage);

                let counter = 1;

                for(let type of pokemon.types) {
                    let pokemonType = document.createElement('li');
                    pokemonType.classList.add(`type${counter}`);
                    pokemonType.classList.add(`${type.type.name}`);
                    pokemonType.textContent = type.type.name;
                    pokemonTypeage.appendChild(pokemonType);
                    counter++;
                }
            }
        })
        .catch(error => {
            console.error('Erro ao buscar dados dos Pokémon:', error);
        });
}

pokeball.addEventListener('click', () => {
    sideMenu.classList.toggle('hidden');
});

exitMenu.addEventListener('click', () => {
    sideMenu.classList.toggle('hidden');
});

loadMore.addEventListener('click', getPokeList);

getPokeList();

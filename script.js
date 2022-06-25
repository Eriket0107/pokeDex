const poke_container = document.getElementById('poke_container');
const pokemons_number = 150;
const colors = {
	fire: '#EE8130',
	grass: '#7AC74C',
	electric: '#F7D02C',
	water: '#6390F0',
	ground: '#E2BF65',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#A33EA1',
	bug: '#a6b91a',
	dragon: '#6F35FC',
	psychic: '#F95587',
	flying: '#A98FF3',
	fighting: '#C22E28',
	normal: '#a8a77a'
};

const main_types = Object.keys(colors);


const fetchPokemons = async () => {
    for(let i = 1; i <= pokemons_number; i++){
        await getPokemon(i);
    };
   
}
const getPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();
    console.log(pokemon)
    console.log(pokemon.name)
    createPokemonCard(pokemon);
}

fetchPokemons();

function createPokemonCard(pokemon){
    const pokemonEl = document.createElement('div')
    pokemonEl.classList.add('pokemon');

    const poke_types = pokemon.types.map(el => el.type.name);
    const type = main_types.find(type => poke_types.indexOf(type) > -1);
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const color = colors[type];

    pokemonEl.style.backgroundColor = color;

    const pokeInnerHTML = 
    `
    <div class="img_container">
    <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon.id.toString().padStart(3,"0")}.png" alt="">
    </div>
    <div class="info">
        <span class="number">#${pokemon.id.toString().padStart(3,"0")}</span>
        <h3 class="name"><a href="https://www.pokemon.com/br/pokedex/${name}">${name}</a></h3>
        <small class="type">Type:<span>${type}</span></small>
    </div>
    `;

    pokemonEl.innerHTML = pokeInnerHTML;
    poke_container.appendChild(pokemonEl);
}



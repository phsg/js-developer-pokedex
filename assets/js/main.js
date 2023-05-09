const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const showDetailButton = document.getElementById('showDetailButton')
const returnButton = document.getElementById('returnButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            <button id="showDetailButton" class="showDetailButton" value="${pokemon.number}" type="button" >Detalhes</button>
        </li>
    `
}

function convertPokemonToFull(pokemon) {
    return `
    <div>
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
    </div>
    <div>
        <div>
            <div>About</div>
            <div>Base State</div>
            <div>Evolution</div>
            <div>Moves</div>
        </div>
        <div id="about" class="box">
            <div>
                <div>Species</div>
                <div>${pokemon.speciesName}</div>
            <div>
            </div>
                <div>Height</div>
                <div>${pokemon.height}</div>
            </div>
            </div>
                <div>weight</div>
                <div>${pokemon.weight}</div>
            </div>
            <div>
                <div>Abilities</div>
                <div>
                    ${pokemon.abilities.map((ability) => `${ability}`).join('')}
                </div>
            </div>
        </div>
        <div id="baseState" class="box">
            <div>
                <div>HP</div>
                <div>${pokemon.bsHP}</div>
            <div>
            </div>
                <div>Attack</div>
                <div>${pokemon.bsAttack}</div>
            </div>
            </div>
                <div>Defender</div>
                <div>${pokemon.bsDefender}</div>
            </div>
        </div>
    </div>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

function loadPokemonFull(name) {
    pokeApi.getPokemonDetail(name)
        .then((pokemon) => {
        const newHtml = pokemon.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

showDetailButton.addEventListener('click', () =>{
    document.getElementById('pokemonMain').style.display = "none";
    document.getElementById('pokemonDetail').style.display = "block";

    const vNomePokemon = this.value;
    loadPokemonDetail

})

returnButton.addEventListener('click', () => {
    document.getElementById('pokemonMain').style.display = "block";
    document.getElementById('pokemonDetail').style.display = "none";
})
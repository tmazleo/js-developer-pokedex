// ...

// Função para obter parâmetros da URL
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Obtém o número do Pokémon da URL
const pokemonNumber = getParameterByName('number');
const pokemonName = getParameterByName('name');
const pokemonType = getParameterByName('type');

// Exibe os detalhes do Pokémon na página
const pokemonImage = document.getElementById('pokemonImage');
const pokemonNameElement = document.getElementById('pokemonName');
const pokemonTypeElement = document.getElementById('pokemonType');

// Função para buscar os detalhes do Pokémon da API
function fetchPokemonDetails(number) {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${number}`;
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            // Exibe a imagem, nome e tipo do Pokémon
            pokemonImage.src = data.sprites.front_default;
            pokemonNameElement.textContent = data.name;
            const types = data.types.map((type) => type.type.name);
            pokemonTypeElement.textContent = `Type: ${types.join(', ')}`;
        })
        .catch((error) => {
            console.error('Erro ao buscar detalhes do Pokémon:', error);
        });
}

// Chama a função para buscar os detalhes do Pokémon
fetchPokemonDetails(pokemonNumber);

// ...

export const getPokemonDetails = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return {
      name: data.name,
      image: data.sprites.front_default,
      types: data.types.map((type) => type.type.name),
    };
  };
  
  export const getPokemonList = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`);
    const data = await response.json();
    return data.results;
  };
  
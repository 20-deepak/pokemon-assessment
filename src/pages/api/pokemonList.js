import { getPokemonList, getPokemonDetails } from '../../../utlits/pokemonUtils';

export default async function handler(req, res) {
  try {
    const { name, type } = req.query;

    const pokemonList = await getPokemonList();
    const pokemonDetailsPromises = pokemonList.map((pokemon) => getPokemonDetails(pokemon.url));
    const pokemonDetails = await Promise.all(pokemonDetailsPromises);
    
    let filteredPokemon = pokemonDetails.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(name.toLowerCase())
  );

    if (type) {
      filteredPokemon = filteredPokemon.filter((pokemon) =>
        pokemon.types.includes(type)
      );
    }
    res.status(200).json(filteredPokemon);
  } catch (error) {
    console.error('Error Pokémon data:', error);
    res.status(500).json({ error: 'Failed to fetch Pokémon data' });
  }
}

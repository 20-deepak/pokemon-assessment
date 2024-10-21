async function getPokemonDetail(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    return data;
  }

  export default async function handler(req, res) {
      try{
    const {name} = req.body;
    const Detail = await getPokemonDetail(name);
    res.status(200).json(Detail); 
  } catch (error) {
    console.error('Error Pokémon data:', error);
    res.status(500).json({ error: 'Failed to fetch Pokémon data' });
  }
  }
  
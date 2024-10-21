// pages/index.js

import { PokemonList } from "@/components/PokemonList";
import { SearchForm } from "@/components/SearchForm";
import { useState } from "react";
import { getPokemonDetails } from "../../utlits/pokemonUtils"; 

export default function Home({ initialPokemons, initialTypes }) {
  const [pokemons, setPokemons] = useState(initialPokemons);
  const [types, setTypes] = useState(initialTypes);

  const getPokemons = async (searchTerm = "", selectedType = "") => {
    const res = await fetch(`/api/pokemonList?name=${searchTerm}&type=${selectedType}&limit=151`);
    const data = await res.json();
    setPokemons(data)
  }

  const handleSearch = async (searchTerm, selectedType) => {
    await getPokemons(searchTerm, selectedType);
  };

  return (
    <div>
      <SearchForm types={types} onSearch={handleSearch} />
        <PokemonList pokemons={pokemons} />
    </div>
  );
}

export async function getServerSideProps() {
  const typesRes = await fetch(`https://pokeapi.co/api/v2/type`);
  const typesData = await typesRes.json();
  const initialTypes = typesData.results;

  const pokemonsRes = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`);
  const pokemonsData = await pokemonsRes.json();
  const detailsPromises =  pokemonsData.results.length && pokemonsData?.results.map((pokemon) => getPokemonDetails(pokemon.url));
  const detailedPokemons = await Promise.all(detailsPromises);
  const initialPokemons = detailedPokemons;

  return {
    props: {
      initialPokemons,
      initialTypes,
    },
  };
}

import Image from "next/image";
import Link from "next/link";
import Loader from "./Loader";
import { useState ,useEffect } from "react";

export const PokemonList=({ pokemons })=>{
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    if (pokemons.length > 0) {
      setLoading(false); 
    }
  }, [pokemons]);

  return (
    <div >  
      {loading ? ( 
        <div className="flex justify-center items-center h-64"> 
          <Loader />
        </div>
      ) :
       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-2">
        {
        pokemons.map((pokemon,index) => (
          <Link  href={`/pokemon/${pokemon.name}`} key={index}>
            <div className="text-center p-4 border rounded shadow-md hover:shadow-lg bg-gray-200">
              <div className="p-4 rounded flex justify-center">
                <img src={pokemon.image} className="w-48" alt={pokemon.name} />
              </div>
              <h2 className="text-lg font-bold">{pokemon.name}</h2>
            </div>
          </Link>
        ))
    }
       </div>
      }
    </div>
  );
}

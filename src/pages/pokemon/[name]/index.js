import Breadcrumb from "../../../components/Breadcrumbs";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function PokemonDetails() {
  const [pokemonDetail, setPokemonDetail] = useState(null);
  const router = useRouter();
  const { name } = router.query;

  const fetchPokemonDetail = async () => {
    if (name) {
      const res = await fetch(`/api/pokemonDetail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      setPokemonDetail(data);
    }
  };

  useEffect(() => {
    if (name) fetchPokemonDetail();
  }, [name]);

  if (!pokemonDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 bg-gray-100 h-screen">
      <Breadcrumb pokemonName={name} />
      <div className="flex justify-center mt-5">
        <div className="flex flex-col items-center justify-center p-4 border rounded shadow-md hover:shadow-lg bg-blue-300">
          <div className="w-full bg-orange-200 flex justify-center text-white-100">
          <img
          src={pokemonDetail.sprites.front_default}
          alt={pokemonDetail.name}
          className="w-52"
        />
          </div>
        <div className="py-2">
          <ul>
            <li className="py-2">
              <span className="text-lg font-bold">Name: </span>
              <span>{pokemonDetail.name}</span>
            </li>
            <li className="pb-2">
              <span className="text-lg font-bold">Type: </span>
              <span>
                {pokemonDetail.types.map((i) => i.type.name).join(", ")}
              </span>
            </li>
            <li className="pb-2">
              <span className="text-lg font-bold">Stats: </span>
              <span>
                {pokemonDetail.stats.map((i) => i.stat.name).join(", ")}
              </span>
            </li>
            <li className="pb-2">
              <span className="text-lg font-bold">Ability: </span>
              <span>
                {pokemonDetail.abilities.map((i) => i.ability.name).join(", ")}
              </span>
            </li>
            <li>
              <span className="text-lg font-bold">Some Moves: </span>
              <span>
                {pokemonDetail.moves
                  .slice(0, 5)
                  .map((i) => i.move.name)
                  .join(", ")}
              </span>
            </li>
          </ul>
        </div>
        </div>
     
      </div>
    </div>
  );
}

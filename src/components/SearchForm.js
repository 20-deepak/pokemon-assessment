import { useState } from "react";

export const SearchForm = ({ types, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm, selectedType);
  };
  const handleInputchange=(e)=>{
    setSearchTerm(e.target.value)
  }
  const handlechnage = (e) => {
    setSelectedType(e.target.value);
    onSearch(searchTerm, e.target.value);
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="my-4 mx-2">
        <div className="flex flex-col space-y-2">
          <select
            className="border p-3 rounded-[5px] w-96"
            value={selectedType}
            onChange={handlechnage}
          >
            <option value="">Select</option>
            {types.map((type) => (
              <option key={type.name} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
          <div className="flex">
            <input
              className="border p-3 rounded-l-[5px] w-96"
              type="text"
              placeholder="Search Pokémon"
              value={searchTerm}
              onChange={handleInputchange}
            />
            <button
              className="bg-blue-900 text-white p-2 rounded-r-[5px] w-[100px]"
              type="submit"
            >
              Search
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

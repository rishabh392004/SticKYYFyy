import React, { useState } from "react";
import { HiOutlineMagnifyingGlassCircle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const GifSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const searchGif = () => {
    if (searchTerm.trim() === "") return;

    navigate(`/search/${searchTerm}`);
  };

  return (
    <div className="flex relative">
      <input
        type="text"
        placeholder="Search GIFs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && searchGif()}
        className="w-full pl-4 pr-14 py-5 bg-white text-xl text-black rounded-l border outline-none"
      />
      {searchTerm && (
        <button
          onClick={() => setSearchTerm("")}
          className="absolute right-24 top-1/2 -translate-y-1/2 text-3xl text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          &times;
        </button>
      )}
      <button
        onClick={searchGif}
        className="bg-amber-500 text-white px-6 py-5 rounded-r hover:bg-amber-600"
      >
        <HiOutlineMagnifyingGlassCircle size={35} />
      </button>
    </div>
  );
};

export default GifSearch;
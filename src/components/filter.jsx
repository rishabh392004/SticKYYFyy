import React from "react";
import { GifState } from "../context/context";
import { HiMiniArrowTrendingUp } from "react-icons/hi2";

const filters = [
  {
    title: "GIFs",
    value: "gifs",
    background:
      "bg-gradient-to-tr from-purple-500 via-purple-600 to-purple-500",
  },
  {
    title: "Stickers",
    value: "stickers",
    background:
      "bg-gradient-to-tr from-teal-500 via-teal-600 to-teal-500",
  },
  {
    title: "Text",
    value: "text",
    background:
      "bg-gradient-to-tr from-blue-500 via-blue-600 to-blue-500",
  },
];

function FilterGif({ alignLeft = false, showTrending = false }) {
  const { filter, setFilter } = GifState();

  return (
    <div
      className={`flex my-3 gap-3 ${alignLeft ? "" : "justify-end"} ${
        showTrending
          ? "flex-col sm:flex-row sm:items-center justify-between"
          : ""
      }`}
    >
      {showTrending && (
        <span className="flex gap-2 items-center">
          <HiMiniArrowTrendingUp size={25} className="text-teal-400" />
          <span className="font-semibold text-gray-400">Trending</span>
        </span>
      )}

      <div className="flex gap-3">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`${f.background} px-4 py-1 rounded text-white ${
              filter === f.value ? "opacity-100" : "opacity-60"
            }`}
          >
            {f.title}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterGif;
import { useEffect, useState } from "react";
import { GifState } from "../context/context";
import Gif from "../components/gif";

const Favorites = () => {
  const { gf, favorites } = GifState();
  const [favoriteGIFs, setFavoriteGIFs] = useState([]);

  const fetchFavoriteGIFs = async () => {
    try {
      if (favorites && favorites.length > 0) {
        const { data } = await gf.gifs(favorites);
        setFavoriteGIFs(data);
      } else {
        setFavoriteGIFs([]);
      }
    } catch (err) {
      console.error("Error fetching favorite GIFs:", err);
    }
  };

  useEffect(() => {
    fetchFavoriteGIFs();
  }, [favorites]);

  return (
    <div className="mt-4">
      <div className="flex bg-gradient-to-r from-teal-500 via-blue-500 to-pink-500 text-transparent bg-clip-text mb-6 pb-2">
          <span className="text-5xl font-extrabold pb-3 capitalize">My Favorites</span>
      </div>
      
      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-20 animate-pulse text-gray-400">
           <img src="https://media.giphy.com/media/26ufnwz3wDUli7GU0/giphy.gif" alt="No favorites yet" className="rounded-lg shadow-xl mb-6 opacity-30 h-40"/>
           <p className="text-2xl font-light">You don't have any favorite GIFs yet.</p>
           <p className="text-lg">Start exploring and "heart" some!</p>
        </div>
      ) : (
        <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4">
          {favoriteGIFs.map((gif) => (
            <div key={gif.id} className="mb-4 break-inside-avoid shadow-lg hover:shadow-2xl transition-all rounded-md overflow-hidden transform hover:-translate-y-1">
               <Gif gif={gif} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;

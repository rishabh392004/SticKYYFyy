import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/context";
import Gif from "../components/gif";
import { HiMiniChevronUp, HiMiniChevronDown, HiMiniHeart } from "react-icons/hi2";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FaPaperPlane } from "react-icons/fa6";
import FollowOn from "../components/follow-on";

const GifPage = () => {
  const { type, slug } = useParams();
  const [gif, setGif] = useState({});
  const [relatedGifs, setRelatedGifs] = useState([]);
  const [readMore, setReadMore] = useState(false);

  const { gf, addToFavorites, favorites } = GifState();

  useEffect(() => {
    const fetchGif = async () => {
      const gifId = slug.split("-").pop();
      const { data } = await gf.gif(gifId);
      const { data: relatedData } = await gf.related(gifId, {
        limit: 10,
      });

      setGif(data);
      setRelatedGifs(relatedData);
    };
    fetchGif();
  }, [slug]);

  const shareGif = () => {
      navigator.clipboard.writeText(gif?.url);
      alert("GIF url copied to clipboard!");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-6">
      <div className="hidden md:block col-span-1">
        {gif?.user && (
          <div className="flex gap-2 items-center">
            <img
              src={gif.user.avatar_url}
              alt={gif.user.display_name}
              className="h-14 w-14 rounded-full border border-gray-600 shadow-md transform transition hover:scale-105 cursor-pointer"
            />
            <div className="px-2">
              <div className="font-bold text-gray-200">{gif.user.display_name}</div>
              <div className="faded-text text-sm text-gray-400">@{gif.user.username}</div>
            </div>
          </div>
        )}

        {gif?.user?.description && (
          <p className="py-4 whitespace-pre-line text-sm text-gray-300 relative group">
            {readMore
              ? gif?.user?.description
              : gif?.user?.description.slice(0, 100) + "..."}
            <div
              className="flex items-center text-gray-400 cursor-pointer mt-1 group-hover:text-blue-400 transition"
              onClick={() => setReadMore(!readMore)}
            >
              {readMore ? (
                <>Read Less <HiMiniChevronUp size={20} /></>
              ) : (
                <>Read More <HiMiniChevronDown size={20} /></>
              )}
            </div>
          </p>
        )}

        <div className="w-full h-0.5 mt-6 mb-6 bg-gray-800" />
        <FollowOn />
      </div>

      <div className="col-span-1 md:col-span-3">
        <div className="flex gap-4 mb-4 items-center">
           <h1 className="text-3xl font-extrabold text-gray-100 flex-1">{gif.title}</h1>
        </div>

        <div className="bg-gray-900 rounded-lg shadow-xl flex flex-col md:flex-row p-4 gap-4 items-start border border-gray-800">
            <div className="w-full md:w-3/4 shadow-2xl relative rounded-md overflow-hidden bg-gray-950 flex flex-col items-center">
                <img src={gif?.images?.original?.url} alt={gif?.title} className="w-full object-contain max-h-[60vh] rounded-md"/>
            </div>
            
            <div className="w-full md:w-1/4 flex flex-col gap-4">
                <button
                    onClick={() => addToFavorites(gif.id)}
                    className="flex gap-2 p-3 text-lg font-bold bg-gray-800 hover:bg-gray-700 rounded-md shadow-md items-center justify-center transition-all hover:scale-[1.02]"
                >
                    <HiMiniHeart
                    size={28}
                    className={`${favorites.includes(gif.id) ? "text-pink-500 scale-110" : "text-gray-400"} transition-all`}
                    />
                    {favorites.includes(gif.id) ? "Favorited" : "Favorite"}
                </button>

                <button
                    onClick={shareGif}
                    className="flex gap-2 p-3 text-lg font-bold bg-gray-800 hover:bg-gray-700 rounded-md shadow-md items-center justify-center transition-all hover:scale-[1.02]"
                >
                    <FaPaperPlane size={24} className="text-blue-400"/>
                    Share
                </button>
                 <a
                    href={gif.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex gap-2 p-3 text-lg font-bold bg-gray-800 hover:bg-gray-700 rounded-md shadow-md items-center justify-center transition-all hover:scale-[1.02]"
                >
                    <HiOutlineExternalLink size={24} className="text-green-400" />
                    On Giphy
                </a>
            </div>
        </div>
        
        <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 border-b border-gray-800 pb-2">Related GIFs</h2>
            <div className="columns-2 md:columns-3 gap-3">
              {relatedGifs.slice(1).map((gif) => (
                <div key={gif.id} className="mb-3 break-inside-avoid shadow-lg hover:shadow-2xl transition-all rounded-md overflow-hidden transform hover:-translate-y-1 hover:ring-[3px] ring-pink-500 ring-offset-2 ring-offset-gray-950">
                   <Gif gif={gif} />
                </div>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default GifPage;
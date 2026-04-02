import { GiphyFetch } from "@giphy/js-fetch-api";
import { createContext, useState, useContext, useEffect } from "react";

const GifContext = createContext();

const gf = new GiphyFetch(import.meta.env.VITE_GIPHY_API_KEY);

const GifProvider = ({children}) => {
    const [gifs, setGifs] = useState([]);
    const [filter, setFilter] = useState("gifs");
    const [favorites, setFavorites] = useState(() => {
        const localFavs = localStorage.getItem("favoriteGIFs");
        return localFavs ? JSON.parse(localFavs) : [];
    });

    useEffect(() => {
        localStorage.setItem("favoriteGIFs", JSON.stringify(favorites));
    }, [favorites]);

    const addToFavorites = (id) => {
        if (favorites.includes(id)) {
            setFavorites(favorites.filter((itemId) => itemId !== id));
        } else {
            setFavorites([...favorites, id]);
        }
    };

    return <GifContext.Provider value={{ gf, gifs, setGifs, filter, setFilter, favorites, setFavorites, addToFavorites }}>{children}</GifContext.Provider>;
}

export const GifState = () => {
    return useContext(GifContext);
}

export default GifProvider;
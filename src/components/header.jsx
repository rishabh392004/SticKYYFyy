import { useEffect, useState } from 'react';
import { HiEllipsisVertical, HiMiniBars3BottomRight } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import { GifState } from '../context/context';
import GifSearch from './gif-search';

const Header = () => {
  const [categories, setCategories] = useState([])
  const [showCategory, setShowCategory] = useState(false)
  const { gf, favorites } = GifState()

  useEffect(() => {
    const fetchGIFCategories = async () => {
      const { data } = await gf.categories()
      setCategories(data)
    }
    fetchGIFCategories()
  }, [gf])

  return (
    <header>
      <nav className="flex items-center justify-between p-4 relative mb-4">

      {/* Logo */}
      <Link to="/" className="flex gap-2 items-center">
        <img src="/logo.svg" alt="Logo" className="w-10" />
        <h1 className="text-4xl font-bold tracking-tight cursor-pointer">
          GipHy
        </h1>
      </Link>

      {/* Right side menu */}
      <div className="flex items-center gap-4">
        {categories.slice(0, 5).map((category) => {
          return <Link key={category.name}
            to={`/${category.name_encoded}`}
            className="px-4 py-1 border-b-4 hover:bg-gradient-to-r hover:from-teal-600 hover:via-blue-600 hover:to-pink-600 hover:text-white"
          >
            {category.name}
          </Link>
        })}

        <button onClick={() => setShowCategory(!showCategory)}>
          <HiEllipsisVertical
            size={30}
            className="p-1 hover:bg-gradient-to-r hover:from-teal-600 hover:via-blue-600 hover:to-pink-600 hover:text-white rounded"
          />
        </button>

      {favorites?.length > 0 && <Link
          to="/favorites"
          className="h-9 bg-gray-700 pt-1.5 px-6 cursor-pointer rounded text-white"
        >
          Favorite GIFs
        </Link>}

        <button>
          <HiMiniBars3BottomRight
            size={30}
            className="p-1 hover:bg-gradient-to-r hover:from-teal-600 hover:via-blue-600 hover:to-pink-600 hover:text-white rounded"
          />
        </button>
      </div>

      {/* Categories dropdown */}
      {showCategory && (
        <div className="absolute left-0 top-16 w-full px-10 pt-6 pb-9 z-20 bg-gradient-to-r from-teal-500 via-blue-500 to-pink-500 text-white rounded-md shadow-2xl">
          <span className="text-3xl font-extrabold block mb-4">Categories</span>
          <hr className="border-gray-100 opacity-30 mb-6" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-y-4 gap-x-6">
            {categories.map((cat) => (
              <Link
                key={cat.name_encoded}
                to={`/${cat.name_encoded}`}
                className="font-bold text-base hover:text-gray-200 transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      )}
      </nav>
      <GifSearch/>
    </header>
  )
}

export default Header
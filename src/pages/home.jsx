import React, { useEffect } from 'react'
import { GifState } from '../context/context'
import Gif from '../components/gif'
import FilterGif from '../components/filter'

const Home = () => {
  const { gf, gifs, setGifs, filter, setFilter } = GifState()

  const fetchTrrendingGifs = async () => {
    const { data } = await gf.trending({
      limit: 20,
      type: filter,
      rating: "g",
    })
    setGifs(data)
  }

  useEffect(() => {
    fetchTrrendingGifs()
  }, [filter])

  return (
    <div>
      <img
        src="/banner.gif"
        alt="Trending Gif"
        className='mt-2 rounded w-full'
      />
      <FilterGif showTrending/> 
      <div className='columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2'>
        {gifs?.map((gif) => (
          <Gif gif={gif} key={gif?.id || gif?.title} />
        ))}
      </div>
    </div>
  )
}

export default Home
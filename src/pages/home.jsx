import React, { useEffect } from 'react'
import { GifState } from '../context/context'

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
    </div>
  )
}

export default Home
import React from 'react'
import { Link } from 'react-router-dom'

function Gif({gif,hover=true}) {
  return (
    <Link to={`/${gif.type}/${gif.slug || gif.id}`}>
      <div className='w-full mb-2 relative cursor-pointer group'>
        <img 
          src={gif?.images?.fixed_width?.webp || gif?.images?.fixed_width?.url} 
          alt={gif?.title} 
          className='w-full object-cover rounded transition-all duration-300'
        />
        {hover && (
          <div className='absolute inset-0 rounded opacity-0 group-hover:opacity-200 bg-gradient-to-b from-transparent via-transparent to-black font-bold flex items-end gap-2 p-2'>
            <img 
              src={gif?.user?.avatar_url || "https://api.dicebear.com/7.x/bottts/svg?seed=default"} 
              alt={gif?.user?.display_name || 'User'} 
              className='h-8 rounded'
            />
            <span>{gif?.user?.display_name || '?'}</span>
          </div>
        )}
      </div>
    </Link>
  )
}

export default Gif

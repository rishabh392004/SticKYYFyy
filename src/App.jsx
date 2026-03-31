import "./App.css"
import AppLayout from "./layout/app-layout"
//homepage
//categories
//serach
//single gif

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Categories from "./pages/categories"
import Favrouite from "./pages/favories"
import Home from "./pages/home"
import Search from "./pages/search"
import Gif from "./pages/single-gif"
import GifProvider from "./context/context"
//favourites
//router is used to navigate between different page in the app without refrence
const router=createBrowserRouter([
  {

element:<AppLayout/>,

children:[
  {
    path:'/',
    element:<Home/>
  },
    {
    path:'/:category',
    element:<Categories/>
  },
    {
    path:'/favorites',
    element:<Favrouite/>
  },
    {
    path:'/:type/:slug',
    element:<Gif/>
  },
    {
    path:'/search/:query',
    element:<Search/>
  },
]
  }
])
function App() {
  

  return <GifProvider>
    <RouterProvider router={router}/>
  </GifProvider>
}

export default App

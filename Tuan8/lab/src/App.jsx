import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import SummerRecipes from './components/SummerRecipes'
import RecipesWithVideos from './components/RecipesWithVideos'
import EditorsPick from './components/EditorsPick'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <img src="./img/banner.png" alt="" className='w-full' />
      <SummerRecipes/>
      <RecipesWithVideos/>
      <EditorsPick/>
      <Footer/>
      
    </>
  )
}

export default App

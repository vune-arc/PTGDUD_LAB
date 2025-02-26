import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MyComponent from './components/MyComponent' // Import MyComponent

function App() {
  return (
    <div>
      <h1>Investment Calculator</h1>
      <MyComponent /> {/* Hiển thị component MyComponent */}
    </div>
  )
}

export default App

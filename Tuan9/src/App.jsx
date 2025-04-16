import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Counter from './components/Counter'
import CounterApp from './components/CounterRedux'
import CounterReduxToolkit from './components/CounterReduxToolkit'
import ToDoList from './components/ToDoList'
import ThemeToggleApp from './components/ThemeToggleApp'
import ShoppingCartApp from './components/ShoppingCartApp'
import Login from './components/Login'
import AsyncThunk from './components/AsyncThunk'
import CounterNew from './components/CounterNew'
import Bmi from './components/Bmi'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      {/* <CounterApp/> */}
      {/* <CounterReduxToolkit/> */}
      {/* <ToDoList/> */}
      {/* <ThemeToggleApp/> */}
      <div style={{height: '100vh'}}>
      {/* <ShoppingCartApp/> */}
     {/* <Login/> */}
     {/* <AsyncThunk/> */}
     {/* <CounterNew/> */}
     <Bmi/>
    </div>
      
    </>
  )
}

export default App

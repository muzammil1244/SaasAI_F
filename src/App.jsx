import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Home } from './user/home'


function App() {
  const [count, setCount] = useState(0)

  return (

<div className='h-screen w-screen'>

<Home/>

</div>

    )
}

export default App

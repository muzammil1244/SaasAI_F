import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import {Main} from './landing/main'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Router } from 'lucide-react'
import {Auth} from "./auth/auth"
import {Home}  from './user/home'
import { Admin_home } from './admin/home'
function App() {
  const [count, setCount] = useState(0)

  return (

<BrowserRouter>

<Routes>

<Route path='/' element={<Main/>} />
<Route path='/user' element={<Home/>} />
<Route path='/admin' element={<Admin_home/>} />
<Route path='/auth' element={<Auth/>}/>
</Routes>




</BrowserRouter>

    )
}

export default App

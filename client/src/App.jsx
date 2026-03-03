import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Hero from "./components/Body"
import Login from "./components/Login"
import "./App.css"
import Register from "./components/Register"

const App = () => {
  return (
    <>
      <Navbar />
  
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App

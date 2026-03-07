import { Routes, Route } from "react-router-dom"
import "./App.css"
import Navbar from "./components/Navbar"
import Login from "./components/Login"
import Register from "./components/Register"

import Hero from "./pages/Body"
import Dashboard from "./pages/Dashboard"
import Location from "./pages/Location"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Menu from "./pages/Menu"
import Cart from "./pages/Cart"

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/location" element={<Location />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  )
}

export default App
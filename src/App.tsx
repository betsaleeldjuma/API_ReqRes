import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Details from "./pages/Details"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home"/>} />
      <Route path="/home" element={<Home />} />
      <Route path="/home/details/:id" element={<Details />} />
    </Routes>
  )
}

export default App
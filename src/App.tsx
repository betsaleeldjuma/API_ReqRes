import { Navigate, Route, Routes } from "react-router-dom"
import Details from "./pages/Details"
import Home from "./pages/Home"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/home/:id" element={<Details />}/>
    </Routes>
  )
}

export default App
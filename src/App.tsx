import { Navigate, Route, Routes } from "react-router-dom"
import Details from "./pages/Details"
import Users from "./pages/Users"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home"/>} />
      <Route path="/home" element={<Users />} />
      <Route path="/home/details/:id" element={<Details />} />
    </Routes>
  )
}

export default App
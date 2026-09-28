import { Routes, Route } from "react-router-dom";
import Layout from "./Layout.tsx";
import Login from "./Components/auth/Login/Login.tsx";
import Register from "./Components/auth/Register/Register.tsx";


const App = () => {
  return (
    
    <Routes>
      <Route path="/" element={<Layout />} />

      {/* Auth Pages */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />


    </Routes>
 
  );
}

export default App
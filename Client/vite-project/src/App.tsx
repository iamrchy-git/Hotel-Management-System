import {Routes,Route} from "react-router-dom";


import Layout from "./Layout.tsx";

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Layout/>} />
      <Route path="/" element={<login/>}
      
      
      
    </Routes>
    </>
  )
}

export default App
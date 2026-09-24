import { Route, Routes } from "react-router-dom";
import Layout from "./Layout.tsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
    </Routes>
  );
};

export default App;

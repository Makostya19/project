import { Routes, Route, NavLink } from "react-router-dom";
import PokeballPage from "./PokeballPage";
import HomePage from "./pages/HomePage";
import "./index.css";

function App() {
  return (
    <>
      <nav className="nav">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
        <NavLink to="/pokeball" className="nav-link">
          Pokeball
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pokeball" element={<PokeballPage />} />
      </Routes>
    </>
  );
}

export default App;

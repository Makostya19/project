import { useState } from "react";
import PokeballPage from "./PokeballPage";
import HomePage from "./pages/HomePage";
import "./index.css";

function App() {
  const [page, setPage] = useState("pokeball");

  return (
    <>
      <nav className="nav">
        <button onClick={() => setPage("pokeball")}>Pokeball</button>
        <button onClick={() => setPage("home")}>Home</button>
      </nav>

      {page === "pokeball" && <PokeballPage />}
      {page === "home" && <HomePage />}
    </>
  );
}

export default App;

import { useEffect, useState } from "react";
import "./HomePage.css";

function HomePage() {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("caughtPokemons")) || [];
    setPokemons(saved);
  }, []);

  const openDetails = async (pokemon) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`);
    const data = await res.json();
    setSelectedPokemon(data);
  };

  const closeModal = () => {
    setSelectedPokemon(null);
  };

  const releasePokemon = (id) => {
    const updated = pokemons.filter((p) => p.id !== id);
    setPokemons(updated);
    localStorage.setItem("caughtPokemons", JSON.stringify(updated));
    setSelectedPokemon(null);
  };

  return (
    <div className="page">
      <h1>Caught Pokémon</h1>

      <div className="grid">
        {pokemons.map((p) => (
          <div
            key={p.id}
            className="card"
            onClick={() => openDetails(p)}
          >
            <img src={p.image} alt={p.name} />
            <p>{p.name}</p>
          </div>
        ))}
      </div>

      {selectedPokemon && (
        <div className="modal-bg" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedPokemon.name}</h2>

            <img
              src={selectedPokemon.sprites.front_default}
              alt={selectedPokemon.name}
            />

            <p>Height: {selectedPokemon.height}</p>
            <p>Weight: {selectedPokemon.weight}</p>
            <p>
              Types:{" "}
              {selectedPokemon.types
                .map((t) => t.type.name)
                .join(", ")}
            </p>

            <div className="modal-buttons">
              <button
                className="release"
                onClick={() => releasePokemon(selectedPokemon.id)}
              >
                Освободить
              </button>

              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
import { useState } from "react";
import ball from "../assets/ball.svg";
import "../index.css";

export default function PokeballPage() {
  const [pokemon, setPokemon] = useState(null);
  const [message, setMessage] = useState("");
  const [throwing, setThrowing] = useState(false);

  const huntPokemon = async () => {
    setMessage("");
    const id = Math.floor(Math.random() * 151) + 1;

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();

    setPokemon({
      id: data.id,
      name: data.name,
      image: data.sprites.front_default,
    });
  };

  const throwBall = () => {
    setThrowing(true);

    setTimeout(() => {
      const success = Math.random() < 0.5;

      if (success) {
        const stored =
          JSON.parse(localStorage.getItem("caughtPokemons")) || [];

        const exists = stored.some(p => p.id === pokemon.id);

        if (!exists) {
          localStorage.setItem(
            "caughtPokemons",
            JSON.stringify([...stored, pokemon])
          );
          setMessage("Покемон пойман!");
        } else {
          setMessage("Этот покемон уже пойман");
        }
      } else {
        setMessage("Покемон убежал!");
      }

      setThrowing(false);
      setPokemon(null);
    }, 1000);
  };

  return (
    <div className="pokeball-page">
      <img
        src={ball}
        alt="Pokeball"
        className={`pokeball ${throwing ? "throwing" : ""}`}
      />

      <div className="actions">
        <button onClick={huntPokemon}>Охотиться</button>
      </div>

      {pokemon && (
        <div className="pokemon-card">
          <h3>{pokemon.name}</h3>
          <img src={pokemon.image} alt={pokemon.name} />
          <button onClick={throwBall}>Кинуть покебол</button>
        </div>
      )}

      {message && <p className="message">{message}</p>}
    </div>
  );
}

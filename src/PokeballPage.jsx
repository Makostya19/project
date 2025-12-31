import { useState } from "react";
import ball from "./assets/ball.svg";

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
      name: data.name,
      image: data.sprites.front_default,
    });
  };

  const throwBall = () => {
    setThrowing(true);

    setTimeout(() => {
      const success = Math.random() < 0.5;

      if (success) {
        const stored = JSON.parse(localStorage.getItem("caughtPokemons")) || [];
        localStorage.setItem(
          "caughtPokemons",
          JSON.stringify([...stored, pokemon])
        );
        setMessage("Покемон пойман!");
      } else {
        setMessage("Покемон убежал!");
      }

      setThrowing(false);
      setPokemon(null);
    }, 1000);
  };

  return (
    <div style={{ textAlign: "center", padding: 40 }}>
      <img
        src={ball}
        alt="Pokeball"
        style={{
          width: 200,
          transition: "transform 0.5s",
          transform: throwing ? "scale(1.2) rotate(360deg)" : "none",
        }}
      />

      <div style={{ marginTop: 20 }}>
        <button onClick={huntPokemon}>Охотиться за покемонами</button>
      </div>

      {pokemon && (
        <div style={{ marginTop: 20 }}>
          <h3>{pokemon.name}</h3>
          <img src={pokemon.image} alt={pokemon.name} />
          <div>
            <button onClick={throwBall}>Кинуть покебол</button>
          </div>
        </div>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}

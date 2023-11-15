import { useState, useEffect } from 'react';
import axios from 'axios';
import shuffle from 'lodash.shuffle';
import Card from './Card';
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get(
          'https://pokeapi.co/api/v2/pokemon?limit=10'
        );
        const data = response.data.results;
        const pokemonData = await Promise.all(
          data.map(async (pokemon) => {
            const result = await axios.get(pokemon.url);
            return result.data;
          })
        );
        const pairs = shuffle([...pokemonData, ...pokemonData]);
        setPokemons(pairs);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPokemons();
  }, []);

  const handleCardClick = (index) => {
    if (flippedCards.length === 1) {
      setFlippedCards([...flippedCards, index]);
      setTimeout(() => checkForMatch(index), 1000);
    } else {
      setFlippedCards([index]);
    }
  };

  const checkForMatch = (index) => {
    const card1 = pokemons[flippedCards[0]];
    const card2 = pokemons[index];

    if (card1.id === card2.id) {
      setMatchedCards([...matchedCards, flippedCards[0], index]);
    }

    setFlippedCards([]);
  };

  return (
    <div className="App">
      <h1>Poké-Memory</h1>
      <div className="card-container">
        {pokemons.map((pokemon, index) => (
          <Card
            key={index}
            index={index}
            pokemon={pokemon}
            isFlipped={flippedCards.includes(index) || matchedCards.includes(index)}
            onCardClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

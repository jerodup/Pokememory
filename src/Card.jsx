import PropTypes from 'prop-types';
import './Card.css';

function Card({ index, pokemon, isFlipped, onCardClick }) {
  const handleClick = () => {
    if (!isFlipped) {
      onCardClick(index);
    }
  };

  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={handleClick}>
      <div className="card-inner">
        <div className="card-front"></div>
        <div className="card-back">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
            alt={pokemon.name}
            className="card-image"
          />
          <p className="card-name">{pokemon.name}</p>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  pokemon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  isFlipped: PropTypes.bool.isRequired,
  onCardClick: PropTypes.func.isRequired,
};

export default Card;

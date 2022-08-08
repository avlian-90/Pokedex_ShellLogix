import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { usePokemonContext, ACTION_TYPES } from '../state';

function PokemonTable({ pokeData }) {
  const { state, dispatch } = usePokemonContext();

  useEffect(() => {
    const pokemons = [];
    pokeData.results.forEach((poke) => {
      fetch(poke.url)
        .then((response) => response.json())
        .then((data) => {
          pokemons.push({
            id: data.id,
            name: data.name,
            imgUrl: data.sprites.front_default,
            types: data.types.map((type) => type.type.name),
          });
        });
    });
    dispatch({ type: ACTION_TYPES.SET_POKEMONS, pokemons });
  }, []);

  return (
    <div className="pokemon-table">
      {state.matchedPokemons.length !== 0 && state.showSearchResult? 
      state.matchedPokemons.map((poke) => (
        <div key={poke.id} className="pokemon-box">
          <div className="pokemon-avatar">
            <img src={poke.imgUrl} alt="pokemon" />
          </div>
          <p>{poke.name}</p>
          <span>#{poke.id}</span>
          <div>
            {poke.types.map((type) => (
              <span key={type}>{type}</span>
            ))}
          </div>
        </div>
      )) :
      state.pokemons.map((poke) => (
        <div key={poke.id} className="pokemon-box">
          <div className="pokemon-avatar">
            <img src={poke.imgUrl} alt="pokemon" />
          </div>
          <p>{poke.name}</p>
          <span>#{poke.id}</span>
          <div>
            {poke.types.map((type) => (
              <span key={type}>{type}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

PokemonTable.defaultProps = {
  pokeData: {},
};

PokemonTable.propTypes = {
  pokeData: PropTypes.object,
};

export default PokemonTable;

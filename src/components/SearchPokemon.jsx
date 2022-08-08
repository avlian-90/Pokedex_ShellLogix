import Image from 'next/image';
import React from 'react';
import { ACTION_TYPES, usePokemonContext } from '../state';

function SearchPokemon() {
  const { state, dispatch } = usePokemonContext();

  const handleInputChange = (e) => {
    dispatch({
      type: ACTION_TYPES.SET_SEARCH_INPUT,
      searchInput: e.target.value,
    });
    dispatch({ type: ACTION_TYPES.SET_MATCHED_POKEMONS });
  };

  const showMatchedPokemons = () => {
    dispatch({ type: ACTION_TYPES.SHOW_MATCHED_POKEMONS });
  };

  const choosePokemon = (id, name) => {
    dispatch({ type: ACTION_TYPES.CHOOSE_POKEMON_BY_NAME, id, name });
  };

  return (
    <div className="search">
      <div className="search-pokemon">
        <input
          type="text"
          className="search-input"
          placeholder="Search by name"
          onChange={handleInputChange}
          value={state.searchInput}
        />
        <Image
          src="/search.svg"
          onClick={showMatchedPokemons}
          alt="search"
          width={20}
          height={20}
        />
      </div>
      {state.searchInput && <div className="search-match">
        {state.matchedPokemons.map((pokemon) => (
          <p
            key={pokemon.id}
            onClick={() => choosePokemon(pokemon.id, pokemon.name)}
          >
            {pokemon.name}
          </p>
        ))}
      </div>}
    </div>
  );
}

export default SearchPokemon;

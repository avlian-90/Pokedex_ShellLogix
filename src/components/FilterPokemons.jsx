import React, { useEffect } from 'react';
import Image from 'next/image';
import { ACTION_TYPES, usePokemonContext } from '../state';

function FilterPokemons() {
  const { state, dispatch } = usePokemonContext();

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/type')
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: ACTION_TYPES.SET_POKEMON_TYPES,
          types: data.results.map((result) => result.name),
        });
      });
  }, []);

  const openTypesList = () => {
    dispatch({ type: ACTION_TYPES.TOGGLE_TYPES_LIST });
  };
  const chooseType = (choosedType) => {
    dispatch({ type: ACTION_TYPES.CHOOSE_TYPE, choosedType });
  };
  return (
    <div className="pokemon-filter">
      <div className="filter">
        <span>{state.choosedType ? state.choosedType : 'Choose type'}</span>
        <Image
          src="/select.svg"
          onClick={openTypesList}
          alt="select"
          width={20}
          height={20}
        />
      </div>
      {state.isOpen && (
        <div className="types">
          {state.pokemonTypes.map((type) => (
            <p key={type} onClick={() => chooseType(type)}>
              {type}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilterPokemons;

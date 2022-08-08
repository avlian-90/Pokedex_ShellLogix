import { createContext, useContext, useReducer } from 'react';

const ACTION_TYPES = {
  SET_POKEMONS: 'SET_POKEMONS',
  SET_SEARCH_INPUT: 'SET_SEARCH_INPUT',
  SET_MATCHED_POKEMONS: 'SET_MATCHED_POKEMONS',
  SHOW_MATCHED_POKEMONS: 'SHOW_MATCHED_POKEMONS',
  CHOOSE_POKEMON_BY_NAME: 'CHOOSE_POKEMON_BY_NAME',
  SET_POKEMON_TYPES: 'SET_POKEMON_TYPES',
  TOGGLE_TYPES_LIST: 'TOGGLE_TYPES_LIST',
  CHOOSE_TYPE: 'CHOOSE_TYPE',
  SET_SELECTED_PAGE: 'SET_SELECTED_PAGE',
  SET_NEXT_PAGE: 'SET_NEXT_PAGE',
  SET_PREV_PAGE: 'SET_PREV_PAGE',
};

const defaultState = {
  pokemons: [],
  searchInput: '',
  matchedPokemons: [],
  showSearchResult: false,
  pokemonTypes: [],
  isOpen: false,
  choosedType: '',
  currentPage: 1,
  offset: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.SET_POKEMONS: {
      return {
        ...state,
        pokemons: action.pokemons,
      };
    }
    case ACTION_TYPES.SET_SEARCH_INPUT: {
      return { 
        ...state, 
        searchInput: action.searchInput,
        isOpen: false,
        matchedPokemons: [],
        choosedType: '',
      };
    }
    case ACTION_TYPES.SET_MATCHED_POKEMONS: {
      return {
        ...state,
        matchedPokemons: state.pokemons.filter((pokemon) =>
          pokemon.name.includes(state.searchInput)
        ),
        showSearchResult: false,
      };
    }
    case ACTION_TYPES.SHOW_MATCHED_POKEMONS: {
      return {
        ...state,
        showSearchResult: true,
      };
    }
    case ACTION_TYPES.CHOOSE_POKEMON_BY_NAME: {
      return {
        ...state,
        matchedPokemons: state.pokemons.filter((pokemon) => pokemon.id === action.id),
        searchInput: action.name,
        showSearchResult: true,
      };
    }
    case ACTION_TYPES.SET_POKEMON_TYPES: {
      return {
        ...state,
        pokemonTypes: action.types,
      };
    }
    case ACTION_TYPES.TOGGLE_TYPES_LIST: {
      return {
        ...state,
        isOpen: !state.isOpen,
        searchInput: '',
        matchedPokemons: [],
      };
    }
    case ACTION_TYPES.CHOOSE_TYPE: {
      return {
        ...state,
        choosedType: action.choosedType,
        matchedPokemons: state.pokemons.filter((pokemon) =>
          pokemon.types.includes(action.choosedType)
        ),
        showSearchResult: true,
        isOpen: !state.isOpen,
      };
    }
    case ACTION_TYPES.SET_SELECTED_PAGE: {
      return {
        ...state,
        currentPage: action.page,
        offset: (action.page - 1) * 50,
        searchInput: '',
        choosedType: '',
        matchedPokemons: [],
      };
    }
    case ACTION_TYPES.SET_NEXT_PAGE: {
      return {
        ...state,
        currentPage: state.currentPage + 1,
        offset: state.offset + 50,
        searchInput: '',
        choosedType: '',
        matchedPokemons: [],
      };
    }
    case ACTION_TYPES.SET_PREV_PAGE: {
      return {
        ...state,
        currentPage: state.currentPage - 1,
        offset: state.offset - 50,
        searchInput: '',
        choosedType: '',
        matchedPokemons: [],
      };
    }
    default: {
      return state;
    }
  }
}

const Context = createContext(defaultState);

const usePokemonContext = () => useContext(Context);

function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
}

export { ContextProvider, usePokemonContext, ACTION_TYPES };

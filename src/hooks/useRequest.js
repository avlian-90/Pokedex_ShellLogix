import useSWR from 'swr';
import { usePokemonContext } from '../state';

const fetcher = (url) => fetch(url).then((res) => res.json());

const API_URL = 'https://pokeapi.co/api/v2/pokemon';
const PAGE_LIMIT = 50;

export default function useFetchPokemon(name) {
  const { state } = usePokemonContext();
  const uri = name ? `${API_URL}/${name}` : `${API_URL}?limit=${PAGE_LIMIT}&offset=${state.offset}`;
  const { data: result, error } = useSWR(uri, fetcher);

  return { result, error };
}

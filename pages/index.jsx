import FilterPokemons from '../src/components/FilterPokemons';
import Layout from '../src/components/Layout';
import Pagination from '../src/components/Pagination';
import PokemonTable from '../src/components/PokemonTable';
import SearchPokemon from '../src/components/SearchPokemon';
import useFetchPokemon from '../src/hooks/useRequest';

export default function Home() {
  const { result, error } = useFetchPokemon();

  if (error) return <h1>Something went wrong!</h1>;
  if (!result) return <h1>Loading...</h1>;

  return (
    <Layout title="Pokédex">
      <div className="search-filter">
        <SearchPokemon />
        <FilterPokemons />
      </div>
      <PokemonTable pokeData={result} />
      <Pagination />
    </Layout>
  );
}

import Head from "next/head";
import { useQuery } from "@apollo/client";
import { GET_POKEMONS } from "../../graphql/queries";
import Pokemon from "../components/Pokemon";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import DetailsPage from "@/pages/DetailsPage";


const page_size = 20;

export default function Home() {
  const [page, setPage] = useState(1);
  const {
    data: { pokemons = [] } = {},
    loading,
    error,
  } = useQuery(GET_POKEMONS, {
    variables: { first: 151 },
  });

  const start = (page - 1) * page_size;
  const end = start + page_size;
  const currentPokemons = pokemons.slice(start, end);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    setPage(page - 1);
  };

  return (
    <>
      {!loading && (
        <div className={styles.main}>
          <Head>
            <title>Pokemon</title>
          </Head>

          <h1>Pokemons</h1>
          <div className={styles.homepage}>
            {!loading &&
              !error &&
              currentPokemons.map((pokemon) => (
                <Pokemon key={pokemon.id} pokemon={pokemon} />
              ))}
          </div>

          <div className={styles.pagination}>
            <div className={styles.pagebtn}>
              <button onClick={handlePreviousPage} disabled={page === 1}>
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={end >= pokemons.length}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}



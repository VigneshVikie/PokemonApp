import Head from "next/head";
import Pokemon from "./Pokemon";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GET_POKEMONS } from "../../graphql/queries";

const page_size = 20;

export default function Home({ pokemons, page }) {
  const Router = useRouter();

  const start = (page - 1) * page_size;
  const end = start + page_size;
  const currentPokemons = pokemons.slice(start, end);

  const handlePreviousPage = () => {
    Router.push(`/?page=${page - 1}`);
  };
  const handleNextPage = () => {
    Router.push(`/?page=${page + 1}`);
  };
  return (
    <>
      <div className={styles.main}>
        <Head>
          <title>Pokemon</title>
          <link rel="icon" href="https://img.icons8.com/fluency/48/null/pokemon.png"/>
          
        </Head>

        <h1>Pokemons</h1>
        <div className={styles.homepage}>
          {currentPokemons.map((pokemon) => (
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
              disabled={currentPokemons.length < page_size}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const client = new ApolloClient({
    uri: "https://graphql-pokemon2.vercel.app/",
    cache: new InMemoryCache(),
  });

  const page = parseInt(query.page) || 1;

  let pageData = 60;
  if (page > 3) {
    pageData = (page - 3) * 20 + 60;
  }

  const { data } = await client.query({
    query: GET_POKEMONS,
    variables: { first: pageData },
  });

  return {
    props: {
      pokemons: data.pokemons,
      page,
    },
  };
}

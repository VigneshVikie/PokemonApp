import styles from "../styles/Home.module.css";
import { useQuery } from "@apollo/client";
import { GET_POKEMON } from "../../graphql/PokemonQuery";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://graphql-pokemon2.vercel.app",
  cache: new InMemoryCache(),
});

const Evolution = ({ evolutionId }) => {
  const evolPokes = evolutionId?.map((ev) => {
    const { data } = useQuery(GET_POKEMON, { variables: { id: ev } });
    return data;
  });

  const pokemons =
    evolPokes &&
    evolPokes?.map((poke) => {
      return poke?.pokemon;
    });

  return (
    <>
      <div className={styles.evolmaindiv}>
        <div className={styles.evolcards}>
          {pokemons &&
            pokemons
              .sort((a, b) => a.number - b.number)
              .map((pokemon, index) => (
                <div key={index} className={styles.evolcard}>
                  <div className={styles.evolimgdiv}>
                    <img
                      src={pokemon?.image}
                      className={styles.evolimg}
                      alt={pokemon?.name}
                    />
                  </div>
                  <h2 className={styles.evolname}>{pokemon?.name}</h2>
                  <div className={styles.typesdiv}>
                    <div className={styles.evoltypes}>
                      {pokemon?.types?.map((type) => (
                        <p>{type}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
        </div>
        {pokemons?.length <= 1 && (
          <h2 className={styles.evolfinaltxt}>
            This is the final Evolution of this Pokemon
          </h2>
        )}
      </div>
    </>
  );
};
export default Evolution;

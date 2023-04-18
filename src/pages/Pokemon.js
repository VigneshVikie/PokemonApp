import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

const Pokemon = (pokemon) => {
  const data = pokemon.pokemon;
  const router = useRouter();
  return (
    <>
      <div
        onClick={() =>
          router.push({
            pathname: "/DetailsPage",
            query: { data: data?.id },
          })
        }
        key={data?.id}
        className={styles.card}
      >
        <h2 className={styles.number}>#{data?.number}</h2>

        <img className={styles.image} src={data?.image} alt={data?.name} />
        <p className={styles.name}>{data?.name}</p>
        <div className={styles.types}>
          {data?.types?.map((type, index) => (
            <p key={`${data?.id}-${index}`} className={styles.type}>
              {type}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default Pokemon;

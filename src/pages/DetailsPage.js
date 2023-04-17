import { isArray } from "@apollo/client/utilities";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
import Evolution from "@/components/Evolution";

const DetailsPage = () => {
  const router = useRouter();
  const { data } = router.query;
  const pokemon = JSON.parse(data);
  const [open, setOpen] = useState(false);

  let evolutionId = pokemon.evolutions?.map((evol) => {
    return evol.id;
  });
  //   evolutionId?.push(`${pokemon.id}`);

  evolutionId === undefined ? evolutionId=[pokemon.id] : evolutionId?.push(`${pokemon.id}`);
  console.log(evolutionId)

  const handleClickEvolutions = () => {
    setOpen(!open);
  };

  return (
    <div>
      {}
      <div className={styles.mainContent}>
        <h1>Pokemons</h1>
        {!open && (
          <div className={styles.content}>
            <div className={styles.contentName}>
              <h1> {pokemon.name}</h1>
            </div>
            <div className={styles.imgdiv}>
              <img className={styles.contentimg} src={pokemon.image}></img>
              <div className={styles.leftBottomDiv}>
                <div className={styles.height}>
                  <div className={styles.icons}>
                    <img src="https://img.icons8.com/external-flatart-icons-solid-flatarticons/60/null/external-growth-baby-flatart-icons-solid-flatarticons.png" />
                  </div>
                  <h2>Height</h2>
                  <p>
                    <strong>Max: </strong> {pokemon.height.maximum}
                  </p>
                  <p>
                    <strong>Min: </strong> {pokemon.height.minimum}
                  </p>
                </div>
                <div className={styles.weight}>
                  <div className={styles.icons}>
                    <img src="https://img.icons8.com/windows/60/null/barbell.png" />
                  </div>
                  <h2>Weight</h2>
                  <p>
                    <strong>Max:</strong> {pokemon.weight.maximum}
                  </p>
                  <p>
                    <strong>Min:</strong> {pokemon.weight.minimum}
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.rdiv}>
              <div className={styles.classification}>
                <h2>Category</h2>
                <p>{pokemon.classification}</p>
              </div>
              <div className={styles.typesdiv}>
                <h2>Type</h2>
                <div className={styles.contenttypes}>
                  {pokemon.types.map((type, index) => (
                    <p
                      key={`${pokemon.id}-${index}`}
                      className={styles.contenttype}
                    >
                      {type}
                    </p>
                  ))}
                </div>
              </div>
              <div className={styles.weaknessdiv}>
                <h2>Weakness</h2>
                <div className={styles.weaknesses}>
                  {pokemon.weaknesses.map((weakness, index) => (
                    <p
                      key={`${pokemon.id}-${index}`}
                      className={styles.weakness}
                    >
                      {weakness}
                    </p>
                  ))}
                </div>
              </div>
              <div className={styles.resistantdiv}>
                <h2>Resistant</h2>
                <div className={styles.resistants}>
                  {pokemon.resistant.map((resist, index) => (
                    <p
                      key={`${pokemon.id}-${index}`}
                      className={styles.resistant}
                    >
                      {resist}
                    </p>
                  ))}
                </div>
              </div>
              <div className={styles.evolutions}>
                <h1>Evolutions</h1>
                <img
                  onClick={handleClickEvolutions}
                  className={styles.pokeball}
                  src="https://img.icons8.com/plasticine/180/000000/pokeball.png"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      {open && (
        <div className={styles.evolutionContent}>
          <div className={styles.evolutioninner}>
            <Evolution evolutionId={evolutionId} pokemon={pokemon} />
          </div>
          <div className={styles.evolution_pokeball}>
            <div className={styles.evolutions}>
              <h1>Evolutions</h1>
              <img
                onClick={handleClickEvolutions}
                className={styles.pokeball}
                src="https://img.icons8.com/plasticine/180/000000/pokeball.png"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsPage;

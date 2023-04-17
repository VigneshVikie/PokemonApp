import { gql } from "@apollo/client";

export const GET_POKEMONS = gql`
  query pokemons($first:Int!) {
    pokemons(first: $first) {
      id
      image
      number
      name
      types
      height {
        minimum
        maximum
      }
      weight {
        minimum
        maximum
      }

      classification
      types
      weaknesses
      resistant
      evolutions {
        id
      }
    }
  }
`;

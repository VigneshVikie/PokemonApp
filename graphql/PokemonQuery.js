import { gql } from "@apollo/client";

export const GET_POKEMON = gql`
query pokemon($id:String){
  pokemon(id: $id){
    id
    number
    name
    image
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

import { gql } from "@apollo/client";

export const GET_EVOLUTION_IMAGE = gql`
query pokemon($id:String){
  pokemon(id: $id){
    number
    name
    image
    types
  }
}
`;

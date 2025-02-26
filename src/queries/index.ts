import { gql } from "@apollo/client";

export const GET_COUNTRIES_QUERY = gql`
  query {
    countries {
      code
      name
      capital
    }
  }
`;

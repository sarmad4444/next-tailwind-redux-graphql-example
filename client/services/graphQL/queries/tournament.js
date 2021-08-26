import { gql } from "@apollo/client";

// TEMP: Fetch all tournaments
const ALL_TOURNAMENTS = gql`
  query Query {
    tournamentMany {
      _id
      mode
      startTime
      scoring
      prize
    }
  }
`

export {
  ALL_TOURNAMENTS,
}
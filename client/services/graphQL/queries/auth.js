import { gql } from "@apollo/client";

// Login to and fetch auth token for the user
const AUTH_LOGIN = gql`
  query Query($identity: String!, $password: String!) {
    userLogin(identity: $identity, password: $password) {
      _id
      name
      email
      token
    }
  }
`

// Verify token and get details of authenticated user
const AUTH_USER = gql`
    query Query {
        authUser {
            _id
            name
            email
        }
    }
`

export {
  AUTH_LOGIN,
  AUTH_USER,
}
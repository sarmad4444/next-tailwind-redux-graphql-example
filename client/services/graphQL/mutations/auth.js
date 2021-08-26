import { gql } from "@apollo/client";

// Create a new user account
const AUTH_REGISTER = gql`
    mutation Mutation($user: CreateOneUserInput!) {
        userCreateOne(record: $user) {
            record {
                _id
                name
                email
            }
        }
    }
`

export {
    AUTH_REGISTER,
}
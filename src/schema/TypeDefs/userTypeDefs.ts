import gql from "graphql-tag";

const userTypeDefs = gql`type User {
    id : Int,
    surname : String,
    fatherName : String,
    name : String,
    userName : String!,
    roles : [String],
    password : String
    birthday : String
  }

  input UserInput {
    surname : String!,
    fatherName : String,
    name : String!,
    userName : String!,
    roles : [String]!,
    password : String!,
    birthday : String
  }
  
  type Query {
    getUsers : [User]
  }

  input LoginUserInput {
    userName : String,
    password : String
  }

  type Tokens {
    accessToken : String,
    refreshToken : String
  }

  type Mutation {
    createUser(user : UserInput) : User,
    loginUser(loginUser : LoginUserInput) : Tokens
    refreshToken : Tokens
    userLogout : Boolean
    updateUser(id : Int, user : UserInput) : User
    deleteUser(id : Int) : Boolean
  }
`

export default userTypeDefs
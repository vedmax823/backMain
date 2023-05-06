import gql from 'graphql-tag'


import UserMutations from './Mutations/UserMutations';
import userTypeDefs from './TypeDefs/userTypeDefs';
import productTypeDefs from './TypeDefs/productTypeDef';
import ProductMutations from './Mutations/ProductMutations';
import categoryTypeDefs from './TypeDefs/categoryTyeDef';
import CategoryMutations from './Mutations/CategoryMutations';
import CategoryQueries from './Queries/CategoryQueries';
import PorductsQueries from './Queries/ProductQueries';

export const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  ${userTypeDefs}
  ${productTypeDefs}
  ${categoryTypeDefs}
`;


export const resolvers = {
    Query: {
        ...CategoryQueries,
        ...PorductsQueries

    },
    Mutation : {
        ...UserMutations,
        ...ProductMutations,
        ...CategoryMutations

    }
};
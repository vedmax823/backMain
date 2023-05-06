import gql from "graphql-tag";

const productTypeDefs = gql`

    input ProductInput {
        name : String!
        description : String
        price : Float!
        advPrice : Float
        onWeight : Boolean!
        canBePackage : Boolean
        packageWeight : Int
        middleWeightOfpackage : Int
        pictureLink : String!
        category : Int
    }

    type Product {
        id : Int,
        name : String
        latName : String
        description : String
        price : Float
        advPrice : Float
        onWeight : Boolean
        canBePackage : Boolean
        packageWeight : Int
        middleWeightOfpackage : Int
        pictureLink : String
        category : Int
    }

    type Query {
        getAllProducts : [Product]
        getProductByCategory(category : Int) : [Product]

    }

    type Mutation{
        createProduct(product: ProductInput) : Product
        updateProduct(id : Int, product: ProductInput) : Product 
        deleteProduct(id : Int) : Boolean
    }
`

export default productTypeDefs
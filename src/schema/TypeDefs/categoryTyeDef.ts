import gql from "graphql-tag";

const categoryTypeDefs = gql`
    input CategoryInput {
        name : String!
        id_father : Int,
        pictureLink : String!
    }

    type Category {
        id : Int,
        name : String
        latName : String
        id_father : Int,
        pictureLink : String
    }

    type Query {
        getAllCategories : [Category]
        getMainCategories : [Category]
        getSubCategories(id_father : Int) : [Category]

    }

    type Mutation{
        createCategory(category: CategoryInput) : Category
        updateCategory(id : Int, category: CategoryInput) : Category 
        deleteCategory(id : Int) : Boolean
    }
`

export default categoryTypeDefs
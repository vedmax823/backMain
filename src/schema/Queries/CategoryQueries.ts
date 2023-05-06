import categoryController from "../../controllers/categoryController"

const CategoryQueries = {
    getAllCategories : async () => {
        return categoryController.getAllCategories()
    },
    getMainCategories : async () => {
        return categoryController.getCategoryByIdFather(-1)
    },
    getSubCategories : async (_: any, args : {id_father : number}) => {
        const {id_father} = args
        return categoryController.getCategoryByIdFather(id_father)
    }
}

export default CategoryQueries
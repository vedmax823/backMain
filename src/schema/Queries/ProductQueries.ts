import categoryController from "../../controllers/categoryController"
import productContoller from "../../controllers/productContoller"


const PorductsQueries = {
    getAllProducts : async () => {
        return productContoller.getAllProducts()
    },
    getProductByCategory : async (_ : any, args : {category : number}) => {
        const {category} = args
        const categoriesList = await categoryController.makeCategoryList(category)
        return await productContoller.getAllProductInCategory(categoriesList)
    }
}


export default PorductsQueries
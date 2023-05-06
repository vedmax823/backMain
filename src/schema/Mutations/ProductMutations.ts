import { MyContext } from "src";
import  Product, { ProductInput } from "../../db/Product";
import ApiError from "../../Error/error";
import jwt from 'jsonwebtoken'
import productContoller from "../../controllers/productContoller";
import { UserPayLoad } from "src/controllers/userController";

const ProductMutations = {
    createProduct : async (_ : any, args : {product : ProductInput}, {req} : MyContext) => {
        try {
            const {product} = args
            if (!req.headers.authorization) throw ApiError.AuthorizationError()
            let authUser;
            try {
                const token = req.headers.authorization.split(' ')[1]
                authUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as UserPayLoad
            }
            catch (e) {
                throw ApiError.AuthorizationError()
            }

            if (!authUser.roles.includes('ADMIN')) throw ApiError.ForbidenDenided()
            const productDB = await productContoller.createProduct(product)
            
            return productDB
        }
        catch(e){
            console.log(e)
            throw e
        }
    },

    updateProduct : async (_ : any, args : {id: number, product : Product}, {req} : MyContext) => {
        try {
            const {id, product} = args
            if (!req.headers.authorization) throw ApiError.AuthorizationError()
            let authUser;
            try {
                const token = req.headers.authorization.split(' ')[1]
                authUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as UserPayLoad
            }
            catch (e) {
                throw ApiError.AuthorizationError()
            }

            if (!authUser.roles.includes('ADMIN')) throw ApiError.ForbidenDenided()
            const productDB = await productContoller.updateProduct(id, product)
            
            return productDB
        }
        catch(e){
            console.log(e)
            throw e
        }
    },

    deleteProduct : async (_ : any, args : {id: number}, {req} : MyContext) => {
        try {
            const {id} = args
            if (!req.headers.authorization) throw ApiError.AuthorizationError()
            let authUser;
            try {
                const token = req.headers.authorization.split(' ')[1]
                authUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as UserPayLoad
            }
            catch (e) {
                throw ApiError.AuthorizationError()
            }

            if (!authUser.roles.includes('ADMIN')) throw ApiError.ForbidenDenided()
            const productDB = await productContoller.deleteProduct(id)
            
            return productDB
        }
        catch(e){
            console.log(e)
            throw e
        }
    }
}

export default ProductMutations
import Category from 'src/db/Category';
import jwt  from 'jsonwebtoken';
import { MyContext } from 'src';
import { CategoryInput } from './../../db/Category';
import ApiError from '../../Error/error';
import { UserPayLoad } from '../../controllers/userController';
import categoryController from '../../controllers/categoryController';

const CategoryMutations = {
    createCategory : async (_ : any, args : {category : CategoryInput}, {req} : MyContext) => {
        try {
            const {category} = args
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
            const productDB = await categoryController.createCategory(category)
            
            return productDB
        }
        catch(e){
            console.log(e)
            throw e
        }
    },

    updateCategory : async (_ : any, args : {id: number, category : Category}, {req} : MyContext) => {
        try {
            const {id, category} = args
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
            const productDB = await categoryController.updateCategory(id, category)
            
            return productDB
        }
        catch(e){
            console.log(e)
            throw e
        }
    },

    deleteCategory : async (_ : any, args : {id: number}, {req} : MyContext) => {
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
            const productDB = await categoryController.deleteCategory(id)
            
            return productDB
        }
        catch(e){
            console.log(e)
            throw e
        }
    }
}

export default CategoryMutations
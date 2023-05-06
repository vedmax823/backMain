
import { LoginUserType } from "src/types/userTypes"
import userController from "../../controllers/userController"
import User from "src/db/Users"
import { MyContext } from "src"
import ApiError from "../../Error/error"
const jwt = require('jsonwebtoken')



const UserMutations = {
    createUser: async (_: any, args: { user: User }, context: MyContext) => {
        const { req } = context
        const { user } = args
        try {
            if (!req.headers.authorization) throw ApiError.AuthorizationError()
            let authUser;
            try {
                const token = req.headers.authorization.split(' ')[1]
                authUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            }
            catch (e) {
                throw ApiError.AuthorizationError()
            }

            if (!authUser.roles.includes('ADMIN')) throw ApiError.ForbidenDenided()


            const newUser = await userController.createUser(user)
            return newUser
        }
        catch (e) {
            console.log(e)
            throw e
        }
    },

    loginUser: async (_: any, args: { loginUser: LoginUserType }, context: MyContext) => {
        const { res } = context
        const { loginUser } = args
        try {
            const tokens = await userController.loginUser(loginUser)
            res.cookie('refreshToken', tokens.refreshToken, { maxAge: 100 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: "none" })
            return tokens
        }
        catch (e) {
            console.log(e)
            throw e
        }
    },

    refreshToken: async (_: any, __: any, { req, res }: MyContext) => {
        try {
            const { refreshToken } = req.cookies
            if (!refreshToken) throw ApiError.AuthorizationError()
            const tokens = await userController.refreshToken(refreshToken)
            res.cookie('refreshToken', tokens.refreshToken, { maxAge: 100 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: "none" })
            return tokens
        }
        catch (e) {
            console.log(e)
            throw e
        }
    },

    userLogout : async (_: any, __: any, { req, res}: MyContext) => {
        const {refreshToken} = req.cookies
        if (!refreshToken) return true
        await userController.logout(refreshToken)
        res.clearCookie("refreshToken");
        return true
    },

    updateUser : async (_:any, args : {id : number, user : User}, {req} : MyContext) => {
        try {
            
            const {id, user} = args
            console.log(user)
            if (!req.headers.authorization) throw ApiError.AuthorizationError()
            let authUser;
            try {
                const token = req.headers.authorization.split(' ')[1]
                authUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            }
            catch (e) {
                throw ApiError.AuthorizationError()
            }

            if (!authUser.roles.includes('ADMIN')) throw ApiError.ForbidenDenided()

            const newUser = await userController.updateUser(id, user, authUser.userName)
            return newUser
        }
        catch (e) {
            console.log(e)
            throw e
        }
    },

    deleteUser : async(_:any, args : {id : number}, {req} : MyContext) => {
        try {
            
            const {id} = args
            if (!req.headers.authorization) throw ApiError.AuthorizationError()
            let authUser;
            try {
                const token = req.headers.authorization.split(' ')[1]
                authUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            }
            catch (e) {
                throw ApiError.AuthorizationError()
            }

            if (!authUser.roles.includes('ADMIN')) throw ApiError.ForbidenDenided()

            const newUser = await userController.deleteUser(id)
            return newUser
        }
        catch (e) {
            console.log(e)
            throw e
        }
    }

}


export default UserMutations
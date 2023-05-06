import User from "../db/Users";
import { LoginUserType } from "src/types/userTypes";
import bcrypt from 'bcrypt'
import tokensController from "./tokensController";
import ApiError from "../Error/error";
import { Op } from "sequelize";

export interface UserPayLoad {
    userName: string,
    user: string,
    roles: string[],
}

class UserController {
    async createUser(user : User){
        const userDB  = await User.findOne({where : {userName : user.userName}})
        if (userDB) throw new Error('такий вже є')
        user.password = bcrypt.hashSync(user.password, 7)
        const newUser = await User.create(user)
        return newUser
    }

    async getUsers(is_active : boolean){
        return is_active
    }

    async loginUser(loginUser : LoginUserType){
        const userDB = await User.findOne({where : {userName : loginUser.userName, is_active : true}})
        if (!userDB) throw ApiError.BadRequest('Нема такого користувача')
        if (!bcrypt.compareSync(loginUser.password, userDB.password)) {
            throw ApiError.BadRequest('Неправильний пароль')
        }
        const tokens = await tokensController.createTokens(userDB)
        
        return tokens
    }

    async refreshToken(token : string) {
        let user 
        try{
            const tokenDB = await tokensController.findToken(token)
            if (!tokenDB) throw ApiError.AuthorizationError()
            user = await tokensController.verifyRefresh(tokenDB) as UserPayLoad

        }
        catch(e){
            throw ApiError.AuthorizationError()
        }
        
        const userDB = await User.findOne({where : {userName : user.userName}})
        if (!userDB) throw ApiError.AuthorizationError()
        const tokens = await tokensController.createTokens(userDB)
        return tokens
    }

    async logout(token : string){
        await tokensController.deleteToken(token)
    }

    async updateUser(id : number, user : User, userName : string){
        
        const userDB = await User.findOne({where : {id}})
        if (!userDB) throw ApiError.BadRequest('Не існує такого користувача')
        if ((id == 2) && (userDB.userName !== userName)) throw ApiError.BadRequest('Ви не можете змінити цього користувача!')
        if (!user.userName || !user.name || !user.surname || !user.roles) throw ApiError.BadRequest('Не всі необхідні дані заповнені!')

        const existUser = await User.findOne({where : {userName : user.userName, id : { [Op.not]: userDB.id}}})
        if (existUser) throw ApiError.BadRequest('Таке імʼя користувача вже зайнято!')
        user.password = user.password ? bcrypt.hashSync(user.password, 7) : userDB.password
        await userDB.update(user)
        return userDB
    }

    async deleteUser(id : number){
        const userDB = await User.findOne({where : {id}})
        if (!userDB) throw ApiError.BadRequest('Не існує такого користувача')
        if (id == 2) throw ApiError.BadRequest('Ви не можете змінити цього користувача :(')
        userDB.is_active = false;
        await userDB.save()
        // await userDB.destroy()
        return true
    }
}

export default new UserController()
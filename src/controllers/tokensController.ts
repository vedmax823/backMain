
import User from 'src/db/Users';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import Token from '../db/Tokens';
dotenv.config()

class TokensController{
    async createTokens(user : User){
        const accessToken = jwt.sign({userName : user.userName, user : user.surname + ' ' + user.name, roles : user.roles}, process.env.ACCESS_TOKEN_SECRET!, {expiresIn : '30m'})
        const refreshToken = jwt.sign({userName : user.userName, user : user.surname + ' ' + user.name, roles : user.roles}, process.env.REFRESH_TOKEN_SECRET!, {expiresIn : '2d'})
        await Token.destroy({where : {userName : user.userName}})
        await Token.create({userName : user.userName, token : refreshToken, ip : '127.0.0.1'})
        return {
            accessToken,
            refreshToken 
        }
    }

    async verifyRefresh(refresh : string){
        const user = jwt.verify(refresh, process.env.REFRESH_TOKEN_SECRET!)
        return user
    }

    async findToken(token : string){
        const tokenData = await Token.findOne({where : {token}})
        return tokenData?.token
    }

    async deleteToken(token : string){
        await Token.destroy({where : {token}})
    }
}

export default new TokensController()
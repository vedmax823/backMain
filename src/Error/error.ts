
 

const {GraphQLError} = require('graphql');

type ExtensionType = {
    code : string,
    status : number,
    myCustom : boolean
}

class ApiError extends GraphQLError{

    constructor(message : string, extensions : ExtensionType ){
        super()
        this.message = message
        this.extensions = extensions
    }

    static ServerError(){
        return new GraphQLError('Помилка серверу', {
            extensions : {
                code: 'INTERNAL_SERVER_ERROR',
                status : 500          
            }
        })
    }

    static AuthorizationError(){
        return new ApiError('Не авторизований користувач', {
            
                code: 'AUTHORIZATION_ERROR',
                status : 401,
                myCustom : true                   
            
        })
    }
    

    static ForbidenDenided(){
        return new ApiError('Не має доступу', {
            
                code: 'FORBIDEN_DENIDED',
                status : 403,
                myCustom : true                   
            
        })
    }

    static BadRequest(message : string){
        return new ApiError(message, {        
                code: 'BAD_REQUEST',
                status : 400,
                myCustom : true         
            }
        )
    }
}

export default ApiError
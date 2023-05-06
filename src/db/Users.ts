import { sequelize } from './index';
import { DataTypes, Model } from 'sequelize';


interface UserAttributes {
    id: number;
    name: string;
    surname: string;
    fatherName?: string;
    birthday?: Date;
    userName : string,
    password : string,
    is_active : boolean,
    telegramCode? : bigint,
    roles : string[],
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

class User extends Model<UserAttributes> implements UserAttributes {
    public id!: number
    public name!: string
    public surname!: string
    public fatherName: string
    public birthday: Date
    public userName! : string
    public password! : string
    public is_active : boolean
    public telegramCode? : bigint
    public roles : string[]

  
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

User.init({
    id : {type : DataTypes.INTEGER, autoIncrement : true, primaryKey : true},
    name : {type : DataTypes.STRING, allowNull : false},
    surname : {type : DataTypes.STRING, allowNull : false},
    fatherName : {type : DataTypes.STRING},
    birthday : {type : DataTypes.DATE},
    userName : {type : DataTypes.STRING, allowNull : false},
    password : {type : DataTypes.STRING, allowNull : false},
    is_active : {type : DataTypes.BOOLEAN, defaultValue : true},
    telegramCode : {type : DataTypes.BIGINT},
    roles : {type : DataTypes.ARRAY(DataTypes.STRING)}
  }, {
    timestamps: true,
    sequelize,
    paranoid: true
  })



// const User = sequelize.define('user', {
//     id : {type : DataTypes.INTEGER, autoIncrement : true, primaryKey : true},
//     name : {type : DataTypes.STRING, allowNull : false},
//     surname : {type : DataTypes.STRING, allowNull : false},
//     fatherName : {type : DataTypes.STRING},
//     birthday : {type : DataTypes.DATE},
//     userName : {type : DataTypes.STRING, allowNull : false},
//     password : {type : DataTypes.STRING, allowNull : false},
//     is_active : {type : DataTypes.BOOLEAN, defaultValue : true},
//     telegramCode : {type : DataTypes.BIGINT},
//     roles : {type : DataTypes.ARRAY(DataTypes.STRING)}
// })

export default User

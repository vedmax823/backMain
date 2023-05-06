import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from './index';

interface TokensAttributes {
    id: number;
    userName : string;
    token : string;
    ip : string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface TokensInput extends Optional<TokensAttributes, 'id' > {}
export interface IngredientOuput extends Required<TokensAttributes> {}


class Token extends Model<TokensAttributes, TokensInput> implements TokensAttributes {
    public id!: number
    public userName! : string;
    public token! : string;
    public ip : string;

  
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Token.init({
    id : {type : DataTypes.INTEGER, autoIncrement : true, primaryKey : true},
    userName : {type : DataTypes.STRING, allowNull : false},
    token : {type : DataTypes.STRING, allowNull : false},
    ip : {type : DataTypes.STRING}
    

  }, {
    timestamps: true,
    sequelize
  })


export default Token

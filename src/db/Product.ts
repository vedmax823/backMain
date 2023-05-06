import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from './index';

interface ProductAttributes {
    id: number;
    name : string;
    latName : string,
    description : string,
    price : number,
    advPrice : number,
    onWeight : boolean,
    canBePackage : boolean,
    packageWeight : boolean,
    middleWeightOfpackage : number,
    pictureLink : string,
    category : number;
    isActive : Boolean;
    createdAt?: Date;
    updatedAt?: Date;
    
}

export interface ProductInput extends Optional<ProductAttributes, 'id' > {}
export interface ProductOuput extends Required<ProductAttributes> {}


class Product extends Model<ProductAttributes, ProductInput> implements ProductAttributes {
    public id!: number;
    public name! : string;
    public latName! : string;
    public description : string;
    public price! : number;
    public advPrice : number;
    public onWeight! : boolean;
    public canBePackage : boolean;
    public packageWeight : boolean;
    public middleWeightOfpackage : number;
    public pictureLink! : string;
    public isActive : boolean;
    public category: number; 

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Product.init({
    id : {type : DataTypes.INTEGER, autoIncrement : true, primaryKey : true},
    name : {type : DataTypes.STRING, allowNull : false, unique : true},
    latName : {type : DataTypes.STRING, allowNull : false, unique : true},
    description : {type : DataTypes.STRING},
    price : {type : DataTypes.FLOAT, allowNull : false},
    advPrice : {type : DataTypes.FLOAT, allowNull : false},
    onWeight : {type : DataTypes.BOOLEAN, allowNull : false},
    canBePackage : {type : DataTypes.BOOLEAN},
    packageWeight : {type : DataTypes.BOOLEAN},
    middleWeightOfpackage : {type : DataTypes.INTEGER},
    pictureLink : {type : DataTypes.STRING},
    isActive : {type : DataTypes.BOOLEAN, defaultValue : true},
    category : {type : DataTypes.INTEGER, allowNull : false, defaultValue : 1}
    
  }, {
    timestamps: true,
    sequelize,
    paranoid: true
  })


export default Product

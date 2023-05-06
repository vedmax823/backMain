import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from './index';

interface CategoryAttributes {
    id: number;
    name : string;
    latName : string,
    id_father : number,
    pictureLink : string,
    isActive : Boolean;
    createdAt?: Date;
    updatedAt?: Date;
    
}

export interface CategoryInput extends Optional<CategoryAttributes, 'id' > {}
export interface CategoryOuput extends Required<CategoryAttributes> {}


class Category extends Model<CategoryAttributes, CategoryInput> implements CategoryAttributes {
    public id!: number;
    public name! : string;
    public latName! : string;
    public id_father: number;
    public pictureLink! : string;
    public isActive : boolean

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Category.init({
    id : {type : DataTypes.INTEGER, autoIncrement : true, primaryKey : true},
    name : {type : DataTypes.STRING, allowNull : false, unique : true},
    latName : {type : DataTypes.STRING, allowNull : false, unique : true},
    id_father : {type : DataTypes.INTEGER, allowNull : false, defaultValue : -1},
    pictureLink : {type : DataTypes.STRING},
    isActive : {type : DataTypes.BOOLEAN, defaultValue : true}
    
  }, {
    timestamps: true,
    sequelize,
    paranoid: true
  })


export default Category

import { Op } from "sequelize";
import ApiError from "../Error/error";
import Category, { CategoryInput } from "../db/Category";
import generate_lat from "../services/helpsFunction";
import Product from "../db/Product";

class CategoryController {
    async createCategory(category : CategoryInput){
        category.latName = generate_lat(category.name)
        const existCategory = await Category.findOne({where : {latName : category.latName}})
        if (existCategory) throw ApiError.BadRequest('Така назва вже існує.')
        if (category.id_father && category.id_father !== -1){
            const fatherCategory = await Category.findOne({where : {id : category.id_father, isActive : true}})
            if (!fatherCategory) throw ApiError.BadRequest('Такої батьківської категорії не існує!')
        }
        const categoryDB = await Category.create(category)
        return categoryDB
    }

    async updateCategory(id : number, category : Category){
        const categoryDB = await Category.findOne({where : {id}})
        if (!categoryDB) throw ApiError.BadRequest('Нема такої категорії.')
        category.latName = generate_lat(category.name)
        if (categoryDB.id == category.id_father) throw ApiError.BadRequest('Не можна вствновитти себе на свою батьківську категорію!')
        const existCategory = await Category.findOne({where : {latName : category.latName, id : {[Op.not] : id}}})
        if(existCategory) throw ApiError.BadRequest('Така назва вже існує.') 
        if (category.id_father && category.id_father !== -1 && category.id != categoryDB.id_father){
            const fatherCategory = await Category.findOne({where : {id : category.id_father, isActive : true}})
            if (!fatherCategory) throw ApiError.BadRequest('Такої батьківської категорії не існує!')
        }
        await categoryDB.update(category)
        return categoryDB
    }

    async deleteCategory(id : number){
        const categoryDB = await Category.findOne({where : {id}})
        if (!categoryDB) throw ApiError.BadRequest('Нема такої категорії.')
        const existCategory = await Category.findOne({where : {id_father : id}})
        if(existCategory) throw ApiError.BadRequest('Неможливо видалити! У цієї категоріїї ще є підкатегорії.') 
        const product = await Product.findOne({where : {category : id}})
        if (product) throw ApiError.BadRequest('Неможливо видалити. У цієї категорії є продукти, їх потрібно перенести в іншу категорію. (Можливо ці продукти зараз не активні)')
        categoryDB.isActive = false
        await categoryDB.save()
        return true
    }

    async getAllCategories(){
        return await Category.findAll({where : {isActive : true}})
    }

    async getCategoryByIdFather(id_father : number){
        return await Category.findAll({where : {isActive : true, id_father}})
    }

    async makeCategoryList(category : number){
        let categoryList = [category]
        const subCategories = await Category.findAll({where : {id_father : category, isActive : true}})
        if (subCategories.length == 0) return categoryList
        categoryList = await subCategories.reduce( async (acc, cat)  : Promise<number[]> => {
            const idList = await acc
            if (idList.includes(category)) return [...idList, cat.id]
            const newSubCat = await this.makeCategoryList(cat.id)
            return [...newSubCat, ...idList]
        }, Promise.resolve(categoryList))
        
        return categoryList
    }
}

export default new CategoryController()
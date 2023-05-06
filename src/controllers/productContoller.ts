
import { Op } from "sequelize";
import ApiError from "../Error/error";
import Product, { ProductInput } from "../db/Product";
import generate_lat from "../services/helpsFunction";
import Category from "../db/Category";

class ProductController {
    async createProduct(product : ProductInput){
        if (!product.name || !product.price || !product.pictureLink || !product.category) throw ApiError.BadRequest('Не всі поля заповнені')
        product.latName = generate_lat(product.name)
        const existProduct = await Product.findOne({where : {latName : product.latName}})
        if (existProduct) throw ApiError.BadRequest('Такий товар вже існує')
        const category = await Category.findOne({where : { id : product.category, isActive : true}})
        if (!category) throw ApiError.BadRequest('Немає такої категорії')
        const productDB = await Product.create(product)
        return productDB
    }

    async deleteProduct(id : number){
        const product = await Product.findOne({where : {id}})
        if (!product) return true
        product.isActive = false
        await product.save()
        return true
    }

    async updateProduct(id : number, product : Product){
        const productDB = await Product.findOne({where : {id}})
        if (!productDB) throw ApiError.BadRequest('Немає такого продукту')
        if (!product.name || !product.price || !product.pictureLink) throw ApiError.BadRequest('Не всі поля заповнені')
        product.latName = generate_lat(product.name)
        const existProduct = await Product.findOne({where : {latName : product.latName, id : {[Op.not] : id}}})
        if (existProduct) throw ApiError.BadRequest('Така назва вже є')
        const category = await Category.findOne({where : { id : product.category, isActive : true}})
        if (!category) throw ApiError.BadRequest('Немає такої категорії')
        await productDB.update(product)
        return productDB
    }

    async getAllProducts(){
        return await Product.findAll({where : {isActive : true}})
    }

    async getAllProductInCategory(categoryList : number[]){
        return await Product.findAll({where : {category : {[Op.in] : categoryList}}})

    }
}

export default new ProductController()
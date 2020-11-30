import express from 'express'
import { getProductById, getProducts } from '../controllers/productController.js'


const productRouter = express.Router()


//using router method
productRouter.route('/').get(getProducts) 

//route to backend for one product by id
productRouter.route('/:id').get(getProductById)


export default productRouter
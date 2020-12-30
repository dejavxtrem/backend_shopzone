import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
import { getProductById, getProducts, deleteProductById, createProduct, updateProduct} from '../controllers/productController.js'


const productRouter = express.Router()


//using router method
productRouter.route('/').get(getProducts) 

//route to backend for one product by id
productRouter.route('/:id').get(getProductById)

productRouter.route('/').post(protect, admin, createProduct)

productRouter.route('/:id').delete(protect, admin, deleteProductById)

productRouter.route('/:id').put(protect, admin, updateProduct)


export default productRouter
import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
import { getProductById, 
    getProducts, 
    deleteProductById, 
    createProduct, 
    updateProduct, 
    createProductReview,
    getTopProducts
} from '../controllers/productController.js'


const productRouter = express.Router()


//using router method
productRouter.route('/').get(getProducts) 

productRouter.get('/top', getTopProducts)

//route to backend for one product by id
productRouter.route('/:id').get(getProductById)

productRouter.route('/').post(protect, admin, createProduct)

productRouter.route('/:id/reviews').post(protect, createProductReview)

productRouter.route('/:id').delete(protect, admin, deleteProductById)

productRouter.route('/:id').put(protect, admin, updateProduct)


export default productRouter
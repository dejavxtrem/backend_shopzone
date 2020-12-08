import express from 'express'
import { addOrderItems, getOrderById } from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

const orderRouter = express.Router()


orderRouter.route('/').post(protect, addOrderItems)

orderRouter.route('/:id').get(protect, getOrderById)




export default orderRouter
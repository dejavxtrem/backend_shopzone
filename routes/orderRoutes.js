import express from 'express'
import { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getAllOrders, updateOrderToDilivered} from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const orderRouter = express.Router()


orderRouter.route('/').post(protect, addOrderItems)

orderRouter.route('/').get(protect, admin, getAllOrders)

orderRouter.route('/myorders').get(protect, getMyOrders)

orderRouter.route('/:id').get(protect, getOrderById)



orderRouter.route('/:id/pay').put(protect, updateOrderToPaid)

orderRouter.route('/:id/delivered').put(protect, admin, updateOrderToDilivered)




export default orderRouter
import asyncHandler  from 'express-async-handler'
import Order from '../models/orderModel.js'




//@description  Create new Order
//@description  POST /api/orders
//@access       Private
const addOrderItems = asyncHandler (async (req, res) => {
    const { orderItems, 
          shippingAddress, 
          paymentMethod , 
          itemsPrice, 
          taxPrice, 
          shippingPrice, 
          totalPrice } = req.body
    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
        return
    } else {
        const order = new Order({
          user: req.user._id,
          orderItems, 
          shippingAddress, 
          paymentMethod , 
          itemsPrice, 
          taxPrice, 
          shippingPrice, 
          totalPrice 
        })
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }

})



//@description  get order by Id
//@description  GET /api/orders/:id
//@access       Private
const getOrderById = asyncHandler (async (req, res) => {
   const order = await Order.findById(req.params.id).populate('user', 'name email')

   if (order) {
       res.json(order)
   } else {
       res.status(404)
       throw new Error('Order not found')
   }

})


//@description  Update order to paid
//@description  GET /api/orders/:id/pay
//@access       Private
const updateOrderToPaid = asyncHandler (async (req, res) => {
    const order = await Order.findById(req.params.id)
 
    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }

        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
 
 })


//@description  Update order to delivered
//@description  GET /api/orders/:id/delivered
//@access       Private/Admin
const updateOrderToDilivered = asyncHandler (async (req, res) => {
    const order = await Order.findById(req.params.id)
 
    if (order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()


        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
 
 })





 //@description  Get logged in user orders
//@description  GET /api/orders/myorders
//@access       Private
 const getMyOrders = asyncHandler (async (req, res) => {
    const orders = await Order.find({ user: req.user._id})
     res.json(orders)

 })



//@description  Get all orders
//@description  GET /api/orders
//@access       Private/Admin
const getAllOrders = asyncHandler (async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name')
     res.json(orders)

 })


export {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders,
    getAllOrders,
    updateOrderToDilivered
}
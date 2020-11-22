import express from 'express'
import asyncHandler  from 'express-async-handler'
import Product from '../models/productModel.js'

const productRouter = express.Router()


//@description  Fetch all products
//@description  GET/api/products
//@access       Public Routes
productRouter.get('/', asyncHandler(async (req, res) => {
        const products = await Product.find({})
        res.json({sucess: true, products})
})) 


//@description  Fetch one Product
//@description  GET/api/products/:id
//@access       Public Routes
productRouter.get('/:id', asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json({success: true, product})
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
}))


export default productRouter
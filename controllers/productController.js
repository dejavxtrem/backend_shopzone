import asyncHandler  from 'express-async-handler'
import Product from '../models/productModel.js'




//@description  Fetch all products
//@description  GET/api/products
//@access       Public Routes
const getProducts = asyncHandler (async (req, res) => {
    const products = await Product.find({})
        res.json({sucess: true, products})
})


//@description  Fetch one Product
//@description  GET/api/products/:id
//@access       Public Routes
const getProductById = asyncHandler (async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json({product})
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

//@description  Create one Product
//@description  POST /api/products
//@access       Private/Admin Routes
const createProduct = asyncHandler (async (req, res) => {
    const product = new Product({
        name: 'Sample Data name',
        price: 0,
        user: req.user._id,
        image: '/image/sample.jpg',
        brand: 'Sample Brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description'
    })
       const createdProduct = await product.save()
       res.status(201).json(createdProduct)
})


//@description  Update one Product
//@description  PUT /api/products/:id
//@access       Private/Admin Routes
const updateProduct = asyncHandler (async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body
    
    const product = await Product.findById(req.params.id)
     
    if (product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('product not found')
    }     
})


//@description  Delete one Product
//@description  DELETE /api/products/:id
//@access       Private/Admin Routes

const deleteProductById = asyncHandler (async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
         await product.remove()
         res.json({message: 'product removed'})
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

export {
    getProducts,
    createProduct,
    updateProduct,
    getProductById,
    deleteProductById,
    
}
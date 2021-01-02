import asyncHandler  from 'express-async-handler'
import Product from '../models/productModel.js'




//@description  Fetch all products
//@description  GET/api/products
//@access       Public Routes
const getProducts = asyncHandler (async (req, res) => {

    //search  query params
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    const products = await Product.find({...keyword})
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



//@description  Create one Product Review
//@description  POST /api/products/:id/reviews
//@access       Private

const createProductReview = asyncHandler (async (req, res) => {
    const { rating, comment } = req.body
    
    const product = await Product.findById(req.params.id)
     
    if (product) {

         const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
         if (alreadyReviewed) {
             res.status(400)
             throw new Error('Product already reviewed')
         }

         const review = {
             name: req.user.name,
             rating: Number(rating),
             comment,
             user:req.user._id
         }

         product.reviews.push(review)

         product.numReviews = product.reviews.length

         product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

         await product.save()
         res.status(201).json({message: 'Review added'})

    } else {
        res.status(404)
        throw new Error('product not found')
    }     
})









export {
    getProducts,
    createProduct,
    updateProduct,
    getProductById,
    deleteProductById,
    createProductReview
}
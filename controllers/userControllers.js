import asyncHandler  from 'express-async-handler'
import User from '../models/userModel.js'

//@description  Get user & get token
//@description  POST /api/users/login
//@access       Public Routes
const authUser = asyncHandler (async (req, res) => {
     const { email, password } = req.body
     const user =  await User.find({email: email})

     if (user && (await user.matchPassword(password))) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token:  null
        })
      } else {
        res.status(401)
        throw new Error('Invalid email or password')
      }
})


//@description  Fetch one Product
//@description  GET/api/products/:id
//@access       Public Routes
// const getProductById = asyncHandler (async (req, res) => {

// })


export {
    authUser,
}
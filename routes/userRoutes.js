import express from 'express'
import { authUser, getUserProfile, registerUser, updateUserProfile} from '../controllers/userControllers.js'
import { protect } from '../middleware/authMiddleware.js'

const userAuthRouter = express.Router()


userAuthRouter.route('/').post(registerUser)
userAuthRouter.post('/login', authUser)

userAuthRouter.
       route('/profile')
       .get(protect, getUserProfile)
       .put(protect, updateUserProfile)



export default userAuthRouter
import express from 'express'
import { authUser, 
       getUserProfile, 
       registerUser, 
       updateUserProfile, 
       getUsers, 
       deleteUser,
       getUserById,
       updateUser
} from '../controllers/userControllers.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const userAuthRouter = express.Router()


userAuthRouter.
              route('/')
              .post(registerUser)
              .get(protect, admin, getUsers)

userAuthRouter.post('/login', authUser)

userAuthRouter.
       route('/profile')
       .get(protect, getUserProfile)
       .put(protect, updateUserProfile)

userAuthRouter.route('/:id')
              .delete(protect, admin, deleteUser)
              .get(protect, admin, getUserById)
              .put(protect, admin, updateUser)
              







export default userAuthRouter
import express from 'express'
import { authUser } from '../controllers/userControllers.js'

const userAuthRouter = express.Router()

userAuthRouter.post('/login', authUser)


export default userAuthRouter
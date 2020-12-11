import express from'express'
import dotenv from 'dotenv'
import  cors  from 'cors'
import morgan  from 'morgan'
import mongoose from 'mongoose'
import colors from 'colors';
import productRouter from './routes/productRoutes.js'
import userAuthRouter from './routes/userRoutes.js'
import orderRouter from './routes/orderRoutes.js'
import { notFoundHandler, errorHandler } from './middleware/errorMiddleware.js'


const app = express()
dotenv.config()



//.env config
const PORT = process.env.PORT || 9000
const mongoURI = process.env.MONGODB_URI


//middleware
app.use(cors());
app.use(morgan("tiny"))
app.use(express.json())
app.use('/api/products', productRouter)
app.use('/api/users', userAuthRouter)
app.use('/api/orders', orderRouter)

//ROUTE to get paypal client id
app.get('/api/config/paypal', (req, res) =>  res.send(process.env.PAYPAL_CLIENT_ID))



app.use(notFoundHandler)
app.use(errorHandler)



//mongo connection 
mongoose.connect( mongoURI , {
    useNewUrlParser: true ,
    useUnifiedTopology: true
})

mongoose.connection.once('open', () => {
  console.log('connected to mongo'.cyan.underline)
})




app.listen( PORT, () => {
    console.log('🎉🎊', `celebrations happening in ${process.env.NODE_ENV}  mode on port ${PORT}  🎉🎊`.yellow.bold)
})
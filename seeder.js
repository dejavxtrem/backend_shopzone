import mongoose from 'mongoose';
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'

dotenv.config()


//Connect to db
const mongoURI = process.env.MONGODB_URI

mongoose.connect( mongoURI , {
    useNewUrlParser: true ,
    useUnifiedTopology: true
})
mongoose.connection.once('open', () => {
  console.log('connected to mongo'.cyan.underline)
})

//dotenv



const importData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)
        //get createduser set to admin
        const adminUser = createdUsers[3]._id

        //adding the admin user to the sample product user admin reference
        const sampleProducts = products.map((product) => {
            return  {...product, user: adminUser}
        })

        await Product.insertMany(sampleProducts)
        console.log(`Data Imported!`.green.inverse)
        process.exit()
    } catch (error) {
            console.error(`${error}`.red.inverse)
            process.exit(1)
    }
}


const destroyData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log(`Data Destroyed`.red.inverse)
        process.exit()
    } catch (error) {
            console.error(`${error}`.red.inverse)
            process.exit(1)
    }
}

 if (process.argv[2] === '-d') {
      destroyData()
 } else {
        importData()
 }
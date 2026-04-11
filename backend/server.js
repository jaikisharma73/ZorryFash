import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import cronRouter from './routes/cronRoute.js'

// App Config
const app = express()
const port = process.env.PORT || 4000

// middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.use('/api/cron',cronRouter)

app.get('/',(req,res)=>{
    res.send("API Working")
})

// ✅ START SERVER ONLY AFTER DB CONNECTS
const startServer = async () => {
    try {
        await connectDB()          // 🔥 WAIT here
        await connectCloudinary()  // (optional but better)

        app.listen(port, () => {
            console.log('Server started on PORT : ' + port)
        })

    } catch (error) {
        console.error("Startup error:", error)
    }
}

startServer()
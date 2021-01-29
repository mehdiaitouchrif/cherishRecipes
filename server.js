import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import connectDB from './database/db.js'
import errorHandler from './middleweare/errorHandler.js'

// Env config
dotenv.config()

// Connect to MongoDB Atlas
connectDB()

// Route files
import authRoutes from './routes/authRoutes.js'

// Express setup
const app = express()
app.use(express.json())

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

// Mount routers
app.use('/api/v1/auth', authRoutes)

// Custom error middleweare
app.use(errorHandler)

// Listen
const PORT = process.env.PORT
app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	)
)

// Handle unhandled promise rejections
process.on('unhandledRejection', (error, promise) => {
	console.log(`Error: ${error.message}`.red.underline)
	// Close server & exit process
	server.close(() => process.exit(1))
})
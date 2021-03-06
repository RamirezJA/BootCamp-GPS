const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const errorHandler = require('./middleware/error')
const connectDB = require('./config/db')



//load env vars
dotenv.config({
    path: './config/config.env'
})
//Connect to DB
connectDB();

//Route files
const bootcamps = require('./routes/bootcamps')

const app = express()

//Body Parser
app.use(express.json())

//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

//Mount Routers
app.use('/api/v1/bootcamps', bootcamps)

//error handler
app.use(errorHandler);


const PORT = process.env.PORT || 5000

const server = app.listen(PORT, console.log(`Server in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))

//Handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);

    //Close server & exit process
    server.close(() => process.exit(1));

});
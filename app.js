require('dotenv')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

//Set routes
const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')
const userRoutes = require('./api/routes/user')

const app = express()
const port = process.env.PORT || 3001

//setup connection string to mongodb
const url = `mongodb+srv://lethinh0210:${process.env.NODE_DATABASE_PW}@cluster0.ddnqx.mongodb.net/${process.env.NODE_NAME_DATABASE}?retryWrites=true&w=majority`;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(url, options)
    .then(() => console.log('Connect success'))
    .catch(error => console.log(error))

//Morgan development
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('uploads'))
app.use(cors())

//Routes which should handle requests
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)
app.use('/users', userRoutes)

app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
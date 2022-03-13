const express = require('express')
const app = express()
require('dotenv').config()
// depois do db
const mongoose = require('mongoose')
const cors = require("cors");

app.use(cors());
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

// routes
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

// initial route/endpoint

app.get('/', (req, res) => {

    res.json({ message: 'Api' })
})



const MONGO_URL = process.env.MONGO_URL

mongoose
    .connect(
        MONGO_URL,
    )
    .then(() => {
        console.log('conected in mongo')
        app.listen(process.env.PORT || 3001)

    })
    .catch((err) => {
        console.log(err)
    })



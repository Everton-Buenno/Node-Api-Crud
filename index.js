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

    res.json({ message: 'ola otarios' })
})


const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD


mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster0.ylhuk.mongodb.net/apidatabase?retryWrites=true&w=majority`,
    )
    .then(() => {
        console.log('conected in mongo')
        app.listen(3001)

    })
    .catch((err) => {
        console.log(err)
    })



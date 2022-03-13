const mongoose = require('mongoose')

const Person = mongoose.model('Person', {
    name: String,
    email: String,
    contact: String,
})

module.exports = Person
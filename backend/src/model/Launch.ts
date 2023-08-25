const mongoose = require('mongoose')

const Launch = mongoose.model('Launch', {
    name: String,
    rocket: String,
    success: Boolean,
    details: String,
    flight_number: String,
    image: String,
    id: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = Launch
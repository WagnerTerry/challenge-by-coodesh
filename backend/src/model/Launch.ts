const mongoose = require('mongoose')

const Launch = mongoose.model('Launch', {
    name: String,
    rocket: String,
    success: Boolean,
    reused: Boolean,
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = Launch
const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
    brand: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true
    },
    fuel: {
        type: String,
        default: "essence",
        required: true
    },
    hp: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Car', carSchema);
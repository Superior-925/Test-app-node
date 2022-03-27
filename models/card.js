const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
    cardNumber: { type: Number,
                required: true,
                validate: {
                validator: function(value) {
                return value.toString().length === 16
                },
                message: val => `${val.value} has to be 16 digits`
        }
    },
    expirationDate: { type: String, required: true },
    cvv: {  type: Number,
            required: true,
            validate: {
            validator: function(value) {
                return value.toString().length === 3
            },
            message: val => `${val.value} has to be 3 digits`
        }
    },
    amount: { type: Number, required: true },
},
    {
        timestamps: true
    });

mongoose.model('Card', CardSchema);

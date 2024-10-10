const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    },
    items: [{
        product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
        quantity: { type: Number, default: 1}
    }]
})

CartSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

module.exports = mongoose.model('Cart', CartSchema)
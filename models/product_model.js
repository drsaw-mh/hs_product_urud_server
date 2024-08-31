const mongoose = require("mongoose");
const { Schema } = mongoose;

const Product = new Schema({
    item_code: { type: String, required: false },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    cover: { type: String, required: false }
});

module.exports = mongoose.model('product', Product);
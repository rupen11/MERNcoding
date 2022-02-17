const mongoose = require('mongoose');

const FoodSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    foodname: { type: String, require: true },
    hotelname: { type: String, require: true },
    foodimage: { type: String, require: true },
    foodprice: { type: Number, require: true }
});

const Food = new mongoose.model("foods", FoodSchema);

module.exports = Food;
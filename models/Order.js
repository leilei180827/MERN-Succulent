const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Succulent = require("./Succulent");
const User = require("./User");

const succulentInOrder = mongoose.Schema({
  succulent: {
    type: Schema.Types.ObjectId,
    ref: Succulent,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});
const orderSchema = mongoose.Schema(
  {
    products: [succulentInOrder],
    userId: {
      type: Schema.Types.ObjectId,
      ref: User,
    },
    address: {
      type: String,
      required: true,
    },
    recipientName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = OrderSchema = mongoose.model("OrderSchema", orderSchema);

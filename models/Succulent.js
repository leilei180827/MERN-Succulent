const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const defaultDes =
  "Grow in a bright location to achieve the best colours.Two sizes available: Single and Multi Heads,Plants for sale displayed in 70mm pots.";
const succulent = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    category: {
      type: String,
      default: "Echeveria"
    },
    price: {
      type: Number,
      required: true
    },
    images: {
      type: [String],
      required: true
    },
    description: {
      type: String,
      default: defaultDes
    },
    available_number: {
      type: Number,
      default: 2
    }
  },
  { timestamps: true }
);
module.exports = Succulent = mongoose.model("Succulent", succulent);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const addressSchema = new Schema({
//   street: {
//     type: String,
//   },
//   suburb: {
//     type: String,
//   },
//   city: {
//     type: String,
//   },
//   state: {
//     type: String,
//   },
//   country: {
//     type: String,
//   },
//   postcode: {
//     type: String,
//   },
// });
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      street: {
        type: String,
        default: "",
      },
      suburb: {
        type: String,
        default: "",
      },
      city: {
        type: String,
        default: "",
      },
      state: {
        type: String,
        default: "",
      },
      country: {
        type: String,
        default: "Australia",
      },
      postcode: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model("User", userSchema);

const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const OrderSchema = require("../../models/Order");
const Succulent = require("../../models/Succulent");
const Constants = require("../../config/Constants");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const getRequestParams = (params) => {
  let newUser = {};
  let address = {};
  params.username && (newUser.username = params.username);
  params.email && (newUser.email = params.email);
  params.address &&
    params.address.street &&
    (address.street = params.address.street);
  params.address &&
    params.address.suburb &&
    (address.suburb = params.address.suburb);
  params.address && params.address.city && (address.city = params.address.city);
  params.address &&
    params.address.state &&
    (address.state = params.address.state);
  params.address &&
    params.address.postcode &&
    (address.postcode = params.address.postcode);
  if (Object.keys(address).length !== 0) {
    newUser.address = address;
  }
  return newUser;
};
router.post("/search/orders", (req, res) => {
  userId = req.body.userId;
  OrderSchema.find({ userId: userId })
    .populate({ path: "products.succulent" })
    .populate({ path: "userId", select: "username" })
    .sort({
      createdAt: -1,
    })
    .exec()
    .then((orders) => {
      res.json({
        success: true,
        message: "search results are sent",
        orders: orders,
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        message: "something went wrong, please try again",
        error: err,
      });
    });
});
router.post("/add/orders", (req, res) => {
  let products = req.body.products;
  //package all original promises as a new promise. execute the new promise after all original promised have responded
  const promises = products.map((item, index) => {
    return Succulent.findOne({ name: item.succulentName });
  });
  Promise.all(promises).then((results) => {
    for (let response of results) {
      products.map((item, index) => {
        if (item.succulentName === response.name) {
          item.succulent = response._id;
          delete item.succulentName;
        }
      });
    }
    //update products-delete succulentName:name and add succulent:_id
    let newOrder = new OrderSchema({
      address: req.body.address,
      products: req.body.products,
      recipientName: req.body.recipientName,
    });
    req.body.userId && (newOrder.userId = req.body.userId);
    newOrder
      .save()
      .then((newOrders) =>
        res.json({
          success: true,
          message: "infos of the order have been stored successfully",
          newOrders: newOrders,
        })
      )
      .catch((err) => res.json({ success: false, message: err }));
  });
});
// use hashed password inside the bcryptjs otherwise it will store the raw pwd
router.post("/update", (req, res) => {
  console.log(req.body);
  let newUser = getRequestParams(req.body);
  User.findOneAndUpdate({ _id: req.body._id }, { $set: newUser }, { new: true })
    .then((user) => {
      if (!user) {
        res.json({ success: false, message: "User Not Found" });
      } else {
        console.log("user");
        console.log(user);
        res.json({
          success: true,
          message: "Update successfully",
          user: user,
        });
      }
    })
    .catch((err) => res.json({ success: false, message: err }));
});
router.post("/reset", (req, res) => {
  console.log(req.body);
  let newUser = { password: req.body.password };
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(newUser.password, salt, function (err, hash) {
      if (err) throw err;
      newUser.password = hash;
      User.findOneAndUpdate({ _id: req.body._id }, { $set: newUser })
        .then((user) => {
          console.log(user);
          if (!user) {
            res.json({ success: false, message: "User Not Found" });
          } else {
            res.json({
              success: true,
              message: "Reset successfully",
            });
          }
        })
        .catch((err) => res.json({ success: false, message: err }));
    });
  });
});
router.post("/register", (req, res) => {
  let defaultAddr = {
    street: "",
    suburb: "",
    city: "",
    state: "",
    country: "",
    postcode: "",
  };
  console.log("enter /user/register");
  // Store hash in your password DB.
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    address: defaultAddr,
  });
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(newUser.password, salt, function (err, hash) {
      if (err) throw err;
      newUser.password = hash;
      newUser
        .save()
        .then((users) =>
          res.json({ success: true, message: "you're registered successfully" })
        )
        .catch((err) => res.json({ success: false, message: err }));
    });
  });
});
router.post("/authenticate", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ username })
    .then((user) => {
      if (!user) res.json({ success: false, message: "User Not Found" });
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) res.json({ success: false, error: err });
        if (isMatch) {
          const token = jwt.sign({ data: user }, Constants.SECRET, {
            expiresIn: "1h", // 1 week
          });
          res.json({
            success: true,
            message: "you've logged in successfully",
            token: `Bearer ${token}`,
            user: {
              id: user._id,
              username: user.username,
              email: user.email,
            },
          });
        } else {
          res.json({ success: false, message: "Wrong Password" });
        }
      });
    })
    .catch((err) => res.json({ success: false, message: err }));
});
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ user: req.user });
  }
);
module.exports = router;

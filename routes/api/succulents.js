const express = require("express");
const router = express.Router();
const Succulent = require("../../models/Succulent");

router.get("/", (req, res) => {
  Succulent.aggregate([
    {
      $group: {
        _id: "$category",
        succulents: { $push: "$$ROOT" }
      }
    },
    { $sort: { _id: 1 } }
  ])
    .then(items => res.json(items))
    .catch(err => console.log(err));
});

router.get("/:category", (req, res) => {
  const category = req.params.category;
  if (category.toUpperCase() === "NEW") {
    Succulent.find()
      .sort({ createdAt: -1 })
      .then(succulents => res.json(succulents))
      .catch(err => console.log(err));
  } else {
    Succulent.find({ category: category })
      .then(succulents => res.json(succulents))
      .catch(err => console.log(err));
  }
});
module.exports = router;

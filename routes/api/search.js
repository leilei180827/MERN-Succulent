const express = require("express");
const router = express.Router();
const Succulent = require("../../models/Succulent");
router.get("/", (req, res) => {
  var keyword = req.query.keyword;
  console.log(keyword);
  Succulent.find({ name: { $regex: keyword, $options: "i" } })
    .sort({ name: -1 })
    .then(succulents => res.json(succulents))
    .catch(err => console.log(err));
});
module.exports = router;

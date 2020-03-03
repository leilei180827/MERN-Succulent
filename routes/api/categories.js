const express = require("express");
const router = express.Router();
const Succulent = require("../../models/Succulent");
router.get("/", (req, res) => {
  Succulent.distinct("category")
    .then(categories => res.json(categories))
    .catch(err => console.log("err" + err));
});
module.exports = router;

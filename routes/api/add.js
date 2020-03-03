const express = require("express");
const router = express.Router();
const Succulent = require("../../models/Succulent");
router.post("/", (req, res) => {
  const newSucc = new Succulent({
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    images: req.body.images
  });
  newSucc
    .save()
    .then(succulents => res.json(succulents))
    .catch(err => res.json({ error: err }));
});
module.exports = router;

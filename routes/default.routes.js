const express = require("express");
const router = express.Router();
const defaultController = require('../controllers/default.controller');

router.get("/", function (req, res) {
  const message = req.session.message || null;
  req.session.message = null;
  res.render("index", { message });
});

router.get("/addclothes", defaultController.getIndex);

router.get("/brand", defaultController.getBrand);

router.get("/denim", defaultController.getDenim);

router.get("/episode1", defaultController.getEp1);

router.get("/episode2", defaultController.getEp2);

router.get("/episode3", defaultController.getEp3);

router.get("/stockist", defaultController.getStockist);

// router.get("/about", defaultController.getAbout);

module.exports = router;

const express = require("express");

const router = express.Router();
const controller = require("../controllers/flightController");

router
  //  .get("/", controller.example)
  .post("/", controller.addFlight)
  .get("/", controller.getFlights)
  .get("/:id", controller.getFlight)
  .put("/:id", controller.updateFlight)
  .delete("/:id", controller.deleteFlight);

module.exports = router;

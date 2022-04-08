const express = require("express");
const router = express.Router();
const Centre = require("../models/centre");

// Get all
router.get("/", async (req, res) => {
  try {
    const centres = await Centre.find();
    res.json(centres);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one
router.get("/:id", getCentre, (req, res) => {
  res.json(res.centre);
});

// Create one
router.post("/", async (req, res) => {
  const centre = new Centre({
    name: req.body.name,
    address: req.body.address,
    suburb: req.body.suburb,
    postCode: req.body.postCode,
    state: req.body.state,
    webSite: req.body.webSite,
    emailAddress: req.body.emailAddress,
  });

  try {
    const newCentre = await centre.save();
    res.status(201).json(newCentre);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// middleware
async function getCentre(req, res, next) {
  let centre;
  try {
    centre = await Centre.findById(req.params.id);
    if (centre == null) {
      return res.status(404).json({ message: "Cannot find centre" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.centre = centre;
  next();
}

module.exports = router;

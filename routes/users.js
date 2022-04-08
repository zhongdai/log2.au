const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Get all
router.get("/", async (req, res) => {
  let queryOption = {}
  if (req.query.email) {
    queryOption = {
      email: req.query.email
    }
  }
  try {
    const users = await User.find(queryOption);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one
router.get("/:id", getUser, (req, res) => {
  res.json(res.user);
});

// Create one
router.post("/", async (req, res) => {
  const user = new User({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete one
router.delete("/:id", getUser, async (req, res) => {
  try {
      const {email} = res.user
      await res.user.remove()
      res.json({ message: `User '${email}' is deleted`})
  } catch (err) {
      res.status(500).json({ message: err.message})
  }
})

// middleware
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.user = user;
  next();
}

module.exports = router;

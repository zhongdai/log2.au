const mongoose = require("mongoose");

const centreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  suburb: {
    type: String,
  },
  postCode: {
    type: String,
  },
  state: {
    type: String,
  },
  webSite: {
    type: String,
  },
  emailAddress: {
    type: String,
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model('Centre', centreSchema)

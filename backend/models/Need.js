 const mongoose = require('mongoose');

const needSchema = new mongoose.Schema({
  title: String,
  skills: [String],
  date: String
});

module.exports = mongoose.model('Need', needSchema);


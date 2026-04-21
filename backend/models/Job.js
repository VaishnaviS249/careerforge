const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  description: String,
  source: String,
  applyLink: { type: String, unique: true },
  postedAt: { type: Date, default: Date.now }
});

JobSchema.index({ title: 'text', company: 'text' });
module.exports = mongoose.model('Job', JobSchema);
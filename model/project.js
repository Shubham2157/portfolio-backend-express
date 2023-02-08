const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: false,
    default: true,
  },
  createdAt: {
     type: Date,
     required: true
    },
  updatedAt: {
     type: Date,
     required: true
    },
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = { Project };
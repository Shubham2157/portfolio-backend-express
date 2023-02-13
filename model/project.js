const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)

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
  link: {
    type: String,
    required: true,
  },
  tech_stack: {
    data: [{type: String}]
  },
  slug: { type: String, slug: "name", unique: true , lowercase: true },
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
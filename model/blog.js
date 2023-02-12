const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  slug: { type: String, slug: "title", unique: true , lowercase: true },
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

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = { Blog };
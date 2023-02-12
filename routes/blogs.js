const express = require('express')
const router = express.Router();
const { Blog } = require("../model/blog");
var logger = require('../config/logger')
const baseURL = '/api/blog';
const auth = require('../middleware/auth')


router.get("/all", async (req, res) => {
    logger.info(`Requested ${req.method} method at ${baseURL + req.url}`)
    const allBlogs = await Blog.find({ isActive: true });
    return res.status(200).json(allBlogs);
});


router.get("/:id", async (req, res) => {
    logger.info(`Requested ${req.method} method at ${baseURL + req.url}`)
    const { id } = req.params;
    const newBlog = await Blog.findById(id);
    return res.status(200).json(newBlog);
});

router.get("/slug/:slug", async (req, res) => {
    logger.info(`Requested ${req.method} method at ${baseURL + req.url}`)
    const { slug } = req.params;
    try {
        const newBlog = await Blog.find({ slug })
        return res.status(200).json(newBlog);
    } catch (error) {
        return res.status(400).json({error});
    }
});

router.post("/", auth, async (req, res) => {
    logger.info(`Requested ${req.method} method at ${baseURL + req.url}`)
    const newBlog = new Blog({ ...req.body });
    newBlog.createdAt = Date.now();
    newBlog.updatedAt = Date.now();
    const insertednewBlog = await newBlog.save();
    return res.status(201).json(insertednewBlog);
});


router.put("/:id", auth, async (req, res) => {
    logger.info(`Requested ${req.method} method at ${baseURL + req.url}`)
    const { id } = req.params;
    req.body.updatedAt = Date.now();
    await Blog.updateOne({ "_id": id }, req.body);
    const updatedBlog = await Blog.findById(id);
    return res.status(200).json(updatedBlog);
});

router.delete("/:id", auth, async (req, res) => {
    logger.info(`Requested ${req.method} method at ${baseURL + req.url}`)
    const { id } = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(id);
    return res.status(200).json(deletedBlog);
});

module.exports = router
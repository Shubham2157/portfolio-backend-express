const express = require('express')
const router = express.Router();
const { Project } = require("../model/project");
var logger = require('../logger')
const baseURL = '/api/project';

router.get("/all", async (req, res) => {
    logger.info(`Requested ${req.method} method at ${baseURL + req.url}`)
    const allProjects = await Project.find({ isActive: true });
    return res.status(200).json(allProjects);
});


router.get("/:id", async (req, res) => {
    logger.info(`Requested ${req.method} method at ${baseURL + req.url}`)
    const { id } = req.params;
    const newProject = await Project.findById(id);
    return res.status(200).json(newProject);
});


router.post("/", async (req, res) => {
    logger.info(`Requested ${req.method} method at ${baseURL + req.url}`)
    const newProject = new Project({ ...req.body });
    newProject.createdAt = Date.now();
    newProject.updatedAt = Date.now();
    const insertednewProject = await newProject.save();
    return res.status(201).json(insertednewProject);
});


router.put("/:id", async (req, res) => {
    logger.info(`Requested ${req.method} method at ${baseURL + req.url}`)
    const { id } = req.params;
    req.body.updatedAt = Date.now();
    await Project.updateOne({ "_id": id }, req.body);
    const updatedProject = await Project.findById(id);
    return res.status(200).json(updatedProject);
});

router.delete("/:id", async (req, res) => {
    logger.info(`Requested ${req.method} method at ${baseURL + req.url}`)
    const { id } = req.params;
    const deletedProject = await Project.findByIdAndDelete(id);
    return res.status(200).json(deletedProject);
});

module.exports = router
const express = require('express')
const app = express()
var mime = require('mime');
require('dotenv').config()

app.use(express.json());

const PORT = process.env.PORT || 3001

// logger configs imported
var logger = require('./logger')
// database connection
var database = require('./database')


const { Project } = require("./model/project");

app.get('/', (req,res)=>{
    logger.info(`Requested ${req.method} method at ${req.url}`)
    res.json(
        {
            "message": "Portfolio Backend is running Successfully",
            "status": "OK",
            "code": 200
        }
    )
})

// ===================================================================


//                 LOGS

app.get("/download/logs/application.log", (req,res) => {
  const file = `${__dirname}/prodlogs/app.log`
  var d = new Date()
  var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
    d.getFullYear() + "_" + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)+ ":" + ("0" + d.getSeconds()).slice(-2);
  const filename = `application-${datestring}.log`
  var mimetype = mime.lookup(file);
  res.setHeader('Content-type', mimetype)
  res.setHeader('Content-Length', file.length)
  res.download(file, filename)
})



app.get("/download/logs/error.log", (req,res) => {
  const file = `${__dirname}/prodlogs/error.log`
  var d = new Date()
  var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
    d.getFullYear() + "_" + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)+ ":" + ("0" + d.getSeconds()).slice(-2);
  const filename = `error-logs-${datestring}.log`
  res.download(file, filename)
})

// ===================================================================


  app.get("/projects", async (req, res) => {
    logger.info(`Requested ${req.method} method at ${req.url}`)
    const allProjects = await Project.find({isActive: true});
    return res.status(200).json(allProjects);
  });


  app.get("/project/:id", async (req, res) => {
    logger.info(`Requested ${req.method} method at ${req.url}`)
    const { id } = req.params;
    const newProject = await Project.findById(id);
    return res.status(200).json(newProject);
  });


  app.post("/projects", async (req, res) => {
    logger.info(`Requested ${req.method} method at ${req.url}`)
    const newProject = new Project({ ...req.body });
    newProject.createdAt = Date.now();
    newProject.updatedAt = Date.now();
    const insertednewProject = await newProject.save();
    return res.status(201).json(insertednewProject);
  });


  app.put("/project/:id", async (req, res) => {
    logger.info(`Requested ${req.method} method at ${req.url}`)
    const { id } = req.params;
    req.body.updatedAt = Date.now();
    await Project.updateOne({ "_id": id }, req.body);
    const updatedDog = await Project.findById(id);
    return res.status(200).json(updatedDog);
  });

  app.delete("/project/:id", async (req, res) => {
    logger.info(`Requested ${req.method} method at ${req.url}`)
    const { id } = req.params;
    const deletedProject = await Project.findByIdAndDelete(id);
    return res.status(200).json(deletedProject);
  });


app.listen(PORT, ()=>{
    logger.info(`Express server is running on port ${PORT}`)
})
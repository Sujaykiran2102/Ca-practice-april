const Task = require("../models/Task");

const getTasks = async (req,res) =>{
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        console.error("Error while getting tasks : ",error);
        res.status(500).json({Error : "Error while getting tasks"});
    }
}

const createTask = async (req,res) =>{
    try {
        const { title, description, deadLine } = req.body;
        const newTask = new Task({ title, description, deadLine });
        await newTask.save();
        res.status(201).json(newTask)
    } catch (error) {
        console.error("Error while creating tasks : ",error);
        res.status(500).json({Error : "Error while creating tasks"});
    }
}

module.exports = { getTasks, createTask };
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const taskRoutes = require("./routes/taskRoutes");

const PORT = process.env.PORT;
const uri = process.env.MONGO_URI;

mongoose.connect(uri,{useNewUrlParser : true, useUnifiedTopology : true})
.then(()=> console.log("MongoDB connected successfully"))
.catch((err)=> console.error("MongoDB connection failed"))

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/tasks",taskRoutes);

app.get("/",(req,res)=>{
    res.send("App is running successfully");
})

app.listen(PORT, ()=> console.log(`Server is running on http://localhost:${PORT}`));
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes")

const PORT = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;

mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=> console.log("MongoDB connected successfully"))
.catch((err)=> console.error("MongoDB connection error",err))

const app = express()
app.use(express.json())
app.use(cors());

app.use("/api/users",userRoutes);
app.use("/api/todos",todoRoutes);

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))
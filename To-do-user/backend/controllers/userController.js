const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

const createUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: "Failed to create user" });
  }
};

const updateUser = async (req,res) =>{
    try {
        const {id}=req.params;
        const {name,email} = req.body;

        const updated = await User.findByIdAndUpdate(id,{name,email},{new:true});
        res.json(updated);
    } catch (error) {
        console.error("Error updating user",err);
        res.status(500).json({Error:"Error updating user"})
    }
}

const deleteUser = async(req,res) =>{
    try {
        const {id} = req.params;
        await User.findByIdAndDelete(id);
        res.json({message: "User deleted successfully"})
    } catch (error) {
        console.error("error deleting user");
        res.status(500).json({Error: "Error deleting user"});
    }
}

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
  };
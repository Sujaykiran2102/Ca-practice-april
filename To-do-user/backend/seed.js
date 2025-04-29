require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");
const Todo = require("./models/Todo");

const MONGO_URI = process.env.MONGO_URI;

const seedDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Todo.deleteMany({});

    // Seed users
    const users = await User.insertMany([
      { name: "Alice", email: "alice@example.com" },
      { name: "Bob", email: "bob@example.com" },
      { name: "Charlie", email: "charlie@example.com" },
    ]);

    // Seed todos
    const todos = [
      {
        title: "Complete project report",
        description: "Finish the last section and proofread",
        userId: users[0]._id,
      },
      {
        title: "Team meeting",
        description: "Discuss next sprint tasks",
        userId: users[1]._id,
      },
      {
        title: "Code review",
        description: "Review Bob's merge request",
        userId: users[2]._id,
      },
    ];

    await Todo.insertMany(todos);

    console.log("Database seeded successfully 🎉");
    process.exit();
  } catch (error) {
    console.error("Seeding failed ❌", error);
    process.exit(1);
  }
};

seedDB();

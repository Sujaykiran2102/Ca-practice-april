import React from "react";
import UserList from "../components/UserList";
import TodoList from "../components/ToDoList";

const Home = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Todo-User Management App</h1>
      <UserList />
      <hr />
      <TodoList />
    </div>
  );
};

export default Home;

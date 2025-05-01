import React, { useEffect, useState } from "react";
import API from "../utils/api";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    API.get("/todos")
      .then((res) => setTodos(res.data))
      .catch((err) => console.error("Failed to fetch todos", err));
  }, []);

  return (
    <div>
      <h2>Todos</h2>
      <ul>
        {todos.map((t) => (
          <li key={t._id}>
            <strong>{t.title}</strong>: {t.description} <br />
            Assigned to: {t.userId?.name || "Unassigned"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

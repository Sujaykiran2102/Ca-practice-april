import React from 'react'

function TodoItem({task}) {
  return (
    <div>
        <h3>
            {task.title}
        </h3>
        <p>
            {task.description}
        </p>
        <p>
            Description : {task.deadLine}
        </p>
    </div>
  )
}

export default TodoItem;
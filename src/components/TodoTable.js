import React from 'react';

function TodoTable({ todos, checkTodo }) {
  return (
    <ul className="todoTable">
      {todos.map((todo, index) => (
        <li key={`todo-${index}`} className="checkList">
          <input
            type="checkbox"
            className="checkRadio"
            onChange={() => checkTodo(index)}
          />
          <a href={`/items/${todo.id}`}>
            <label className="checkBoxLabel">{todo.name}</label>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default TodoTable;
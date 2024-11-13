import React from 'react';

function DoneTable({ dones, doneTodo }) {
  return (
    <ul className="doneTable">
      {dones.map((done, index) => (
        <li key={`done-${index}`} className="checkList">
          <input
            type="checkbox"
            className="checkRadio"
            checked
            onChange={() => doneTodo(index)}
          />
          <a href={`/items/${done.id}`}>
            <label className="checkBoxLabel">{done.name}</label>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default DoneTable;
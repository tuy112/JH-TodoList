import React from 'react';
import '../assets/styles/header.css';

function Header() {
  return (
    <header id="header">
      <div className="inner">
        <h1>
            JSTORY
            <span>TodoList</span>
        </h1>
      </div>
    </header>
  );
}

export default Header;
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import TodoTable from '../components/TodoTable';
import DoneTable from '../components/DoneTable';
import '../assets/styles/main.css';

function Home() {
    const [buttonValue, setButtonValue] = useState("+ 추가하기");
    const [todos, setTodos] = useState([]);
    const [dones, setDones] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const tenantId = "jstol";

    useEffect(() => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", `https://assignment-todolist-api.vercel.app/api/${tenantId}/items`, true);
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          const data = JSON.parse(xhr.responseText);
          setTodos(data);
        } else {
          console.log("할 일 목록 불러오기 실패:", xhr.statusText);
        }
      };
      xhr.send();
    }, [tenantId]);

    const addTodo = () => {
      if (newTodo.trim()) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `https://assignment-todolist-api.vercel.app/api/${tenantId}/items`, true);
        xhr.setRequestHeader("Content-Type", "application/json");
    
        xhr.onload = function () {
          if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText);
            setTodos([...todos, data.content]);
            setNewTodo("");
          } else {
            console.error("할 일 추가 실패:", xhr.statusText);
          }
        };
    
        const requestBody = JSON.stringify({
          name: newTodo
        });
        xhr.send(requestBody);
      }
    };

    const checkTodo = (index) => {
      const updatedTodos = [...todos];
      const [movedTodo] = updatedTodos.splice(index, 1);
      setTodos(updatedTodos);
      setDones((prevDones) => [
        ...prevDones,
        { ...movedTodo, isCompleted: true },
      ]);
    };

    const doneTodo = (index) => {
      const updatedDones = [...dones];
      const [movedDone] = updatedDones.splice(index, 1);  
      setTodos((prevTodos) => [
        ...prevTodos,
        { ...movedDone, isCompleted: false },
      ]);
    };

    useEffect(() => {
      const handleResize = () => {
        const width = window.innerWidth;
        setButtonValue(width <= 743 ? "+" : "+ 추가하기");
      };
  
      window.addEventListener('resize', handleResize);
      handleResize();
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    

  return (
    <div id="wrap">
        <div id="skipNav" className="hide">
          <a href="#">본문 바로가기</a>
        </div>

        <Header/>

        <main id="container" className="main">
          <section id="content">
            <div className="todoSearchBox">
              <input 
                type="text" 
                className="search" 
                placeholder="할 일을 입력해주세요" 
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
              />
              <input 
                type="button" 
                className="addBtn"
                value={buttonValue}
                onClick={addTodo}
              />
            </div>

            <div className="tableWrap">
              <img className="todoImg" src="/images/todo.png" alt="todo" />
              <TodoTable todos={todos} checkTodo={checkTodo} />

              <img className="doneImg" src="/images/done.png" alt="done" />
              <DoneTable dones={dones} doneTodo={doneTodo} />
            </div>
          </section>
        </main>
      </div>
  );
}

export default Home;
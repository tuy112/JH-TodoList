"use client";
// import { useNavigation } from "next/navigation";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from "./styles/page.module.css";

export default function Home() {
    const [buttonValue, setButtonValue] = useState("+ 추가하기");
    const [todos, setTodos] = useState<string[]>([]); // todo
    const [dones, setDones] = useState<string[]>([]); // done
    const [newTodo, setNewTodo] = useState("");
    const tenantId = "jstol";
    // const navigation = useNavigation();

    // Ajax 사용
    // 1. 할 일 목록 GET
    useEffect(() => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", `https://assignment-todolist-api.vercel.app/api/${tenantId}/items`, true);
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          const data = JSON.parse(xhr.responseText);
          setTodos(data.todos);
          console.log("할 일 목록 불러오기 성공:", data.todos);
        } else {
          console.log("할 일 목록 불러오기 실패:", xhr.statusText);
        }
      };
      xhr.send();
    }, [tenantId]);

    // 2. 할 일 추가 POST
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
            console.log("할 일 추가 성공:", data.content);
          } else {
            console.error("할 일 추가 실패:", xhr.statusText);
          }
        };
    
        xhr.onerror = function () {
          console.error("요청 실패");
        };
    
        const requestBody = JSON.stringify({ item: { content: newTodo } });
        xhr.send(requestBody);
        console.log("보내는 요청 본문:", requestBody);
      }
    };

    // 3. 체크박스 체크 (할일 todo -> 완료 done)
    const checkTodo = (index: number) => {
      const updatedTodos = [...todos];
      const [movedTodo] = updatedTodos.splice(index, 1);
      setTodos(updatedTodos);
      setDones((prevDones) => [...prevDones, movedTodo]);
    };

    // 4. 체크박스 체크 (완료 done -> 할일 todo)
    const doneTodo = (index:number) => {
      const updatedDones = [...dones];
      const [movedDone] = updatedDones.splice(index, 1);
      setDones(updatedDones);
      setTodos((prevTodos) => [...prevTodos, movedDone]);
    };

    // 4. 할 일 입력 핸들러
    const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewTodo(e.target.value);
    };

    // 서브페이지 이동 로직 (구현 실패ㅠ_ㅠ)
  
    // 5. 화면 줄이기
    useEffect(() => {
      const handleResize = () => {
        const width = window.innerWidth;
        if (width <= 743) {
          setButtonValue("+");
        } else {
          setButtonValue("+ 추가하기");
        }
      };
  
      window.addEventListener('resize', handleResize);
      handleResize();
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

  return (
    <div id={styles.wrap}>
        {/* 본문 바로가기 */}
        <div id={"skipNav"} className="hide">
          <a href="#">본문 바로가기</a>
        </div>

        {/* header */}
        <header id={styles.header}>
          <div className={styles.inner}>
          <h1>
              <img className={styles.headerLogo} src='/images/mainLogo.png' alt='메인로고' width={"151px"} height={"40px"} />
          </h1>
          </div>
        </header>

        {/* main */}
        <main id={styles.container} className={styles.main}>
          <section id={styles.content}>
            <div className={styles.todoSearchBox}>
              <input 
                type="text" 
                className={styles.search} 
                placeholder="할 일을 입력해주세요" 
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
              />
              <input 
                type="button" 
                className={styles.addBtn}
                value={buttonValue}
                onClick={addTodo}
              />
            </div>

            <div className={styles.tableWrap}>
              {/* todoTable */}
              <img className={styles.todoImg} src="/images/todo.png" alt="todo" />
              <ul className={styles.todoTable}>
                {/* 할 일 추가 li */}
                {Array.isArray(todos) && todos.map((todo, index) => (
                  <li key={`todo-${index}`} className={styles.checkList}>
                    <input type="checkbox" className={styles.checkRadio} onChange={() => checkTodo(index)} />
                    <Link href="/sub">
                      <label className={styles.checkBoxLabel}>
                        {todo}
                      </label>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* doneTable */}
              <img className={styles.doneImg} src="/images/done.png" alt="todo" />
              <ul className={styles.doneTable}>
              {/* 완료 목록 li */}
              {Array.isArray(dones) && dones.map((done, index) => (
                <li key={`done-${index}`} className={styles.checkList}>
                  <input type="checkbox" className={styles.checkRadio} checked onChange={() => doneTodo(index)} />
                  <Link href="/sub">
                    <label className={styles.checkBoxLabel}>
                      {done}
                    </label>
                  </Link>
                </li>
              ))}
              </ul>
            </div>
          </section>
        </main>
      </div>
  );
}

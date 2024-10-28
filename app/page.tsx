"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from "./styles/page.module.css";

export default function Home() {
    const [buttonValue, setButtonValue] = useState("+ 추가하기");
    const [todos, setTodos] = useState<string[]>([]); // 데이터타입 : String
    const [newTodo, setNewTodo] = useState("");
    const [tenantId] = useState("");

    // 1. 할 일 목록 GET
    

    // 2. 할 일 추가 POST
    const addTodo = () => {
      if (newTodo.trim()) {
        setTodos([...todos, newTodo]); // 문자열
        setNewTodo("");
      }
    };

    // 3. 할 일 입력 핸들러
    const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewTodo(e.target.value);
    };
  
    // 4. 화면 줄이기
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
                onChange={inputChange}
              />
              <input 
                type="button" 
                className={styles.addBtn}
                value={buttonValue}
                onClick={addTodo}
              />
            </div>

            <div className={styles.tableWrap}>
              <img className={styles.todoImg} src="/images/todo.png" alt="todo" />
              <ul className={styles.todoTable}>
                {/* 할 일 추가 li */}
                {todos.map((todo, index) => (
                  <li key={index} className={styles.checkList}>
                    <input type="checkbox" className={styles.checkRadio} />
                    <Link href="/sub">
                      <label className={styles.checkBoxLabel}>{todo}</label>
                    </Link>
                  </li>
                ))}

                <li className={styles.checkList}>
                  <input type="checkbox" className={styles.checkRadio} />
                  <Link href="/sub">
                    <label className={styles.checkBoxLabel}>비타민 챙겨먹기</label>
                  </Link>
                </li>

                <li className={styles.checkList}>
                  <input type="checkbox" className={styles.checkRadio} />
                  <Link href="/sub">
                    <label className={styles.checkBoxLabel}>맥주 마시기</label>
                  </Link>
                </li>

                <li className={styles.checkList}>
                  <input type="checkbox" className={styles.checkRadio} />
                  <Link href="/sub">
                    <label className={styles.checkBoxLabel}>운동하기</label>
                  </Link>
                </li>
              </ul>

              <img className={styles.doneImg} src="/images/done.png" alt="todo" />
              <ul className={styles.doneTable}>
                <li className={styles.checkList}>
                  <input type="checkbox" className={styles.checkRadio} checked />
                  <Link href="/sub">
                    <label className={styles.checkBoxLabel}>은행 다녀오기</label>
                  </Link>
                </li>

                <li className={styles.checkList}>
                  <input type="checkbox" className={styles.checkRadio} checked />
                  <Link href="/sub">
                    <label className={styles.checkBoxLabel}>비타민 먹기</label>
                  </Link>
                </li>
              </ul>
            </div>
          </section>
        </main>
      </div>
  );
}

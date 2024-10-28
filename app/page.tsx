"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from "./styles/page.module.css";

export default function Home() {
    const [buttonValue, setButtonValue] = useState("+ 추가하기");
    const [todos, setTodos] = useState([]);
    const [tenantId] = useState("");

    // 1. 할 일 목록
    useEffect(() => {
      const fetchTodos = async () => {
        const response = await fetch(`https://assignment-todolist-api.vercel.app/api/${tenantId}/items`);
          const data = await response.json();
          setTodos(data);
          console.log("data" + data);
      };
      fetchTodos();
    }, [tenantId]);

    // 2. 할 일 추가


    // 3. 할 일 입력 핸들러

  
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
              <input type="text" className={styles.search} placeholder="할 일을 입력해주세요" />
              <input type="button" className={styles.addBtn} value={buttonValue} />
            </div>

            <div className={styles.tableWrap}>
              <img className={styles.todoImg} src="/images/todo.png" alt="todo" />
              <ul className={styles.todoTable}>
                <Link href="/sub">
                  <li className={styles.checkList}>
                    <input type="checkbox" className={styles.checkRadio} />
                    <label className={styles.checkBoxLabel}>비타민 챙겨먹기</label>
                  </li>
                </Link>
                
                <Link href="/sub">
                  <li className={styles.checkList}>
                    <input type="checkbox" className={styles.checkRadio} />
                    <label className={styles.checkBoxLabel}>맥주 마시기</label>
                  </li>
                </Link>

                <Link href="/sub">
                  <li className={styles.checkList}>
                    <input type="checkbox" className={styles.checkRadio} />
                    <label className={styles.checkBoxLabel}>운동하기</label>
                  </li>
                </Link>
              </ul>

              <img className={styles.doneImg} src="/images/done.png" alt="todo" />
              <ul className={styles.doneTable}>
                <Link href="/sub">
                  <li className={styles.checkList}>
                    <input type="checkbox" className={styles.checkRadio} checked />
                    <label className={styles.checkBoxLabel}>은행 다녀오기</label>
                  </li>
                </Link>

                <Link href="/sub">
                  <li className={styles.checkList}>
                    <input type="checkbox" className={styles.checkRadio} checked />
                    <label className={styles.checkBoxLabel}>비타민 먹기</label>
                  </li>
                </Link>
              </ul>
            </div>
          </section>
        </main>
      </div>
  );
}

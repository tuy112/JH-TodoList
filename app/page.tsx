import styles from "./styles/page.module.css";

export default function Home() {
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
              <img src='/images/mainLogo.png' alt='메인로고' width={"151px"} height={"40px"} />
          </h1>
          </div>
      </header>

      {/* main */}
      <main id={styles.container} className={styles.main}>
        <section id={styles.content}>
          <div className={styles.todoSearchBox}>
            <input type="text" className={styles.search} placeholder="할 일을 입력해주세요" />
            <input type="button" className={styles.addBtn} value={"+ 추가하기"} />
          </div>

          <div className={styles.tableWrap}>
            <img className={styles.todoImg} src="/images/todo.png" alt="todo" />
            <ul className={styles.todoTable}>
              <li className={styles.checkList}>
                <input 
                    type="checkbox" 
                    className={styles.checkRadio}
                  />
                <label className={styles.checkBoxLabel}>
                  비타민 챙겨먹기
                </label>
              </li>
              <li className={styles.checkList}>
                <input 
                    type="checkbox" 
                    className={styles.checkRadio}
                  />
                <label className={styles.checkBoxLabel}>
                  맥주 마시기
                </label>
              </li>
              <li className={styles.checkList}>
                <input 
                    type="checkbox" 
                    className={styles.checkRadio}
                  />
                <label className={styles.checkBoxLabel}>
                  운동하기
                </label>
              </li>
            </ul>

            <img className={styles.doneImg} src="/images/done.png" alt="todo" />
            <ul className={styles.doneTable}>
              
              <li className={styles.checkList}>
                <input 
                    type="checkbox" 
                    className={styles.checkRadio}
                    checked
                  />
                <label className={styles.checkBoxLabel}>
                  은행 다녀오기
                </label>
              </li>
              <li className={styles.checkList}>
                <input 
                    type="checkbox" 
                    className={styles.checkRadio}
                    checked
                  />
                <label className={styles.checkBoxLabel}>
                  비타민 먹기
                </label>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

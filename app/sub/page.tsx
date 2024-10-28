import styles from "../styles/sub.module.css";

export default function SubPage() {
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
                <section className={styles.content}>
                    {/* checklist */}
                    <div className={styles.checkList}>
                        <div className={styles.checkListBox}>
                            <input type="checkbox" className={styles.checkRadio} />
                            <label className={styles.checkBoxLabel}>비타민 챙겨먹기</label>
                        </div>
                    </div>

                    {/* picture */}
                    <div className={styles.picture}>
                        <img className={styles.previewImg} src="/images/preview.png" alt="미리보기" />
                        <input type="button" className={styles.addPicBtn} value={"+"} />
                    </div>

                    {/* threeBox */}
                    <div className={styles.threeBox}>
                        <div className={styles.memo}>
                            <div className={styles.memoTxt}>
                                <h5>Memo</h5>
                            </div>
                            <input type="text" className={styles.memoArea} value={"오메가 3, 프로폴리스, 아연 챙겨먹기"}></input>
                        </div>
                        <div className={styles.submitBox}>
                            <input type="button" className={styles.submitBtn} value={"수정 완료"} />
                            <input type="button" className={styles.deleteBtn} value={"삭제하기"} />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
  }
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from "../styles/sub.module.css";

export default function SubPage() {
    const router = useRouter();
    const { itemId } = router.query;

    console.log(router)

  const [item, setItem] = useState({
    id: null,
    name: '',
    isCompleted: false,
    memo: '',
    imageUrl: ''
  });
  const [newName, setNewName] = useState(item.name);
  const [newMemo, setNewMemo] = useState(item.memo);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    if (itemId) {
      fetch(`/api/jstol/items/${itemId}`)
        .then(res => res.json())
        .then(data => {
          setItem(data);
          setNewName(data.name);
          setNewMemo(data.memo);
        });
    }
  }, [itemId]);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('name', newName);
    formData.append('memo', newMemo);
    if (newImage) {
      formData.append('image', newImage);
    }

    // 수정
    const response = await fetch(`/api/items/${itemId}`, {
      method: 'PUT',
      body: formData
    });

    if (response.ok) {
      router.push('/');
    } else {
      alert('수정 실패');
    }
  };

  // 삭제
  const handleDelete = async () => {
    const response = await fetch(`/api/items/${itemId}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      router.push('/');
    } else {
      alert('삭제 실패');
    }
  };

  // 이미지
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file.size <= 5 * 1024 * 1024 && /^[a-zA-Z0-9_-]+\.[a-zA-Z0-9]+$/.test(file.name)) {
        setNewImage(file);
      } else {
        alert('이미지 파일 크기는 5MB 이하여야 하며, 파일명은 영어로만 구성되어야 합니다.');
      }
    }
  };

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
              <label className={styles.checkBoxLabel}>{item.name}</label>
            </div>
          </div>

          {/* picture */}
          <div className={styles.picture}>
            <img 
              className={styles.previewImg} 
              src="/images/preview.png" 
              alt="미리보기" 
            />
            <input 
              type="file" 
              accept="image/*"
              className={styles.addPicBtn} 
              value={"+"} 
              onChange={handleImageChange}
            />
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
              <button onClick={handleSubmit} className={styles.submitBtn}>수정 완료</button>
              <button onClick={handleDelete} className={styles.deleteBtn}>삭제하기</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
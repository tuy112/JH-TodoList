// // import { useEffect, useState } from 'react';
// // import { useRouter } from 'next/router';
// import styles from "../styles/sub.module.css";

// function SubPage() {
//     const router = useRouter();
//     const { id } = router.query;

//     return (
//         <div id={styles.wrap}>
//             <div id={"skipNav"} className="hide">
//                 <a href="#">본문 바로가기</a>
//             </div>

//             {/* header */}
//             <header id={styles.header}>
//                 <div className={styles.inner}>
//                     <h1>
//                         <img className={styles.headerLogo} src='/images/mainLogo.png' alt='메인로고' width={"151px"} height={"40px"} />
//                     </h1>
//                 </div>
//             </header>
            
//             <p>선택한 항목의 ID: {id}</p>
//             {id === "1" && <p>비타민 챙겨먹기 관련 정보</p>}
//             {id === "2" && <p>맥주 마시기 관련 정보</p>}
//             {id === "3" && <p>운동하기 관련 정보</p>}
        
//         </div>
//     );
// };

// export default SubPage;
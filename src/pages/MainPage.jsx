import React from 'react'
import styles from '../styles/MainPage.module.css'
import spaceLogo from '../assets/space_background.png'

const MainPage = () => {
  return (
    <div className={styles.main}>
      <div className={styles.background}>
          <div className={styles.text}><p>ბლოგი</p></div>
          <div className={styles.backgroundImg}><img src={spaceLogo} alt="" /></div>
      </div>
      <p>other staff</p>
    </div>
  )
}

export default MainPage
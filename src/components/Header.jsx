import React from 'react'
import styles from '../styles/Header.module.css'
import logo from '../assets/LOGO.png'

const Header = () => {
  return (
    <div className={styles.Header}>
      <div className={styles.HeaderContent}>
        <div className={styles.logo}>
          <img src={logo} alt="here was logo" />
        </div>
        <div className={styles.login}>
            შესვლა
        </div>
      </div>
    </div>
  )
}

export default Header
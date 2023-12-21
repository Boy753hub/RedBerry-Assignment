import React, { useState } from 'react'
import styles from '../styles/Header.module.css'
import logo from '../assets/LOGO.png'
import Modal from './Modal'

const Header = () => {
  const [open, setOpen] = useState(false)
  const [login, setLogin] = useState('')

  const openModal = () => {
    setOpen(last => last = !last)
    setLogin('login')
  }

  return (
    <div className={styles.Header}>
      <div className={styles.HeaderContent}>
        <div className={styles.logo}>
          <img src={logo} alt="here was logo" />
        </div>
        <div className={styles.login} onClick={openModal}>
            შესვლა
        </div>
      </div>
        {open ? <Modal value={login} setOpen={setOpen} /> : " "}
    </div>
  )
}

export default Header
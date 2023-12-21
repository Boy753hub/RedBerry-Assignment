import React, { useState } from 'react'
import styles from '../styles/Modal.module.css'
import x from '../assets/X.png'
import info_circle from '../assets/info-circle.png'
const Modal = ({ value, setOpen }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const closeModal = () => {
    setOpen((last) => !last);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const onLogin = (e) => {
    e.preventDefault();

    if (email.endsWith('@redberry.ge')) {
      // Perform login logic
      console.log('Login successful');
    } else {
      setError('მეილი უნდა მთავრდებოდეს @redberry.ge–ით');
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError(''); // Clear the error when the user types
  };

  return (
    <div className={styles.modalBackground} onClick={closeModal}>
      <div className={styles.modalContent} onClick={stopPropagation}>
        <img src={x} alt="x" className={styles.x} onClick={closeModal} />
        {value === 'login' ? (
          <div className={styles.login}>
            <h1>შესვლა</h1>
            <p>ელ–ფოსტა</p>
            <form onSubmit={onLogin}>
              <input
                type="email"
                placeholder="Example@redberry.ge"
                value={email}
                onChange={handleChange}
                className={error ? styles.errorInput : ''}
              />
              {error && <div className={styles.info}> <img src={info_circle} alt="!"  /><p className={styles.error}> {error}</p></div>}
              <button type="submit">შესვლა</button>
            </form>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Modal;
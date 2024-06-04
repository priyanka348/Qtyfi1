import React from 'react'
import styles from './Buttons.module.css';

const Buttons = ({ text, handleOpen }) => (
  <button className={styles.btn} onClick={handleOpen}>
    {text}
  </button>
);

export default Buttons;

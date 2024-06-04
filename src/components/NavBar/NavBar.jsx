
import React from 'react';
import Logo from '../Logo/Logo';
import Search1 from '../SearchBar/Search1';
import { Link } from 'react-router-dom';
import Modals from '../Modals/Modals';
import styles from './NavBar.module.css';

const NavBar = ({ data }) => {
  return (
    <>
      <nav className={styles.navbar}>
        <Link to="/">
          <Logo />
        </Link>
        {/* <SearchBar data={data} className=searchbar" /> */}
        <Search1 data={data} className="searchbar" />

        <Modals title={'Give Feedback'} />
      </nav>
      {/* <SearchBar className="searchbar-moblie" /> */}
      <Search1 data={data} className="searchbar-moblie" />
    </>
  );
};

export default NavBar;


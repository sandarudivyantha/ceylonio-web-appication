import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import navbar_logo from '../../assets/ceylonio-logo.png';
import './Navbar.css';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);
  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <img src={navbar_logo} alt="app__logo" />
      </div>
      <ul className="app__navbar-links">
        <li className="p__opensans"><a href="#home">HOME</a></li>
        <li className="p__opensans"><a href="#about">DINING</a></li>
        <li className="p__opensans"><a href="#menu">PROMOTIONS</a></li>
        <li className="p__opensans"><a href="#contact">CONTACT</a></li>
      </ul>
      <div className="app__navbar-login">
        <a href="#login" className="p__opensans">Log In / Sign Up</a>
        <div />
        <a href="/" className="p__opensans">Book Table</a>
      </div>
      
      <div className="app__navbar-smallscreen">
        <GiHamburgerMenu color="#fff" fontSize={27} onClick={() => setToggleMenu(true)} />
        {toggleMenu && (
          <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
            <MdOutlineRestaurantMenu fontSize={27} className="overlay__close" onClick={() => setToggleMenu(false)} />
            <ul className="app__navbar-smallscreen_links">
              <li><a href="#home" onClick={() => setToggleMenu(false)}>HOME</a></li>
              <li><a href="#about" onClick={() => setToggleMenu(false)}>DINING</a></li>
              <li><a href="#menu" onClick={() => setToggleMenu(false)}>PROMOTIONS</a></li>
              <li><a href="#contact" onClick={() => setToggleMenu(false)}>CONTACT</a></li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
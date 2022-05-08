import React from 'react'
import { Link } from 'react-router-dom';
import './NavBar.scss';
import logo from '../../assets/logo.png';
const NavBar = () => {
  return (
    <div className="NavBar">
      <h1>La Boite à idées, JS Paris Mars 2022</h1>
      <div className='NavBarContainer'>
        <img src={logo} className='NavBarLogo' alt="logo" />
        <ul className='NavBarMenu'>
          <li className='NavBarMenuItem'><Link to='/' className='NavBarLink'>Accueil</Link></li>
          <li className='NavBarMenuItem'><Link to='/panier' className='NavBarLink'>Panier</Link></li>
          <li className='NavBarMenuItem'><Link to='/parametres' className='NavBarLink'>Paramètres</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default NavBar
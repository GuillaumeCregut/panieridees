import React from 'react'
import { NavLink } from 'react-router-dom';
import './NavBar.scss';
import logo from '../../assets/logo.png';
const NavBar = () => {
  return (
    <div className="NavBar">
      <h1>La Boite à idées, JS Paris Mars 2022</h1>
      <div className='NavBarContainer'>
        <img src={logo} className='NavBarLogo' alt="logo" />
        <ul className='NavBarMenu'>
          <li className='NavBarMenuItem'><NavLink to='/' className={({isActive})=>isActive?'NavBarLink activeLink':'NavBarLink'}>Accueil</NavLink></li>
          <li className='NavBarMenuItem'><NavLink to='/panier' className={({isActive})=>isActive?'NavBarLink activeLink':'NavBarLink'}>Boite</NavLink></li>
          <li className='NavBarMenuItem'><NavLink to='/parametres' className={({isActive})=>isActive?'NavBarLink activeLink':'NavBarLink'}>Paramètres</NavLink></li>
        </ul>
      </div>
    </div>
  )
}

export default NavBar
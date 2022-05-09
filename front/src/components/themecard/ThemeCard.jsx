import React from 'react';
import './ThemeCard.scss';

const ThemeCard = ({id, color, name}) => {
  return (
    <div className='ThemeCard'>
        <p>Nom : {name}</p>
        <p>Couleur : {color}</p>
    </div>
  )
}

export default ThemeCard
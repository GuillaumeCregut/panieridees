import React from 'react'
import './IdeaCard.scss';

const IdeaCard = ({id,color,theme,name,createdAt,drag}) => {
    const date=new Date(createdAt).toLocaleString('fr-FR');
    
    return (
        <div id={id} className='IdeaCard' style={{backgroundColor:color}} draggable="true" onDragStart={(e) => drag(e)}>
           <p>Sujet : {name}</p> 
           <p>Thème : {theme}</p>
           <p>Date de création : {date}</p>
        </div>
    )
}

export default IdeaCard

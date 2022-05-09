import React from 'react'
import './IdeaCard.scss';

const IdeaCard = ({id,color,theme,name,createdAt,drag, updateIdea}) => {
    const date=new Date(createdAt).toLocaleString('fr-FR');

    const HandleUpdate=()=>{
        updateIdea(id);
    }

    return (
        <div id={id} className='IdeaCard' style={{backgroundColor:color}} draggable="true" onDragStart={(e) => drag(e)}>
           <p>Sujet : {name}</p> 
           <p>Thème : {theme}</p>
           <p>Date de création : {date}</p>
           <div className="hiddenBtn">
               <button onClick={HandleUpdate}>Traitée</button>
           </div>
        </div>
    )
}

export default IdeaCard

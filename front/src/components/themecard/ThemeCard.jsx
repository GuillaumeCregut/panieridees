import React,{useState} from 'react';
import './ThemeCard.scss';

const ThemeCard = ({id, color, name, reload, setReload}) => {

    const [newColor,setNewColor]=useState(color);
    const idCard=id+'Container';
    const idColor=id+'Color';
    const idBtn=id+'Btn';
    let inEdit = false;
    const handleValidClick=async ()=>{
        const newName=document.getElementById(id).innerHTML;
        const updatedTheme={
            name : newName,
            color:newColor
        };
    
        setReload(!reload)
        resetCard();
    }

    const resetCard=()=>{
        const EditableName=document.getElementById(id);
        EditableName.contentEditable=false;
        const card=document.getElementById(idCard);
        card.classList.remove('BackgroundChange');
        const btn=document.getElementById(idBtn);
        btn.classList.add('UnvisibleBtn');
        btn.classList.remove('visibleBtn');
        const colorPicker=document.getElementById(idColor);
        colorPicker.disabled=true;
        inEdit=false;
    }

    const handleChangeClick=()=>{
        if(inEdit){
            return -1;
        }
        inEdit=true;    
        const EditableName=document.getElementById(id);
        EditableName.contentEditable=true;
        const card=document.getElementById(idCard);
        card.classList.add('BackgroundChange');
        const btn=document.getElementById(idBtn);
        btn.classList.remove('UnvisibleBtn');
        btn.classList.add('visibleBtn');
        const colorPicker=document.getElementById(idColor);
        colorPicker.disabled=false;
    }
    
  return (
    <div className='ThemeCard' id={idCard}>
        <div  onClick={handleChangeClick} >
        <p>Nom : <span className="NameEdit" id={id}>{name}</span></p>
        <label htmlFor={idColor}>Couleur : 
            <input
                type="color"
                id={idColor}
                value={newColor}
                onChange={e=>setNewColor(e.target.value)}
                disabled
                />
        </label>
        </div>
        <p className="EditBtn UnvisibleBtn" id={idBtn}>
            <button onClick={handleValidClick}>Valider</button>
            <button onClick={resetCard}>Annuler</button>
        </p>
    </div>
  )
}

export default ThemeCard
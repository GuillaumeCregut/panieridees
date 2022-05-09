import axios from 'axios';
import React,{useState} from 'react';
import './ThemeCard.scss';

const ThemeCard = ({id, color, name, reload, setReload}) => {
    const [newColor,setNewColor]=useState(color);
    const idCard=id+'Container';
    const idColor=id+'Color';
    const idBtn=id+'Btn';
    const idCross=id+'Cross';
    let inEdit = false;

    const handleValidClick=async ()=>{
        const newName=document.getElementById(id).innerHTML;
        const updatedTheme={
            name : newName,
            color:newColor
        };
        const url=`${process.env.REACT_APP_API_URL}themes/${id}`;
        await axios
            .put(url,updatedTheme)
            .then((result)=>{
                if(result.status===204){
                    setReload(!reload)
                    resetCard();
                }
            })
            .catch((err)=>{
                console.log(err);
            })
    }

    const handleDelete=async ()=>{
        if(window.confirm('Voulez-vous supprimer ?')){
            const url=`${process.env.REACT_APP_API_URL}themes/${id}`;
            await axios
                .delete(url)
                .then((result)=>{
                    if(result.status===204){
                        setReload(!reload)
                        resetCard();
                    }
                })
                .catch((err)=>{
                    console.log(err);
                })
        }
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
        const cross=document.getElementById(idCross);
        cross.classList.remove('visibleCross');
        cross.classList.add('UnvisibleBtn');
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
        const cross=document.getElementById(idCross);
        cross.classList.add('visibleCross');
        cross.classList.remove('UnvisibleBtn')
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
                className="InputColor"
                disabled
                />
        </label>
        <div className="deleteTheme UnvisibleBtn" id={idCross} onClick={handleDelete}>X</div>
        </div>
        <p className="EditBtn UnvisibleBtn" id={idBtn}>
            <button onClick={handleValidClick}>Valider</button>
            <button onClick={resetCard}>Annuler</button>
        </p>
    </div>
  )
}

export default ThemeCard
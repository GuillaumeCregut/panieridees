import React, {useEffect, useState} from 'react';
import axios from 'axios';

import './PostIt.scss';

const PostIt = ({setSelectedTheme,selectedTheme, textIdea,setTextIdea}) => {
    const [themeList, setThemeList]=useState([]);

    useEffect(()=>{
        const getTheme= async ()=>{
            const url=`${process.env.REACT_APP_API_URL}themes`;
            await axios
                .get(url)
                .then((result)=>{
                    if(result.status===200){
                        setThemeList(result.data)
                    }
                })
                .catch((err)=>{
                    console.log(err);
                    if(err.code==='ERR_NETWORK'){
                        alert(`L'API est hébergée par Heroku, il faut attendre 15 sec pour son démarrage. Veuillez réessayer dans 15 sec.`)
                      }
                })
        }
        getTheme();
    },[]);

    return (
    <div className='PostIt'>
        <h3>Notez votre idée</h3>
        <label htmlFor="themeSelect">Thématique souhaitée :
            <select id='themeSelect' value={selectedTheme} onChange={(e)=>setSelectedTheme(e.target.value)}>
            <option value=''>--</option>
            {themeList.map((theme)=>{
                return(
                    <option
                         value={theme._id}
                         key={theme._id}> {theme.name} </option>
                )
            })}
            </select><br />
        </label>
        <label htmlFor="ideaText">Votre sujet :
            <textarea  className="ideaText" id="ideaText" cols="30" rows="5" value={textIdea} onChange={(e)=>setTextIdea(e.target.value)}></textarea>
        </label>
    </div>
  )
}

export default PostIt
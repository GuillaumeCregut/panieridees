import React, {useEffect, useState} from 'react';
import axios from 'axios';

import './PostIt.scss';

const PostIt = ({setSelectedTheme,selectedTheme, textIdea,setTextIdea}) => {
    const [themeList, setThemeList]=useState([]);

    useEffect(()=>{
        const getTheme= async ()=>{
            const url=`${process.env.REACT_APP_API_URL}themes`;
            console.log(url);
            await axios
                .get(url)
                .then((result)=>{
                    if(result.status===200){
                        console.log(result.data);
                        setThemeList(result.data)
                    }
                })
                .catch((err)=>{
                    console.log(err);
                })
        }
        getTheme();
    },[]);

    return (
    <div className='PostIt'>
        <label htmlFor="themeSelect">Thématique souhaitée :
            <select id='themeSelect' value={selectedTheme} onChange={(e)=>setSelectedTheme(e.target.value)}>
            {themeList.map((theme)=>{
                return(
                    <option value={theme._id}> {theme.name} </option>
                )
            })}
            </select>
        </label>
        <label htmlFor="ideaText">Votre sujet :
            <textarea  id="ideaText" cols="30" rows="10" value={textIdea} onChange={(e)=>setTextIdea(e.target.value)}></textarea>
        </label>
    </div>
  )
}

export default PostIt
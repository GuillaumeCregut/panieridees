import axios from 'axios';
import React,{useEffect,useState} from 'react';
import trash from '../../assets/trash.png';
import './Trash.scss';

const Trash = () => {
    const [inTrash, setInTrash]=useState([]);

    useEffect(()=>{
        const getIdeas = async () => {
            const url = `${process.env.REACT_APP_API_URL}ideas/done/`;
            await axios
                .get(url)
                .then((result)=>{
                    setInTrash(result.data);
                })
                .catch((err)=>{
                    console.log(err);
                })
        }
        getIdeas();
    },[]);

  return (
    <div className='Trash'>
        <div className="NumberInTrash">{inTrash.length}</div>
         <img src={trash} alt="dustbin" className='ImgDustbin'/>
    </div>
  )
}

export default Trash
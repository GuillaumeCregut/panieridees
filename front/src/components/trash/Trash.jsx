import axios from 'axios';
import React,{useEffect,useState} from 'react';
import trash from '../../assets/trash.png';
import './Trash.scss';

const Trash = ({reload,setReload}) => {
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
    },[reload]);

    const handleEmptyTrash=async ()=>{
        if(window.confirm('Voulez vous supprimer les idées de la poubelle ? Cette action est irréversible')){
            const url = `${process.env.REACT_APP_API_URL}ideas/processed/`;
            await axios
                .delete(url)
                .then((result)=>{
                    if(result.status===200){
                        const deleted=result.data.deleted.deletedCount;
                        alert(`${deleted} idées ont été supprimées`);
                        setReload(!reload);
                    }
                })
                .catch((err)=>{
                    console.log(err);
                })
        }
    }

  return (
    <div className='Trash'>
        <div className="NumberInTrash">{inTrash.length}</div>
         <img
            src={trash}
            alt="dustbin"
            className='ImgDustbin'
            onClick={handleEmptyTrash}
            />
    </div>
  )
}

export default Trash
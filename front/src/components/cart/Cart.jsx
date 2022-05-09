import axios from 'axios';
import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import cartsvg from "../../assets/cart.svg";
import './Cart.scss';

const Cart = ({refresh}) => {
  const [ideas,setIdeas]=useState([]);
  let navigate=useNavigate();

  const handleCartClick=()=>{
    navigate('/panier');
  }
  
  useEffect(()=>{
    const getUnprocessed=async()=>{
      const url=`${process.env.REACT_APP_API_URL}ideas/notprocessed/`;
      await axios
        .get(url)
        .then((result)=>{
            if(result.status===200){
              setIdeas(result.data);
            }
        })
        .catch((err)=>{
          console.log(err);
        })
    }
    getUnprocessed();
  },[refresh]);

  return (
    <div className='Cart'>
        <p><img src={cartsvg} alt="" className='HomeCartIdea' onClick={handleCartClick}/> </p>
        <div className="number">{ideas.length}</div>
    </div>
  )
}

export default Cart
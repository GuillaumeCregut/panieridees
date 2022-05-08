import React,{useState,useEffect} from 'react'
import cartsvg from "../../assets/cart.svg";
import './Cart.scss';

const Cart = () => {
  const [ideas,setIdeas]=useState([]);

  return (
    <div className='Cart'>
        <p><img src={cartsvg} alt="" className='HomeCartIdea'/> </p>
    </div>
  )
}

export default Cart
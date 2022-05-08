import React from 'react'
import cartsvg from "../../assets/cart.svg";
import './Cart.scss';

const Cart = () => {
  return (
    <div className='Cart'>
        <p><img src={cartsvg} alt="" className='HomeCartIdea'/> </p>
    </div>
  )
}

export default Cart
import React from 'react';
import Carts from '../../components/customer/cart';

function CartPage(props) {
    return (
        <div className = "container">
          <Carts buy= {false}></Carts>
        </div>
    )
}

export default CartPage;

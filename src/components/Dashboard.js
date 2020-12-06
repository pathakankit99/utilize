import React from 'react'
import "../styles/Dashboard.css"

import { useSelector} from 'react-redux';
import {
  selectOrders
} from '../features/data/dataSlice';

import OrderCard from "./OrderCard"
import MyDetails from "./MyDetails"

function Dashboard() {
    const orders = useSelector(selectOrders);
    return (
        <div className="Dashboard">
            <div className="MyDetails">
                <MyDetails/>
            </div>
            <div className="Data">
                <h5>Orders</h5>
            {
               orders.length===0?(
                   <div className="loader"></div>                
               ):(
                orders.map(({id, customer_name, customer_email, product, quantity})=>(
                    <OrderCard 
                    id={id} 
                    customer_name={customer_name}
                    customer_email={customer_email}
                    product={product}
                    quantity={quantity}
                    key={id}/>
                ))
                )
            }
            </div>               
        </div>
    )
}

export default Dashboard

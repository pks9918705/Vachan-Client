import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
// import { userRequest } from '../requestMethods'
const BASE_URL = "https://vachan-server.onrender.com/api/";

 
const singleOrder = {
    border: "1px solid red",
    marginTop: "10px",
    position: "absolute",
    left: "0px",
    height: "auto",
    minHeight: "100vh",
    paddingBottom: "20px",
    top: "0px",
    backgroundColor: "white",
    borderRadiusTopRight: "10px",
    zIndex: "200",
    borderTopRightRadius: "20px",
    paddingTop: "5px",
    paddingRight: "5px",

}
const nav = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "2px 5px"
}

const PrevOrders = ({ close }) => {
    const [orders, setOrders] = useState([]);
    const token = `Bearer ${localStorage.getItem('token')}`;

    const { data, isLoading, isError } = useQuery(
        ['prevOrders'],
        getOrders,
        {
            staleTime: 12000,
        }
    );

    async function getOrders() {
        try {
            const res = await axios.get(`${BASE_URL}users/prevOrders`, {
                headers: { token }
            });
            console.log('res.data', res.data);
            return res.data;
        } catch (error) {
            console.error('Error fetching previous orders:', error);
            throw new Error('Error fetching previous orders');
        }
    }


    useEffect(() => {
        if (!isLoading && !isError) {
            // Create a new array with sorted orders by createdAt date
            console.log('before', data);

            const sortedOrders = [...data].sort((a, b) =>
                new Date(a.createdAt) - new Date(b.createdAt)
            );

            setOrders(sortedOrders);
            console.log("after", sortedOrders);
           
            
        }
    }, [isLoading, isError, data]);


    // Function to format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        // Customize the date format as needed
        return date.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZoneName: 'short',
        });
    };

    return (
        <div style={singleOrder}>
            <div style={nav}>
                <h3 style={{ color: 'red' }}>Previous Orders</h3>
                {isLoading && <p>Loading...</p>}
                {isError && <p>Error fetching orders.</p>}
                {data && <p>{data.length}</p>}
                <button onClick={close}>Close</button>
            </div>
            <ul>
                {orders?.map((order, i) => (
                    <li key={i}>
                        <p>Amount: {order.amount}</p>
                        <p>Date: {formatDate(order.createdAt)}</p>
                        <p>Order No: {order.orderNo}</p>
                        <p>Payment Status: {order.payment_status}</p>
                        <p>Delivery Status: {order.delivery_status}</p>
                        <p>Ref No: {order.razorpayId}</p>
                        <p style={{ fontWeight: 'bold' }}>ORDER ITEMS</p>
                        <ul>
                            {order.products?.map((product, index) => (
                                <li key={index}>
                                    <h5> {product.title}</h5>
                                    <p>Price: {product.price}</p>
                                    <p>Quantity: {product.quantity}</p>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PrevOrders;



//   Yes, that's correct! By using optional chaining (?.), you're ensuring that the map() function is only called if orders and order.products are not null or undefined. This helps prevent errors in case orders or order.products is null or undefined, improving the robustness of your code.
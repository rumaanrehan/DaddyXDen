// src/components/AdminOrders.js
import React, { useState, useEffect, useContext } from 'react';
// import './ListProduct/ListProduct.css'
const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/order/getallorders', {
          headers: {
            "auth-token": localStorage.getItem('token'), // Assuming you use JWT for authentication
          },
        });
        const data = await response.json();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await fetch(`http://localhost:4000/api/order/update/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify({ status }),
      });
      const updatedOrder = await response.json();
      setOrders(orders.map(order => (order._id === orderId ? updatedOrder : order)));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await fetch(`http://localhost:4000/api/order/delete/${orderId}`, {
        method: 'DELETE',
        headers: {
          'auth-token': localStorage.getItem('token'),
        },
      });
      setOrders(orders.filter(order => order._id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex-col w-full py-4 bg-white mt-6 mx-3 rounded-md'>
      <h1 className='text-2xl text-center font-semibold'>Orders</h1>
     <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 mt-6 mx-3 rounded-md">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-2 px-4 text-left text-gray-700 font-semibold">Order ID</th>
            <th className="py-2 px-4 text-left text-gray-700 font-semibold">Customer</th>
            <th className="py-2 px-4 text-left text-gray-700 font-semibold">Date</th>
            <th className="py-2 px-4 text-left text-gray-700 font-semibold">Items</th>
            <th className="py-2 px-4 text-left text-gray-700 font-semibold">Total Amount</th>
            <th className="py-2 px-4 text-left text-gray-700 font-semibold">Status</th>
            <th className="py-2 px-4 text-left text-gray-700 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody> 
            {orders.map(order => (
         <tr key={order._id} className="border-b border-gray-200">
            <td className="py-2 px-4">order_id</td>
            <td className="py-2 px-4">
                <ul>{order.userId._id}</ul>
                <ul>{order.userId.name}</ul>
            </td>
            <td className="py-2 px-4">2024-06-27</td>
            <td className="py-2 px-4">
                <ul>
                  {order.items.map(item => (
                    <li key={item.productId}>
                      {item.productId.name} - Quantity: {item.quantity}
                    </li>
                  ))}
                </ul>
            </td>
            <td className="py-2 px-4">{order.totalAmount}</td>
            <td className="py-2 px-4">{order.status}</td>
            <td className="py-2 px-4 space-y-1 flex flex-col">
                <span className='flex text-nowrap flex-row space-x-2'>
                  <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded'  onClick={() => updateOrderStatus(order._id, 'Shipped')}>Mark as Shipped</button>
                  <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded' onClick={() => updateOrderStatus(order._id, 'Delivered')}>Mark as Delivered</button>
                </span>
                <span>
                <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded' onClick={() => deleteOrder(order._id)}>Delete</button>
                </span>
             </td>
          </tr>
 ))}
        </tbody>
      </table>
    </div>    
    </div>
  );
};

export default AdminOrders;

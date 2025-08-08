import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([])
  const { currency, axios, user } = useAppContext()

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get('/api/order/user')
      if (data.success) {
        setMyOrders(data.orders)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (user) {
      fetchMyOrders()
    }
  }, [user])

  return (
    <div className="mt-20 px-6 md:px-16 lg:px-24 xl:px-32 pb-16 min-h-screen bg-gray-50">
      <div className="flex flex-col items-start mb-10">
        <h2 className="text-3xl font-bold text-gray-800 uppercase tracking-wide">My Orders</h2>
        <div className="w-16 h-1 mt-2 bg-primary rounded-full" />
      </div>

      {myOrders.length === 0 ? (
        <p className="text-gray-500 text-center mt-20">You haven’t placed any orders yet.</p>
      ) : (
        myOrders.map((order, index) => (
          <div
            key={index}
            className="mb-10 border border-gray-200 rounded-2xl bg-white shadow-md p-6 max-w-4xl"
          >
            <div className="text-sm text-gray-500 mb-4 flex flex-col md:flex-row justify-between gap-2">
              <span><strong>Order ID:</strong> {order._id}</span>
              <span><strong>Payment:</strong> {order.paymentType}</span>
              <span><strong>Total:</strong> {currency}{order.amount}</span>
            </div>

            {order.items.map((item, idx) => (
              <div
                key={idx}
                className={`flex flex-col md:flex-row md:items-center justify-between gap-6 border-t py-4 ${
                  idx === 0 ? "border-none pt-0" : "border-gray-100"
                }`}
              >
                {/* Product Info */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center p-2">
                    <img src={item.product.image[0]} alt={item.product.name} className="object-cover h-full" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.product.name}</h3>
                    <p className="text-sm text-gray-500">Category: {item.product.category}</p>
                  </div>
                </div>

                {/* Order Info */}
                <div className="flex flex-col gap-1 text-sm text-gray-600 text-left md:text-right">
                  <p>Quantity: <strong>{item.quantity || 1}</strong></p>
                  <p>Status: <span className="capitalize">{order.status}</span></p>
                  <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>

                {/* Amount */}
                <div className="text-primary font-semibold text-lg min-w-fit">
                  {currency}
                  {item.product.offerPrice * item.quantity}
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  )
}

export default MyOrders


// src/components/order/OrderHistory.tsx
import React, { useEffect, useState } from "react";
import { getUserOrders, Order } from "../../services/orderService";
import { auth } from "../../firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const data = await getUserOrders(user.uid);
          setOrders(data);
        } catch (err) {
          console.error("Error fetching orders:", err);
          setError("Failed to load orders. Please try again later.");
        }
      }
      setLoading(false); // ✅ always run, whether user exists or not
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading orders...</div>;

  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  if (orders.length === 0)
    return <div className="text-center mt-10">No orders found.</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Order History</h2>
      <ul className="space-y-4">
        {orders.map((order) => (
          <li key={order.id} className="p-4 border rounded shadow-md">
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            <p><strong>Total:</strong> ${order.totalPrice.toFixed(2)}</p>
            <Link to={`/orders/${order.id}`} className="text-blue-500 underline">
              View Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;

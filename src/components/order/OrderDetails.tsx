// src/components/order/OrderDetails.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderById, Order } from "../../services/orderService";

const OrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (id) {
      getOrderById(id).then(setOrder);
    }
  }, [id]);

  if (!order) return <div className="text-center mt-10">Loading order details...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Order Details</h2>
      <p><strong>Order ID:</strong> {order.id}</p>
      <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
      <p><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>

      <h3 className="text-xl font-semibold mt-6 mb-2">Products</h3>
      <ul className="list-disc list-inside">
        {order.products.map((product, index) => (
          <li key={index}>
            {product.name} (x{product.quantity}) - ${product.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;

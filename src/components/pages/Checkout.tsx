// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { RootState } from "../../components/store/store";
// import { toast } from "react-toastify";

// const Checkout: React.FC = () => {
//     const token = useSelector((state: RootState) => state.auth.token);
//     const navigate = useNavigate();
//     const [paymentMethod, setPaymentMethod] = useState<string>("");
//     const [isProcessing, setIsProcessing] = useState<boolean>(false);

//     useEffect(() => {
//         if (!token) {
//             toast.warn("You need to log in to access checkout!", { autoClose: 3000 });
//             navigate('/auth');
//         }
//     }, [token, navigate]);

//     const handlePayment = () => {
//         if (!paymentMethod) {
//             toast.error("Please select a payment method!");
//             return;
//         }

//         setIsProcessing(true);
//         setTimeout(() => {
//             toast.success("Payment successful! Your order has been placed.");
//             setIsProcessing(false);
//             navigate('/'); // Redirect to homepage after successful payment
//         }, 3000);
//     };

//     return token ? (
//         <div className="checkout-container">
//             <h2>Checkout</h2>
//             <div className="payment-options">
//                 <label>
//                     <input 
//                         type="radio" 
//                         name="payment" 
//                         value="paypal" 
//                         onChange={(e) => setPaymentMethod(e.target.value)} 
//                     />
//                     PayPal
//                 </label>
//                 <label>
//                     <input 
//                         type="radio" 
//                         name="payment" 
//                         value="credit-card" 
//                         onChange={(e) => setPaymentMethod(e.target.value)} 
//                     />
//                     Credit Card
//                 </label>
//             </div>
//             <button onClick={handlePayment} disabled={isProcessing}>
//                 {isProcessing ? "Processing..." : "Confirm Payment"}
//             </button>
//         </div>
//     ) : null;
// };

// export default Checkout;


// src/pages/Checkout.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RootState } from "../../components/store/store";
import { addOrder } from "../../services/orderService";
import { auth } from "../../firebase.config";

const Checkout: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const cart = useSelector((state: RootState) => state.cart);
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // ✅ Compute total based on Redux cart
  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  useEffect(() => {
    if (!token) {
      toast.warn("You need to log in to access checkout!", { autoClose: 3000 });
      navigate("/auth");
    }
  }, [token, navigate]);

  // ✅ Handle payment and send order to Firestore
  const handlePayment = async () => {
    if (!paymentMethod) {
      toast.error("Please select a payment method!");
      return;
    }

    setIsProcessing(true);

    const currentUser = auth.currentUser;
    if (!currentUser) {
      toast.error("You must be logged in to place an order.");
      setIsProcessing(false);
      return;
    }

    const firestoreOrder = {
      userId: currentUser.uid,
      products: cart,
      totalPrice: total,
      createdAt: "", // Firestore auto-generates this if needed
    };

    try {
      const orderId = await addOrder(firestoreOrder);
      toast.success(`Payment successful! Order ID: ${orderId}`);
      setIsProcessing(false);
      navigate("/orders");
    } catch (err) {
      console.error(err);
      toast.error("Error processing order.");
      setIsProcessing(false);
    }
  };

  return token ? (
    <div className="checkout-container">
      <h2>Checkout</h2>

      {/* ✅ Real Order Summary */}
      <div className="order-summary">
        <h3>Order Summary</h3>
        <ul>
          {cart.map((item) => (
            <li key={item.key}>
              {item.name} - {item.quantity} × ${item.price.toFixed(2)}
            </li>
          ))}
        </ul>
        <p><strong>Total: ${total.toFixed(2)}</strong></p>
      </div>

      {/* ✅ Payment Options */}
      <div className="payment-options">
        <label>
          <input
            type="radio"
            name="payment"
            value="paypal"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          PayPal
        </label>
        <label>
          <input
            type="radio"
            name="payment"
            value="credit-card"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Credit Card
        </label>
      </div>

      <button onClick={handlePayment} disabled={isProcessing}>
        {isProcessing ? "Processing..." : "Confirm Payment"}
      </button>
    </div>
  ) : null;
};

export default Checkout;

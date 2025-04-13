// src/services/orderService.ts
import { db } from "../firebase.config";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  Timestamp
} from "firebase/firestore";

// ✅ Order Interface
export interface Order {
  id?: string;
  userId: string;
  products: Array<{
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  totalPrice: number;
  createdAt: string; // ISO string or formatted timestamp
}

// ✅ Add Order
export const addOrder = async (order: Omit<Order, "id">) => {
  const docRef = await addDoc(collection(db, "orders"), {
    ...order,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
};

// ✅ Fetch User Orders
export const getUserOrders = async (userId: string): Promise<Order[]> => {
  const q = query(collection(db, "orders"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      ...(data as Order),
      createdAt: data.createdAt.toDate().toISOString(),
    };
  });
};

// ✅ Fetch Specific Order by ID
export const getOrderById = async (orderId: string): Promise<Order | null> => {
  const docRef = doc(db, "orders", orderId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      ...(data as Order),
      createdAt: data.createdAt.toDate().toISOString(),
    };
  } else {
    return null;
  }
};

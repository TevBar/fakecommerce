# 🛒 React E-Commerce Website

An interactive, modern e-commerce platform built with **React**, **Redux**, **React-Bootstrap**, and **Firebase**.

## 🚀 Live Demo
[Live Site URL](https://your-deployed-site.com)

---

## 📦 Features

- 🛍️ Product Catalog with categories
- ➕ Add to Cart functionality
- 📦 Stock and Inventory Management
- ✏️ Admin Product CRUD operations
- 🔐 Firebase Authentication (if included)
- ⚡ Real-time updates with React Query
- 🧪 Tested with React Testing Library and Jest

---

## 🛠️ Technologies Used

- **React 18** (Functional Components + Hooks)
- **Redux** for state management
- **Firebase Firestore** for backend
- **React Query** for data fetching
- **React-Bootstrap** for responsive UI
- **React Router** for navigation
- **Jest + React Testing Library** for unit/integration testing

---

## 🧪 Testing

### ✅ Unit Tests
- `Card.test.tsx`: Tests rendering of product details and interactions.
- `ProductForm.test.tsx`: Tests rendering of form fields and user input updates.

### ✅ Integration Test
- `AddToCart.test.tsx`: Simulates adding a product to the cart and verifies cart update.

To run tests:

```bash
npm test
⚙️ Setup Instructions
Clone the repository

bash
Copy
Edit
git clone https://github.com/yourusername/your-repo.git
cd your-repo
Install dependencies

bash
Copy
Edit
npm install
Start the development server

bash
Copy
Edit
npm start
Set up Firebase Create a .env file and add your Firebase config:

env
Copy
Edit
REACT_APP_FIREBASE_API_KEY=your_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_domain
REACT_APP_FIREBASE_PROJECT_ID=your_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_bucket

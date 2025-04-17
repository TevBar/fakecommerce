// src/components/tests__/AddToCart.test.tsx
import { render, screen, } from '@testing-library/react';
import Products from '../pages/Products';
import { Provider } from 'react-redux';
import store from '../store/store';

// ✅ MOCK the getProducts function (not fetchProducts!)
jest.mock('../../services/productService', () => ({
  getProducts: jest.fn(() =>
    Promise.resolve([
      {
        id: '1',
        name: 'Mock Product',
        price: 19.99,
        category: 'Toys',
        rating: 4.5,
        src: '/mock-image.jpg',
      }
    ])
  ),
  deleteProduct: jest.fn(() => Promise.resolve())
}));

test('renders mocked product', async () => {
  render(
    <Provider store={store}>
      <Products />
    </Provider>
  );

  // ✅ Wait for mocked product name to appear
  const productName = await screen.findByText(/Mock Product/i);
  expect(productName).toBeInTheDocument();

  // ✅ Optionally check for the delete button
  const deleteButton = screen.getByRole('button', { name: /delete/i });
  expect(deleteButton).toBeInTheDocument();
});

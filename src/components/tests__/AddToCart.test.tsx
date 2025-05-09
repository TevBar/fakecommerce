// src/components/__tests__/AddToCart.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import Products from '../pages/Products';
import { Provider } from 'react-redux';
import store from '../store/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


// ✅ Mock getProducts from productService
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
      },
    ])
  ),
  deleteProduct: jest.fn(() => Promise.resolve()),
}));

const queryClient = new QueryClient();

describe('Products Page', () => {
  test('renders mocked product and delete button', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Products />
        </Provider>
      </QueryClientProvider>
    );

    // ✅ Wait for product to appear
    const productName = await screen.findByText(/Mock Product/i);
    expect(productName).toBeInTheDocument();

    // ✅ Check delete button exists
    await waitFor(() => {
      const deleteButton = screen.getByRole('button', { name: /delete/i });
      expect(deleteButton).toBeInTheDocument();
    });
  });
});

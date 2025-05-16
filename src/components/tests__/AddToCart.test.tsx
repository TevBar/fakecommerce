// src/components/__tests__/AddToCart.test.tsx
import { render, screen, waitFor, cleanup } from '@testing-library/react';
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

// ✅ Create new query client instance for each test to avoid sharing cache
const createTestQueryClient = () => new QueryClient();

afterEach(() => {
  jest.clearAllMocks();
  cleanup(); // ✅ Ensure component unmounts cleanly
});

describe('Products Page', () => {
  test(
    'renders mocked product and delete button',
    async () => {
      const queryClient = createTestQueryClient();

      render(
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <Products />
          </Provider>
        </QueryClientProvider>
      );

      // ✅ Wait for the product to render
      const productName = await screen.findByText(/Mock Product/i);
      expect(productName).toBeInTheDocument();

      // ✅ Wait for and check the delete button
      await waitFor(() => {
        const deleteButton = screen.getByRole('button', { name: /delete/i });
        expect(deleteButton).toBeInTheDocument();
      });
    },
    10000 // ✅ Increased timeout to 10 seconds
  );
});

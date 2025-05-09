import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Products from '../pages/Products';
import { Provider } from 'react-redux';
import store from '../store/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
  test('renders mocked product and add to cart increments icon count', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Products />
        </Provider>
      </QueryClientProvider>
    );

    const productName = await screen.findByText(/Mock Product/i);
    expect(productName).toBeInTheDocument();

    const cartCount = screen.getByTestId('cart-count');
    expect(cartCount).toHaveTextContent('0');

    const addToCartButton = screen.getByRole('button', { name: /add to cart/i });
    expect(addToCartButton).toBeInTheDocument();

    fireEvent.click(addToCartButton);

    await waitFor(() => {
      expect(cartCount).toHaveTextContent('1');
    });

    fireEvent.click(addToCartButton);

    await waitFor(() => {
      expect(cartCount).toHaveTextContent('2');
    });
  });
});

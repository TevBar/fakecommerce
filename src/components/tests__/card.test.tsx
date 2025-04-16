import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '../card'; // adjust the path if needed

const mockItem = {
  id: 1,
  src: 'https://via.placeholder.com/150',
  name: 'Sample Product',
  price: 19.99,
  cat: 'Electronics',
  desc: 'A sample product description.',
  rating: {
    rate: 4.5,
    count: 20,
  },
};

describe('Card Component', () => {
  test('renders product name', () => {
    render(<Card item={mockItem} />);
    expect(screen.getByText('Sample Product')).toBeInTheDocument();
  });

  test('displays price correctly', () => {
    render(<Card item={mockItem} />);
    expect(screen.getByText('$19.99')).toBeInTheDocument();
  });

  test('displays category and rating', () => {
    render(<Card item={mockItem} />);
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText(/⭐ 4.5 \(20 reviews\)/)).toBeInTheDocument();
  });

  test('renders image with correct alt text', () => {
    render(<Card item={mockItem} />);
    expect(screen.getByAltText('Sample Product')).toBeInTheDocument();
  });
});

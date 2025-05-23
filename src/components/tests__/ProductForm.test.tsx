import { render, screen, fireEvent } from '@testing-library/react';
import ProductForm from '../products/ProductForm';
import { BrowserRouter } from 'react-router-dom';

// Mock the getEnv function to return a full config object
jest.mock('../../utils/getEnv', () => ({
  getEnv: () => ({
    apiKey: 'fake-api-key',
    authDomain: 'fake-auth-domain',
    projectId: 'fake-project-id',
    storageBucket: 'fake-storage-bucket',
    messagingSenderId: 'fake-sender-id',
    appId: 'fake-app-id',
  }),
}));

describe('ProductForm Component', () => {
  test('renders empty form inputs for new product', () => {
    render(
      <BrowserRouter>
        <ProductForm />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/name/i)).toHaveValue('');
    expect(screen.getByLabelText(/price/i)).toHaveValue(0);
    expect(screen.getByLabelText(/stock/i)).toHaveValue(0);
    expect(screen.getByLabelText(/description/i)).toHaveValue('');
  });

  test('updates input values on user interaction', () => {
    render(
      <BrowserRouter>
        <ProductForm />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test Product' } });
    expect(screen.getByLabelText(/name/i)).toHaveValue('Test Product');

    fireEvent.change(screen.getByLabelText(/price/i), { target: { value: 49.99 } });
    expect(screen.getByLabelText(/price/i)).toHaveValue(49.99);

    fireEvent.change(screen.getByLabelText(/stock/i), { target: { value: 100 } });
    expect(screen.getByLabelText(/stock/i)).toHaveValue(100);
  });
});

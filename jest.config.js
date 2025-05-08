require('dotenv').config({ path: '.env.test' });

module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],

  // Use babel-jest to handle .ts/.tsx/.js/.jsx files
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },

  // Allow importing these extensions
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],

  // Ignore transforming node_modules except specific ones (optional)
  transformIgnorePatterns: ['<rootDir>/node_modules/'],

  // 🔥 Map Vite-style assets and envs to avoid Jest crashing
  moduleNameMapper: {
    // Handle static asset imports (optional, improve if using images or CSS modules)
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',

    // If you import images, add this line:
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',

    // ✅ This prevents Jest from failing on import.meta.env
    '^firebase.config$': '<rootDir>/__mocks__/firebase.config.js',
  },

  // Optional: clear mocks between tests
  clearMocks: true,
};

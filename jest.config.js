require('dotenv').config({ path: '.env.test' });

module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],

  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],

  transformIgnorePatterns: ['<rootDir>/node_modules/'],

  moduleNameMapper: {
    // ✅ CORRECT CSS handling
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',

    // ✅ Optional: static asset stubs
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',

    // ✅ Firebase mock
    '^@/firebase.config$': '<rootDir>/__mocks__/firebase.config.js',
    '^firebase.config$': '<rootDir>/__mocks__/firebase.config.js',
  },

  clearMocks: true,
};

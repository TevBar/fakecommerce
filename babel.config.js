module.exports = {
    presets: [
      '@babel/preset-env',
      ['@babel/preset-react', { runtime: 'automatic' }], // 👈 enable new JSX transform
      '@babel/preset-typescript',
    ],
  };
  
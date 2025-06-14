module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
          '@/components': './src/components',
          '@/screens': './src/screens',
          '@/utils': './src/utils',
          '@/redux': './src/redux',
          '@/context': './src/context',
          '@/types': './src/types',
          '@/navigation': './src/navigation',
          '@/assets': './src/assets',
        },
      },
    ],
  ],
};

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@/assets': './src/assets',
          '@/components': './src/components',
          '@/config': './src/config',
          '@/features': './src/features',
          '@/hooks': './src/hooks',
          '@/lib': './src/lib',
          '@/modules': './src/modules',
          '@/providers': './src/providers',
          '@/routes': './src/routes',
          '@/stores': './src/stores',
          '@/test': './src/test',
          '@/types': './src/types',
          '@/utils': './src/utils',
        },
      },
    ],
    ['module:react-native-dotenv', { moduleName: '@env' }],
  ],
};

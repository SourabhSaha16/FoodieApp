const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Explicitly set the Babel transformer to handle TypeScript files
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('metro-react-native-babel-transformer'),
};

// Enable verbose logging for debugging
config.reporter = {
  update: (event) => {
    if (event.type === 'bundle_build_failed') {
      console.error('Bundle build failed:', event.error);
    }
    if (event.type === 'transform_cache_reset') {
      console.log('Transform cache reset');
    }
  },
};

module.exports = config;
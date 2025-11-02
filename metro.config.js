const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add web support
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Disable new architecture to fix TurboModule errors
config.transformer = {
  ...config.transformer,
  unstable_allowRequireContext: true,
};

module.exports = config;
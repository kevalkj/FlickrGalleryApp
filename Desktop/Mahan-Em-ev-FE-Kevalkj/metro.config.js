const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;
const config = {
  resolver: {
    // Add any custom resolver options here if needed
    assetExts: assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...sourceExts, "svg"]
  },
  transformer: {
    // Add any custom transformer options here if needed
    babelTransformerPath: require.resolve(
      "react-native-svg-transformer/react-native"
    )
  }
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);

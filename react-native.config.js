  module.exports = {
    assets: ['./assets/fonts'],
    dependencies: {
      ...(process.env.NO_FLIPPER // When set, skip flipper includes for iOS archive builds (release buidls)
        ? { 'react-native-flipper': { platforms: { ios: null } } }
        : {}),
        'react-native-vector-icons': {
          platforms: {
            ios: null,
          },
        },
    },
  }
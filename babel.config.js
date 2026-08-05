module.exports = function (api) {
  api.cache(true);

  return {
    // O plugin do react-native-worklets (Reanimated 4) é adicionado
    // automaticamente pelo babel-preset-expo do SDK 57 — não declare aqui.
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
  };
};

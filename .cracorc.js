const CracoAlias = require('craco-alias');
module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        tsConfigPath: './tsconfig.extend.json',
        baseUrl: './src',
      },
    },
  ],
  typescript: {
    extends: './tsconfig.extend.json',
  },
};

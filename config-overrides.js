const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#1E88E5',
      '@grid-gutter-width': '12px',
      '@font-family': 'Inter, Arial, sans-serif',
    },
  }),
);

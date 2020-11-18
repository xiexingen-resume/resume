// Change theme plugin

// import MergeLessPlugin from 'antd-pro-merge-less';
// import AntDesignThemePlugin from 'antd-theme-webpack-plugin';
import path from 'path';

function getModulePackageName(module: { context: string }) {
  if (!module.context) return null;

  const moduleRelativePath = module.context.split('node_modules').pop() || '';
  const [moduleDirName] = moduleRelativePath.split(path.sep);
  let packageName: string | null = moduleDirName;
  // handle tree shaking
  if (packageName && packageName.match('^_')) {
    // eslint-disable-next-line prefer-destructuring
    packageName = packageName.match(/^_(@?[^@]+)/)![1];
  }
  return packageName;
}

export default config => {
  // optimize chunks
  config.optimization
    // share the same chunks across different modules
    .runtimeChunk(false)
    .splitChunks({
      chunks: 'async',
      name: 'vendors',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendors: {
          test: (module: { context: string }) => {
            const packageName = getModulePackageName(module) || '';
            if (packageName) {
              return [
                'antd',
              ].includes(packageName);
            }
            return false;
          },
          name(module: { context: string }) {
            const packageName = getModulePackageName(module);
            if (packageName) {
              if (['@umijs'].indexOf(packageName) >= 0) {
                return 'viz'; // visualization package
              }
            }
            return 'misc';
          },
        },
      },
    });

  return config;
};

const { merge } = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = (phase, { defaultConfig }) => {
  // Add custom configurations here
  const customConfig = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      // Add Webpack Bundle Analyzer
      if (!isServer && process.env.ANALYZE === 'true') {
        config.plugins.push(new BundleAnalyzerPlugin());
      }

      // Modify or add custom Webpack configuration
      const mergedConfig = merge(config, {
        // Add custom settings here
      });

      return mergedConfig;
    },
  };

  // Merge custom configurations with default Next.js configurations
  return {
    ...defaultConfig,
    ...customConfig,
    reactStrictMode: true,
    swcMinify: true,
    images: {
      unoptimized: true,
    },
    distDir: 'build',
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });

      config.module.rules.push({
        test: /\.(mp4|webm|ogg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/_next/static/video/',
              outputPath: 'static/video/',
              name: '[name].[hash].[ext]',
            },
          },
        ],
      });

      return config;
    },
  };
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  // Enable SWC only for the development environment
  // because it caused issues with the persistent layout
  swcMinify: process.env.NODE_ENV === 'development',
});

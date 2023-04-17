/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const nextConfig = (phase) => ({
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  env: {
    subqlApiBaseUrl:
      phase === PHASE_DEVELOPMENT_SERVER // false && phase === PHASE_DEVELOPMENT_SERVER
        ? "http://localhost:3000"
        : "",
  },
});

module.exports = (phase) => nextConfig(phase);

/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  // 'swcMinify' is no longer a valid top-level option in Next 16.
  // Turbopack may infer the workspace root incorrectly when multiple
  // lockfiles exist; set `turbopack.root` to the workspace root to silence the warning.
  turbopack: {
    root: path.resolve(__dirname, '..')
  }
}

module.exports = nextConfig
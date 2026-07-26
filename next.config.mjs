import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Move 'turbopack' to the top level (no longer under 'experimental')
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
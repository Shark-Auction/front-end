import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Sử dụng __dirname nếu gặp lỗi với import.meta.url
const root = path.resolve(__dirname, 'src');

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': root,
      '@components': path.resolve(root, 'components'),
      '@axios': path.resolve(root, 'config/axios'),
      '@layout': path.resolve(root, 'core/layout'),
      '@store': path.resolve(root, 'core/store'),
      '@hooks': path.resolve(root, 'hooks'),
      '@model': path.resolve(root, 'model'),
      '@pages': path.resolve(root, 'pages'),
      '@service': path.resolve(root, 'service'),
      '@utils': path.resolve(root, 'utils'),
    },
  },
  server: {
    host: true,
  },
  build: {
    outDir: 'build',
    assetsDir: 'assets',
    emptyOutDir: true,
  },
});

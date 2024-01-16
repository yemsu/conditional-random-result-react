import path from 'path';

import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint({ exclude: ['/virtual:/**', 'node_modules/**'] })],
  test: {
    globals: true, // vitest에서 제공하는 vi와 같은 api들을 별도 import 없이 편리하게 사용 가능
    environment: 'jsdom', // 브라우저와 다르게 nodejs 환경에는 dom이 존재하지 않음. 따라서 nodejs 환경에서도 dom이 제대로 렌더링 되는지 확인하기 위한 환경인 jsdom이 필요
    setupFiles: './src/utils/test/setupTests.js', // 테스트 실행을 위해 필요한 설정
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
});

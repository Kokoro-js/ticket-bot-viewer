import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import { viteSingleFile } from 'vite-plugin-singlefile'
// import devtools from 'solid-devtools/vite';

export default defineConfig({
  plugins: [
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin({ dev: false }),
    viteSingleFile(),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
  resolve: {
    conditions: ['development', 'browser'],
    alias: {
      '~': '/src', // 将 `~` 设置为 `src` 目录的别名
    },
  },
})

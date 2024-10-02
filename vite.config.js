import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: './index.html',  // Ajuste o caminho conforme necessário
      output: {
        dir: 'dist',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  }
})

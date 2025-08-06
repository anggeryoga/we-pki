import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        blog: 'blog.html',
        article: 'article.html',
        admin: 'admin.html',
        login: 'login.html',
        setup: 'setup-admin.html'
      }
    }
  },
  server: {
    port: 3000
  }
});
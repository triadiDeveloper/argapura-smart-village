import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { apiMiddleware } from './server/api.mjs'
export default defineConfig({ base: process.env.GITHUB_PAGES === 'true' ? '/argapura-smart-village/' : '/', plugins: [react(), tailwindcss(), { name: 'info-api', configureServer(server) { server.middlewares.use(apiMiddleware) }, configurePreviewServer(server) { server.middlewares.use(apiMiddleware) } }] })

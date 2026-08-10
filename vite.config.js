import { defineConfig } from 'vite'

// Set VITE_BASE=/ when publishing to a custom domain; GitHub Pages uses /shortstoriesbyme/.
export default defineConfig({ base: process.env.VITE_BASE || '/shortstoriesbyme/' })

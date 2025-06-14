import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
	plugins: [
		react(),
		eslintPlugin({
			cache: false,
			include: ['./src//*.js', './src//*.jsx'],
			exclude: [],
		}),
	],
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: './src/tests/setup.js',
	},
});

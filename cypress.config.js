import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:5173', // Replace with your development server URL
        supportFile: false,
    },
});

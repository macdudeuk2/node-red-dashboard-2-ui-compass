import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

const LIBRARY_NAME = 'ui-compass'

export default defineConfig({
    plugins: [
        vue(),
        cssInjectedByJsPlugin()
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'ui/index.js'),
            name: LIBRARY_NAME,
            formats: ['es', 'umd'],
            fileName: (format) => {
                if (format === 'es') {
                    return `${LIBRARY_NAME}.esm.js`
                }
                return `${LIBRARY_NAME}.${format}.js`
            }
        },
        outDir: './resources',
        rollupOptions: {
            external: ['vue', 'vuetify'],
            output: {
                globals: {
                    vue: 'Vue',
                    vuetify: 'Vuetify'
                }
            }
        }
    }
})

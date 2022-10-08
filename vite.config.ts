//SIN VITEST: import { defineConfig } from "vite";
import { defineConfig } from 'vitest/config';

import react from "@vitejs/plugin-react";
import compress from 'vite-plugin-compress'
//
//import eslint from 'vite-plugin-eslint';
//XXX:PREACT import preact from "@preact/preset-vite";

import { dependencies } from './package.json';
import { resolve } from 'path'
import fs from "fs";

const estamosEnGlitch= process.env.PROJECT_REMIX_CHAIN!=null //A: la encontre con set en consola de glitch
const HMR_PORT= estamosEnGlitch ? 443 : null; 
//A: En glitch hay que indicarle al navegador que se conecte al de https pubico donde se ve la pagina
console.log('HMR_PORT',HMR_PORT);

function renderChunks(deps) {
	let chunks = {};
	Object.keys(deps).forEach((key) => {
		if (['react', 'react-router-dom', 'react-dom'].includes(key)) return;
		chunks[key] = [key];
	});
	return chunks;
}

// https://vitejs.dev/config/
export default defineConfig( ({command, mode}) => {
	CFG= {
		esbuild: { loader: "jsx", include: /src[\/\\].*\.jsx?$/, exclude: [] }, 
		optimizeDeps: { esbuildOptions: { plugins: [ { name: "load-js-files-as-jsx", setup(build) { build.onLoad({ filter: /src[\/\\].*\.js$/ }, async (args) => { return ({ loader: "jsx", contents: await fs.promises.readFile(args.path, "utf8"), }) }); }, }, ], }, },
		plugins: [
			react(),
			//reactRefresh(),
			//XXX:PREACT preact(),
			compress({ exclude: ["**/*.js","**/*.css"] }),
		],
		define: { //VER: https://vitejs.dev/config/#environment-variables
			'import.meta.vitest': undefined,
		},
		test: {
			globals: true, //VER: https://vitest.dev/config/#globals
			environment: 'happy-dom', //VER: https://vitest.dev/config/#environment
			exclude: ['**/node_modules/**', '**/dist/**', '**/types/**' ],
			include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		},
		build: {
			outDir: "build",
			rollupOptions: {
				input: {
					main: resolve(__dirname, 'index.html'), //VER: https://vitejs.dev/guide/build.html#multi-page-app
				},
				output: {
					/* Para empaquetar librerias por separado en vez de un solo .js grande
				manualChunks: {
						vendor: ['react', 'react-router-dom', 'react-dom'],
					...renderChunks(dependencies),
				},
				*/
				}
			},
		},
		css: {
			postcss: "postcss.config.js",
		},
		server: {
			strictPort: true,
			hmr: {
				port: HMR_PORT,
			}
		}
	}

	//DBG: console.log("vite.config.js, mode="+mode, JSON.stringify(CFG,null,1));

	return CFG;
})

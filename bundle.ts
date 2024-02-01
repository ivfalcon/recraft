// Importar el módulo esbuild desde el paquete Deno
import * as esbuild from 'https://deno.land/x/esbuild@v0.19.12/mod.js';

// Configuración de esbuild
const options: esbuild.BuildOptions = {
  entryPoints: ['./app.js'],  // Archivo de entrada
  bundle: true,               // Crear un bundle
  outfile: './dist/bundle.js', // Archivo de salida
  jsxFactory: 'recraft',      // Especificar la fábrica JSX
  loader: { '.js': 'jsx' },   // Especificar el loader para JSX
};

// Realizar el bundling con esbuild
try {
    await esbuild.build(options);
} catch (error) {
    console.error(error);
    Deno.exit(1);
}

esbuild.stop();
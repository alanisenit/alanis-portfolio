import { cpSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const dist = resolve(root, 'dist');

console.log('🚀 Iniciando build para producción...');

// 1. Compilar tokens
try {
  console.log('📦 Compilando tokens...');
  execSync('node scripts/build-tokens.mjs', { cwd: root, stdio: 'inherit' });
} catch (err) {
  console.warn('Advertencia al compilar tokens:', err.message);
}

// 2. Limpiar dist
if (existsSync(dist)) {
  rmSync(dist, { recursive: true, force: true });
}
mkdirSync(dist, { recursive: true });

// 3. Copiar sitio principal (Pop Nocturna) a la raíz de dist
const popNocturna = resolve(root, 'propuestas/paso-01b-pop-nocturna');
console.log('📄 Copiando sitio principal (Pop Nocturna)...');
cpSync(popNocturna, dist, { recursive: true });

// 4. Copiar herramientas complementarias
const contenido = resolve(root, 'propuestas/paso-03-contenido');
if (existsSync(contenido)) {
  console.log('📄 Copiando panel de contenido y SEO...');
  cpSync(contenido, resolve(dist, 'contenido'), { recursive: true });
}

const direccion = resolve(root, 'propuestas/paso-01-direccion');
if (existsSync(direccion)) {
  console.log('📄 Copiando comparativa de direcciones...');
  cpSync(direccion, resolve(dist, 'direccion'), { recursive: true });
}

const designSystem = resolve(root, 'design-system');
if (existsSync(designSystem)) {
  console.log('📄 Copiando sistema de diseño...');
  cpSync(designSystem, resolve(dist, 'design-system'), { recursive: true });
}

// 5. Copiar PDFs del CV si existen
const cvPdf = resolve(root, 'CV 2026 (JGD) - Alanis Romero.pdf');
if (existsSync(cvPdf)) {
  cpSync(cvPdf, resolve(dist, 'cv-alanis-romero.pdf'));
  cpSync(cvPdf, resolve(dist, 'CV 2026 (JGD) - Alanis Romero.pdf'));
}

console.log('✅ Build completado exitosamente en /dist!');

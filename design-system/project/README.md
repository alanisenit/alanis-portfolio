Pop Nocturna es el sistema visual de la web de Alanis Romero, diseñadora gráfica freelance en Lima. Es pop sobre azul noche: color, stickers y letra a mano alrededor del trabajo, nunca encima de él. Úsalo para cualquier página, pieza o componente del sitio y de sus perfiles (Behance, Upwork, Fiverr, LinkedIn).

## Principios

1. **El trabajo manda.** Toda pieza del portafolio va sobre `white` o `paper`. El color fuerte vive en la barra, las etiquetas, los stickers y los paneles de servicios y contacto, nunca detrás de una pieza.
2. **Noche al entrar y al salir.** El hero y el cierre van sobre `night`; el contenido vive en paneles claros redondeados en el medio.
3. **Lo estructural es recto, lo que contiene es redondo.** Miniaturas, etiquetas, botones-caja, campos y la ventana de proyecto usan `radius-none`. Paneles y tarjetas usan `radius-lg` y `radius-md`. Las acciones son píldoras (`radius-full`).
4. **Una voz a mano por sección.** El estilo `hand` acompaña a un titular y nunca va solo.
5. **El asterisco es la única estrella.** No hay cielos estrellados, auroras ni degradados de fondo: la noche es el color `night` y las estrellas son los asteriscos de Alanis.

## Voz y textos

- Habla Alanis en primera persona y trata de tú: "Diseño redes sociales que detienen el scroll", "Cuéntame tu proyecto".
- Frases cortas y concretas. Nada de superlativos vacíos ("increíble", "único") ni urgencia.
- Botones con verbo primero: "Ver trabajo", "Escribir a Alanis", "Proponer una colab", "Descargar CV". Nunca "Clic aquí".
- Los titulares se escriben en tipo oración en el HTML; las mayúsculas las pone `pn-d`.
- Español en la raíz y la versión en inglés bajo `/en`, con "ES / EN" visible en la barra.
- Sin emoji. El único símbolo decorativo es el asterisco (✶ en texto, el componente Asterisk en interfaz).
- Solo cifras verificadas del CV: +130 piezas y videos, +5 marcas y clientes, 4 países, bilingüe ES·EN.
- Textos de ejemplo reales del sitio: hero "Diseño que se queda *en tu feed*"; cierre "Creemos algo *que brille*"; colaboraciones "¿Eres *creador/a?*".

## Color

| Rol | Tokens | Texto encima |
| --- | --- | --- |
| Fondo de página | `night`, `bar` | `cream`, `lead`, `soft`, `green-lite`, `pink`, `honey` |
| Paneles del trabajo y texto | `white`, `paper` | `ink`, `ink-soft`, `muted`, `blue` |
| Presentación | `blush` | `ink`, `ink-soft`, `blue` |
| Servicios | `blue` | `on-blue` |
| Colaboraciones, botón principal | `green` | `on-green` (es `ink`) |
| Acentos | `pink`, `honey`, `lav`, `green-lite`, `mint`, `sky` | `ink` |

- Pon titulares en `cream` sobre `night`, entradillas en `lead` y antetítulos en `soft`.
- Usa `blue-lite` y `green-lite` solo sobre `night`. Usa `pink` y `honey` como texto solo sobre `night`; en paneles claros son rellenos, no texto.
- El texto sobre `green` es `on-green`. El blanco sobre `green` da 3,5:1 y no cumple; si hace falta blanco, el fondo es `green-deep`.
- Cada categoría tiene un color fijo (ver Tag): Redes `blue`, Branding `green`, Editorial `pink`, Ilustración `honey`, Fotomontaje `lav`, Video `green-lite`.
- No agregues colores nuevos para secciones: alterna los paneles existentes y no pongas dos paneles de color seguidos.

## Tipografía

- **Bricolage Grotesque** (Google Fonts, variable: tamaño óptico 12–96, ancho 75–100, peso 400–800) para titulares y texto. Titulares: peso 800, mayúsculas, `"wdth" 75`, `"opsz" 96`, interlineado 0,88. Texto: peso 400, `"opsz" 14`, 16px con interlineado 1,55.
- **Delicious Handrawn** para el acento a mano (`hand`): una a tres palabras, a 0,58 del titular, giradas −6°.
- Escala (máximo de cada `clamp()`): `display-page` 214px, `display-hero` 170px, `display-section` 100px, `display-block` 52px, `display-card` 31px; `lead` 19px, `body` 16px, `button` 14.5px, `eyebrow` 13px, `overline` 12px.
- Un `h1` por página que incluya la palabra clave ("Diseñadora gráfica freelance" en el antetítulo del inicio). Entradillas de 50 caracteres por línea como máximo; texto corrido de 65.

## Espaciado y retícula

- Contenedor `.pn-wrap` de 1360px como máximo, con márgenes `space-4` en móvil y `space-7` desde `bp-md`.
- Los paneles se separan `space-3` entre sí y quedan a 10px del borde de la ventana. Relleno vertical `clamp(40px, 6vw, 84px)` (`space-9`).
- Rejilla de trabajo de 4 columnas, 3 bajo `bp-xl` y 2 bajo `bp-md`; huecos `clamp(22px, 2.6vw, 36px)` en vertical y `clamp(14px, 2vw, 28px)` en horizontal.
- Paneles de dos columnas pasan a una bajo `bp-lg`.

## Radios y sombras

- `radius-lg` (28px) para paneles, `radius-md` (24px) para tarjetas, `radius-sm` (16px) para piezas del collage y cifras, `radius-full` para botones y chips, `radius-none` para todo lo estructural.
- El retrato va en arco: `999px 999px 28px 28px`.
- Sombras solo donde hay profundidad real: `shadow-shot` en el collage del hero, `shadow-float` en la ventana de proyecto, `press-green` y `press-honey` como relieve de botones. Nada de sombras en paneles ni tarjetas.

## Movimiento

- Toda animación usa `ease-pop`. Duraciones: `dur-quick` para hover, `dur-page` para transiciones entre páginas (View Transitions), `dur-modal` para la ventana, `dur-reveal` para apariciones al hacer scroll y `dur-rise` para la entrada del hero.
- La entrada del hero solo desplaza (26px hacia arriba, escalonado cada 0,07 s): el contenido nunca está oculto.
- Las apariciones al hacer scroll solo aplican a elementos que aún están bajo la pantalla.
- Los asteriscos y el sticker giran en 14–22 s y siguen al mouse con paralaje de 10–70px. La cinta de marcas tarda 40 s y se pausa al pasar el mouse.
- Con `prefers-reduced-motion` se apaga todo movimiento. En Next.js las animaciones van con Motion (motion.dev); Three.js queda reservado para una pieza puntual, nunca de fondo.

## Imágenes

- En la rejilla, las piezas se recortan 5:6 con `object-fit: cover`; en la ventana y en el caso de estudio van completas, sin recorte.
- El collage del hero usa tres piezas con marco blanco de 6px, `radius-sm`, giradas −8°, 6° y −2°, con `shadow-shot`.
- El retrato va en duotono: escala de grises con `mix-blend-mode: multiply` sobre un degradado `honey` → `pink`. La foto actual (grupo Retrato) es provisional.
- Todo `img` lleva `alt` descriptivo con el nombre del proyecto y el tipo de pieza. En producción: AVIF/WebP con `next/image`.

## Iconografía

- Iconos de línea propios, retícula de 24, trazo de 2px y extremos redondeados: flecha, flecha atrás, descargar, buscar, cerrar, más, cámara, micrófono y pluma. Toman el color con `currentColor` (`pn-ico`).
- El motivo es el asterisco de ocho brazos con trazo irregular (filtro `feTurbulence`), en el grupo Motivo y como componente Asterisk.
- No hay logotipo todavía: el nombre se compone como "Alanis / Romero" en dos líneas con `display` a 17px, junto al asterisco `pink`.

## Accesibilidad

- El foco de teclado es `focus-ring`: 3px de `ink` y 3px de `honey`, visible tanto en paneles claros como sobre `night`.
- Ningún estado depende solo del color: el botón-caja activo y la opción elegida llevan una barra inferior `ink` de 4px; el filtro activo, subrayado `ink` y marcador `honey`.
- Todos los pares de texto de la tabla de Color cumplen 4,5:1 (3:1 en titulares de 24px o más).
- Formularios con `label` visible, errores en texto (`error`) que dicen cómo corregir y el foco devuelto al campo.

## En código

- Los tokens son variables CSS (`--night`, `--space-3`, `--font-display`…) generadas desde `tokens.json`; los componentes son clases `pn-*` en `components/bundle.css`.
- En Next.js, estos mismos nombres pasan al tema (CSS variables o Tailwind) para que el sitio y este sistema no se separen.

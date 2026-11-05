# Alanis Romero · Portfolio Web

Sitio web y portafolio interactivo de **Alanis Romero** — Diseñadora gráfica freelance en Lima, Perú (Bilingüe ES/EN).

## 🚀 Prototipo y Servidores Locales

El proyecto cuenta con un prototipo funcional ("Pop Nocturna") con soporte bilingüe completo (español e inglés) y herramientas de arquitectura de contenido y SEO:

- **Sitio Principal (Pop Nocturna)**: `propuestas/paso-01b-pop-nocturna`
  - Ejecución local:
    ```bash
    python -m http.server 3000 --directory propuestas/paso-01b-pop-nocturna
    ```
  - Incluye:
    - Inicio (`index.html`) con paralaje suave y destacados
    - Portafolio con filtros en vivo y buscador (`trabajo.html`)
    - Sobre mí con trayectoria y formación (`sobre-mi.html`)
    - Contacto y cotizaciones (`contacto.html`)
    - Caso de estudio en profundidad (`proyecto-macbeth.html`)
    - Selector dinámico de idioma **ES / EN** en la barra superior.

- **Herramienta de Contenido & SEO**: `propuestas/paso-03-contenido`
  - Ejecución local:
    ```bash
    python -m http.server 5176 --directory propuestas/paso-03-contenido
    ```
  - Permite revisar las 6 páginas, los 5 servicios y los 12 casos de estudio en español e inglés, con simulador SERP de Google y conteo de caracteres.

- **Sistema de Diseño**: `design-system`
  - Tokens de color, tipografía, espaciado y componentes base.

## 📁 Estructura del Proyecto

```text
├── content/              # Fuentes de contenido en JSON (páginas, proyectos, servicios, SEO, rutas)
├── design-system/        # Tokens, assets de marca y componentes aislados
├── propuestas/           # Prototipos interactivos y exploraciones de dirección de arte
│   ├── paso-01-direccion/       # Comparativa de las 3 direcciones iniciales
│   ├── paso-01b-pop-nocturna/   # Prototipo elegido y completo con soporte ES/EN
│   └── paso-03-contenido/       # Panel de revisión de contenido y SEO bilingüe
├── public/               # Archivos estáticos y fotografías de proyectos
├── src/styles/           # Tokens CSS generados y hojas de estilo compartidas
└── scripts/              # Scripts auxiliares (compilación de tokens, etc.)
```

## 🛠️ Tecnologías
- HTML5 semántico (UTF-8)
- CSS moderno con variables y CSS Grid
- JavaScript vanilla modular con soporte bilingüe (ES / EN)
- Motion (animaciones e interacciones)

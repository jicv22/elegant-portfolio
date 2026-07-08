# Next.js Portfolio

Portafolio digital desarrollado con Next.js 16 (App Router), React 19 y Tailwind CSS v4.

## Arquitectura y Estructura

El proyecto sigue una arquitectura modular y escalable. Recientemente se realizó un refactor para mejorar la mantenibilidad de los estilos y componentes.

### Estructura de carpetas principales

- `src/app/` - Rutas de la aplicación (App Router). `globals.css` actúa solo como punto de entrada de estilos.
- `src/components/` - Componentes organizados por dominio:
  - `web/` - Componentes específicos de las secciones del portafolio (Hero, Projects, Tech, etc).
  - `ui/` - Componentes visuales genéricos y reutilizables (`EdgeGlow`, `TextShineControl`).
  - `icons/` - SVGs y componentes de iconos.
- `src/config/` - Archivos de configuración y contenido (fuente de verdad). Separados por dominio (`cv.ts`, `site.ts`, `projects.ts`, etc).
- `src/hooks/` - Custom hooks (e.g., `useClipboard`, `useEdgeGlow`).
- `src/lib/` - Utilidades, tipados compartidos y funciones core.
- `src/styles/` - **Design System y Estilos CSS modulares**. Cada sección/componente complejo tiene su propio archivo CSS.

### Design System (CSS y Tailwind v4)

Los estilos se gestionan a través de una combinación de variables CSS nativas y utilidades de Tailwind v4:
1. `src/styles/tokens.css` contiene las variables CSS (`--background`, `--gold`, etc.) y las inyecta en el `@theme` de Tailwind.
2. Los estilos de componentes están extraídos en archivos modulares (e.g., `hero.css`, `projects.css`) y utilizan la metodología BEM para las clases.
3. El archivo `src/app/globals.css` solo se utiliza para importar estos módulos y las directivas de Tailwind.

## Desarrollo

Primero, instala las dependencias:

```bash
pnpm install
```

Luego, inicia el servidor de desarrollo:

```bash
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## Scripts útiles

- `pnpm dev`: Inicia el servidor de desarrollo.
- `pnpm build`: Construye la aplicación para producción.
- `pnpm start`: Inicia el servidor de producción.
- `pnpm lint`: Ejecuta ESLint para analizar el código.

# VALSET://ROOT — Sitio para GitHub Pages

Sitio estático educativo con estética de terminal/hacker, preparado para publicarse directamente en GitHub Pages.

## Estructura

- `index.html`: página principal.
- `assets/css/styles.css`: estilos visuales.
- `assets/js/app.js`: interacciones y terminales simuladas.
- `assets/images/`: logotipos y favicon.
- `.nojekyll`: evita que GitHub Pages procese el sitio con Jekyll.

## Publicación en GitHub Pages

1. Crea un repositorio nuevo en GitHub.
2. Sube **todo el contenido de esta carpeta**, incluida la carpeta `assets`.
3. Abre `Settings` → `Pages`.
4. En `Build and deployment`, elige `Deploy from a branch`.
5. Selecciona la rama `main` y la carpeta `/ (root)`.
6. Guarda los cambios y espera a que GitHub genere la dirección pública.

## Dominio personalizado

Cuando el sitio ya funcione en GitHub Pages, agrega el dominio desde `Settings` → `Pages` → `Custom domain`. GitHub creará el archivo `CNAME` automáticamente. No renombres archivos ni cambies las rutas de `assets`.

## Nota

Las terminales incluidas son simulaciones educativas ejecutadas en el navegador; no realizan ataques reales ni se conectan a servidores externos.

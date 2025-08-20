# DOOM-like Web Raycaster

Pequeño clon de DOOM/Wolfenstein 3D usando raycasting en Canvas 2D.

## Ejecutar

```bash
npm install
npm test   # ejecutar pruebas
```

Para jugar, sirve el directorio con cualquier servidor estático (por ejemplo `npx http-server`) y abre `index.html` en el navegador.

## Estructura

- `index.html`: juego principal y lógica de interacción.
- `engine.js`: utilidades de motor (raycasting, trigonometría, colisiones).
- `maps/`: mapas en formato JSON.
- `styles.css`: estilos compartidos.
- `__tests__/`: pruebas unitarias con Jest.

## Features

- Raycasting 2D/3D básico.
- Movimiento y colisiones del jugador.
- Soporte para cargar mapas JSON o exportados desde Tiled.
- Animaciones sencillas de armas y HUD.
- Pruebas unitarias para colisiones y raycasting.

# Carpeta de videos — Traveor Travel

La sección **"Experiencias destacadas"** de la página de inicio reproduce estos archivos.
**Ya están colocados y funcionando** (identificados a partir de los videos que entregó Traveor):

| Experiencia            | Archivo                             | Resolución | Enlace "VER OPCIONES"                                        |
|------------------------|-------------------------------------|-----------|-------------------------------------------------------------|
| Mega Europa ★           | `mega-europa.mp4`                   | 1280×720  | https://viaje.ly/traveor-travel-agencia-de-viajes/12217.html |
| Maravillas del Caribe  | `maravillas-del-caribe.mp4`         | 1280×720  | *(enlace general — falta el específico)*                     |
| Magia Turca            | `magia-turca.mp4`                   | 568×320   | https://viaje.ly/traveor-travel-agencia-de-viajes/20150.html |
| USA                    | `usa.mp4`                           | 1280×720  | *(enlace general — falta el específico)*                     |
| Japón                  | `japon.mp4`                         | 1280×720  | *(enlace general — falta el específico)*                     |

- `_magia-turca-version-anterior.mp4` es una copia más antigua (7:04 a.m.) del mismo video de
  Magia Turca. **No se usa** — se puede borrar.
- **`magia-turca.mp4` está en baja resolución (568×320)** frente a los demás (720p). Si Traveor
  tiene una exportación en mejor calidad, reemplazar el archivo con el mismo nombre.

## Cómo funciona la carga

- Los videos **no** se descargan al abrir la página (`preload="none"`).
- Solo se descarga el video seleccionado cuando el usuario pulsa ▶. Nunca cargan los 5 a la vez.
- Mientras carga se muestra un spinner; si un archivo falla, vuelve al póster sin romper nada.
- Para cambiar un video: reemplazar el archivo `.mp4` conservando el nombre.
- Póster de cada tarjeta: imagen de Unsplash (ver `IMAGENES.md`). Si Traveor entrega un frame
  propio del video, reemplazar el `data-poster` y el `<img>` de esa tarjeta en `index.html`.

## Peso / repositorio

Los 5 videos suman ~107 MB. Si el repositorio va a GitHub Pages / Netlify no hay problema
(límite 100 MB por archivo, el mayor es `usa.mp4` con 23 MB). Si se prefiere no versionar
binarios pesados, moverlos a un CDN o a Git LFS y ajustar las rutas.

# Carpeta de videos — Traveor Travel

La sección **"Experiencias destacadas"** de la página de inicio busca los videos en esta
carpeta con estos nombres exactos (todo en minúsculas, sin acentos):

| Experiencia            | Archivo esperado                    | Enlace "VER OPCIONES"                                              |
|------------------------|-------------------------------------|------------------------------------------------------------------|
| Mega Europa ★           | `videos/mega-europa.mp4`            | https://viaje.ly/traveor-travel-agencia-de-viajes/12217.html      |
| Maravillas del Caribe  | `videos/maravillas-del-caribe.mp4`  | *(enlace general — falta el específico, ver abajo)*               |
| Magia Turca            | `videos/magia-turca.mp4`            | https://viaje.ly/traveor-travel-agencia-de-viajes/20150.html      |
| USA                    | `videos/usa.mp4`                    | *(enlace general — falta el específico)*                          |
| Japón                  | `videos/japon.mp4`                  | *(enlace general — falta el específico)*                          |

## Recomendaciones de optimización (según el brief)

- **Formato horizontal 16:9.** No convertir a vertical.
- **Compresión:** H.264 (MP4) a ~1080p, bitrate 4–6 Mbps. Peso objetivo < 8–12 MB por video.
  - Opcional: agregar también `nombre.webm` (VP9/AV1) y el reproductor lo usará si existe
    (habría que añadir un `<source>` en `index.html`).
- **Carga diferida:** los videos NO se cargan al abrir la página. Solo se descarga el
  video seleccionado cuando el usuario pulsa ▶. Los 5 nunca cargan a la vez.
- **Póster:** cada experiencia ya usa una imagen póster optimizada (ver `IMAGENES.md`).
  Si Traveor entrega un frame propio del video, reemplazar el `data-poster` correspondiente
  en `index.html` y la imagen del `<img>` de esa tarjeta.
- **Audio:** el reproductor muestra controles nativos; el usuario decide reproducir con sonido.

## Mientras no existan los archivos

La sección funciona igual: se ve el póster, el título y el botón "VER OPCIONES".
Al pulsar ▶ sin archivo, simplemente se mantiene el póster (sin errores visibles).

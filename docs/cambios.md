# Registro de cambios

Reorganización y profesionalización del proyecto. Agrupado por fase.
Fecha: 2026-07-31. Estado de partida documentado en [auditoria.md](auditoria.md).

**No se ejecutó ningún comando de git.** Todos los cambios son locales.

---

## Fase 0 — Preparación

- Copia de seguridad completa del proyecto en `../Team-page-backup/` (41 archivos)
  antes de mover nada.

## Fase 1 — Auditoría

- Inventario completo en `docs/auditoria.md`: 12 archivos, 42 defectos
  clasificados por severidad, 10 categorías.

## Fase 2 — Estructura

Movimientos (`CSS/`, `JS/` e `IMG/` eliminadas después de migrar):

| Antes | Después |
|---|---|
| `CSS/normalize.css` | Sustituido por el reset de `assets/css/base.css` |
| `CSS/styles.css` | Repartido en `base.css`, `layout.css`, `components.css` |
| `JS/script.js` | `assets/js/main.js` |
| `IMG/photo1.png` | `assets/img/content/bill-mahoney.webp` |
| `IMG/photo2.png` | `assets/img/content/saba-cabrera.webp` |
| `IMG/photo3.png` | `assets/img/content/shae-le.webp` |
| `IMG/photo4.png` | `assets/img/content/skylah-lu.webp` |
| `IMG/photo5.png` | `assets/img/content/griff-richards.webp` |
| `IMG/photo6.png` | `assets/img/content/stan-john.webp` |
| `IMG/icon.png` | `assets/img/logo/favicon.png` + `apple-touch-icon.png` |

Archivos nuevos: `404.html`, `robots.txt`, `sitemap.xml`, `.gitignore`,
`docs/auditoria.md`, `docs/cambios.md`.

**Decisión — no se creó `assets/js/modules/`.** El JavaScript del proyecto son
50 líneas con una sola responsabilidad. Partirlo en módulos ES exigiría
`type="module"`, que falla al abrir el archivo con `file://` por política CORS,
y el README documenta que la página debe abrirse así. Un único punto de entrada
cumple la regla sin romper ese caso.

**Decisión — no se creó `assets/fonts/`.** No existe ningún archivo de fuente en
el proyecto (ver más abajo).

## Fase 3 — Higiene

- Eliminado `CSS/normalize.css` (6,5 KB). Era normalize v8 modificado, escrito
  contra IE 10-11, y arrastraba tres añadidos ajenos a un reset: `img { cursor:
  pointer }` global, estilos de scrollbar y dos `@font-face` rotos. Sustituido
  por un reset moderno de ~30 líneas dentro de `base.css`.
- Eliminados los dos `@font-face` de Lora y Montserrat: apuntaban a
  `Lora/Lora-Regular.ttf` y `Montserrat/Montserrat-Regular.ttf;` — carpetas que
  no existen en el repositorio, la segunda además con un punto y coma dentro de
  `url()`. Ninguna de las dos fuentes se usaba en ninguna regla.
- Eliminada la personalización de scrollbar (`::-webkit-scrollbar`, 5 px de
  ancho). Un scrollbar de 5 px es difícil de agarrar con el ratón y la regla
  afectaba a toda la página, no solo al componente.
- Eliminada la dependencia de jQuery slim 3.0.0-beta1 desde cdnjs. Se usaba
  para `$(sel)`, `.click()` y `.toggleClass()`. Cero peticiones externas ahora.
- Creado `.gitignore` para un proyecto estático sin build.
- Normalizado el formato: 2 espacios de indentación, comillas dobles en HTML,
  punto y coma en JS, salto de línea final en todos los archivos.
- **No se encontraron credenciales, tokens ni claves de API.** Nada que extraer.

## Fase 4 — Imágenes

- Seis retratos convertidos de PNG a WebP con calidad 82. Se conservan las
  dimensiones originales (474-476 × 682-694 px), que ya eran adecuadas: la
  tarjeta las muestra a 245 px, así que quedan por encima del ancho necesario
  para pantallas 2x.

  | Archivo | Antes | Después | Reducción |
  |---|---|---|---|
  | bill-mahoney | 389,5 KB | 27,7 KB | −93 % |
  | saba-cabrera | 307,3 KB | 13,5 KB | −96 % |
  | shae-le | 365,9 KB | 17,6 KB | −95 % |
  | skylah-lu | 397,9 KB | 30,9 KB | −92 % |
  | griff-richards | 534,2 KB | 34,2 KB | −94 % |
  | stan-john | 456,3 KB | 34,0 KB | −93 % |
  | **Total retratos** | **2 451 KB** | **158 KB** | **−94 %** |

  No se conservan los PNG originales: no se declara ningún fallback, y WebP
  tiene soporte universal en los navegadores actuales.

- `icon.png` (1024 × 1024, 1 050 KB) reducido a `favicon.png` (96 × 96, 6,7 KB)
  y `apple-touch-icon.png` (180 × 180, 16,6 KB). Se descargaba 1 MB para
  dibujar 16 px.
- **Marca de agua eliminada del icono.** El original llevaba la franja de cinco
  cuadros de color de DALL·E en la esquina inferior derecha. Ocupaba el margen
  blanco por debajo del marco negro, así que se cubrió con blanco sin recortar
  nada del dibujo.
- `width` y `height` reales en las seis `<img>`, para que la tarjeta reserve su
  espacio antes de que llegue la imagen.
- `loading="lazy"` en las tres tarjetas de la segunda fila. Las tres primeras se
  cargan de inmediato por estar sobre el pliegue.
- `alt` descriptivo y distinto en cada retrato, sustituyendo el `alt="Integrante"`
  repetido seis veces y en español dentro de una página en inglés.
- **Imagen Open Graph creada**: `assets/img/content/og-team.jpg` (1200 × 630,
  82 KB). Compuesta exclusivamente con los seis retratos que ya estaban en el
  proyecto más el `<h1>` de la propia página. No se descargó ni se inventó
  ninguna imagen.

## Fase 5 — HTML, SEO y accesibilidad

- Estructura semántica: `<header>`, `<main>`, `<section>`, `<footer>`, y cada
  persona en su propio `<article>` dentro de una lista. Antes había un solo
  `<article>` envolviendo a las seis y ningún `<main>` ni `<footer>`.
- Eliminados `<body><br><br><br>` y los tres `<br>` del párrafo de cabecera.
  La separación vertical ahora es CSS.
- `<P>` en mayúsculas corregido a `<p>` en los seis sitios.
- `<title>` de 9 a 59 caracteres; `<meta name="description">` de 150; ambos
  únicos en cada una de las dos páginas.
- Open Graph completo (`og:type`, `og:title`, `og:description`, `og:url`,
  `og:image` con dimensiones y `alt`) y `twitter:card`.
- `<link rel="canonical">` en `index.html`.
- Jerarquía de encabezados sin saltos: un `h1`, dos `h2` (uno oculto que nombra
  la sección de equipo), seis `h3`.
- Enlace de salto al contenido, visible solo al recibir foco.
- Indicador de foco visible en todos los elementos interactivos, usando
  `currentColor` para que contraste tanto en las tarjetas claras como oscuras.
- `robots.txt` y `sitemap.xml` con la URL real del sitio.
- `<meta name="robots" content="noindex">` en `404.html`.
- **Contraste corregido.** El texto de las tarjetas 2 y 5 era negro sobre
  `dimgray` (#696969): 3,89:1, por debajo del mínimo de 4,5:1. Se pasó a texto
  blanco sobre el mismo gris: 5,49:1. Se conserva el color original del diseño.
- Corregida la gramática de la frase de cabecera, que tenía puntos donde iban
  comas y le faltaba un artículo. No se cambió el mensaje.
- «Tech Leader» pasa a «Tech Lead», que es lo que ya decía la biografía de esa
  misma tarjeta.
- `WHO WE ARE?` pasa a `Who we are` (con versalitas por CSS): era un encabezado
  afirmativo con signo de interrogación.

## Fase 6 — CSS y sistema de diseño

- 385 líneas con seis bloques repetidos sustituidas por tres archivos con una
  sola definición de cada componente. Los seis `.Caja-N` y los seis
  `.OrderN p:nth-child(3)` son ahora `.team-card` y `.team-card__bio`.
- Variables en `:root` para color, espaciado, tipografía, sombra, radio y
  transición.
- **La paleta se deriva de la que ya usaba el sitio**: blanco, `dimgray`
  (#696969) y el negro casi opaco de la superposición. No se inventó ninguna
  identidad nueva.
- **Tipografía**: Georgia para los títulos y la pila sans del sistema para el
  texto. Es la traducción a fuentes locales del par serif + sans que el CSS
  original declaraba (Lora + Montserrat) pero nunca llegó a servir, y evita
  cualquier petición de red.
- Escala de espaciado de 4/8/16/24/32/48/64/96 px. Desaparecen los valores
  sueltos tipo `margin: 75px 9px` o `margin-left: -50px`.
- Eliminado `cursor: #f9f9f9`, propiedad inválida repetida seis veces.
- Eliminadas las alturas fijas: las tarjetas tenían `height: 330px`/`340px` y
  los paneles de descripción `337px`/`343px` medidos a ojo. Ahora la tarjeta se
  adapta a su contenido y el panel se ancla con `inset: 0` al marco de la foto.
- Cero `!important` salvo el bloque de `prefers-reduced-motion`, donde es el
  patrón estándar. Ningún selector pasa de tres niveles. Ningún estilo inline.
- Orden dentro de cada archivo: variables → reset → base → layout →
  componentes → utilidades → media queries.

## Fase 7 — Responsive

- Invertido a mobile-first: todas las media queries usan `min-width`. Antes eran
  tres `max-width` con valores arbitrarios (600, 805, 1000).
- **Corregido un desbordamiento propio detectado en navegador**: la foto no
  encogía dentro del marco flex, así que la etiqueta vertical de rol se salía de
  la tarjeta. En las tarjetas oscuras el texto era blanco y caía sobre el fondo
  blanco de la página, quedando invisible. Resuelto con `min-width: 0` en la
  imagen.
- **Corregido el recorte de las biografías**: con columnas a 480 px la tarjeta
  bajaba a 194 px y el texto no cabía en el panel. Las columnas pasan a
  introducirse a 768 px (dos) y 1024 px (tres), de modo que la tarjeta nunca
  baja de 288 px. Verificado sin recortes en 360, 480, 600, 768, 900, 1024,
  1280 y 1440 px.
- Sin scroll horizontal en ninguno de esos ocho anchos
  (`scrollWidth <= innerWidth` comprobado en cada uno).
- Área táctil del control de cada tarjeta: 272 × 351 px, muy por encima de
  44 × 44.
- El panel de descripción lleva `overflow-y: auto` y `overscroll-behavior:
  contain` como red de seguridad si alguien alarga el texto.

No hay menú de navegación en este proyecto —es una sola página sin enlaces
internos—, por lo que no aplica el punto de menú móvil.

## Fase 8 — UX / UI

- La jerarquía se lee de inmediato: título, quiénes somos, seis personas.
- Estados completos en los elementos interactivos: `hover`, `focus-visible`,
  `active`, con transiciones de 180 ms.
- **Solo una descripción abierta a la vez.** Antes se podían abrir las seis
  simultáneamente. Abrir una cierra la anterior.
- **`Escape` cierra la descripción abierta.** Antes no había forma de cerrar sin
  volver a hacer clic exactamente en la misma tarjeta.
- Ancho del párrafo de cabecera limitado a 42ch.
- Sin gradientes ni sombras marcadas: una sombra de tarjeta de 6 % de opacidad.

**No se añadió ningún formulario ni CTA.** El proyecto no tiene ningún servicio
conectado ni ningún correo o teléfono real, y la regla es no fingir que algo
funciona. Los únicos enlaces del sitio son los dos del pie, que llevan a
destinos reales.

## Fase 9 — JavaScript

- De 41 líneas con seis bloques `$(function(){})` idénticos a un solo módulo con
  un listener delegado en la rejilla.
- Eliminado jQuery. `toggleClass` → `classList.toggle`, `$(sel)` →
  `querySelector`, `.click()` → `addEventListener`.
- Envuelto en IIFE con `"use strict"`: cero variables globales, cero `var` en el
  ámbito global.
- Comprueba que `.team-grid` existe antes de operar y sale limpiamente si no.
- Eliminado el `e.preventDefault()` sobre `<div>`, que no prevenía nada.
- Eliminadas las seis líneas en blanco del final.
- Cero errores y cero avisos en consola, verificado en `index.html` y `404.html`,
  por `http://` y por `file://`.

## Fase 10 — Rendimiento

| Métrica | Antes | Después |
|---|---|---|
| Peso de primera carga | ~3 500 KB | **188 KB** |
| Peticiones | 11 (1 externa) | 12 (0 externas) |
| Scripts bloqueantes | 2 | 0 |
| Peticiones de fuentes | 2 rotas | 0 |

- `defer` en el único script.
- Cero webfonts: la tipografía es local, así que `font-display` y `preconnect`
  no aplican.
- Los tres archivos CSS suman 10,3 KB. No se fragmentan más ni se cargan de
  forma asíncrona: a ese tamaño, diferirlos solo produciría un parpadeo de
  estilos sin ganancia medible.

## Fase 11 — QA

Verificado en Chrome, sobre servidor local y sobre `file://`. Resultados en el
informe final.

## Fase 12 — Documentación

- `README.md` actualizado, no reescrito: se conservan el título, la descripción,
  el tono y la estructura del autor. Se corrigieron la tabla de stack, el árbol
  del proyecto y las rutas de la sección de uso, y se añadieron las secciones de
  accesibilidad y la nota sobre el dominio.
- Añadida la insignia de peso de primera carga.
- `docs/auditoria.md` y `docs/cambios.md` nuevos.

## Fase 13 — Deploy

- Verificado abriendo `index.html` directamente y con servidor local.
- Sin rutas absolutas de máquina local en ningún archivo.
- Todas las rutas internas relativas y en minúsculas.
- **No se creó configuración de hosting.** `DESTINO_DEPLOY` estaba vacío en el
  encargo, y un sitio estático sin build tampoco la necesita en Vercel: `404.html`
  se sirve solo.
- No se ejecutó ningún despliegue.

## Fase 14 — Promoción

- Bloque «Hire me» al final del `README.md`.
- Firma en el pie de las dos páginas, dentro del `<footer>` existente en el
  nuevo marcado. No se creó un segundo pie.
- Datos estructurados `Person` en JSON-LD en el `<head>` de `index.html`.

---

## Decisiones que conviene revisar

**El dominio.** `DOMINIO_PUBLICACION` llegó vacío en el encargo, pero el
`README.md` del propio repositorio ya declaraba el sitio publicado en
`https://teampage.wib.digital`. Se usó ese dominio —no es un valor inventado,
es el que el proyecto ya documentaba— en cuatro sitios: `canonical` y `og:url`
de `index.html`, `robots.txt` y `sitemap.xml`. Si el sitio vive en otra
dirección, hay que cambiarlo en esos cuatro puntos.

**El contenido.** Las seis personas son datos de muestra y el `<h1>` habla de un
equipo que no existe. Se conservaron porque son el contenido del componente y
porque eliminarlos dejaría el proyecto vacío, pero está declarado en el README.

# Auditoría inicial — Team-Page-UI

Fecha de la auditoría: 2026-07-31
Estado del proyecto en el momento de auditar: previo a la reorganización.

---

## 1. Inventario de archivos

### 1.1 HTML

| Archivo | `<title>` | `<h1>` | Propósito real | Estado |
|---|---|---|---|---|
| `index.html` | `Team page` | `The creative crew` | Única página. Sección de equipo con 6 tarjetas de personas | Funcional, marcado pobre |

No existía `404.html`.

### 1.2 CSS

| Archivo | Peso | ¿Se carga? | Observaciones |
|---|---|---|---|
| `CSS/normalize.css` | 6,5 KB | Sí (`index.html` línea 6) | Normalize v8.0.1 **modificado**: se le añadieron `html,body{height:100%}`, `img{cursor:pointer}`, estilos de scrollbar y dos `@font-face` rotos |
| `CSS/styles.css` | 6,1 KB | Sí (`index.html` línea 7) | 385 líneas, ~70 % duplicadas en seis bloques idénticos |

### 1.3 JavaScript

| Archivo | Peso | ¿Se carga? | Observaciones |
|---|---|---|---|
| `JS/script.js` | 0,9 KB | Sí (`index.html` línea 10) | 6 bloques `$(function(){})` idénticos salvo el número de tarjeta. 8 líneas útiles escritas 6 veces |

### 1.4 Imágenes

| Archivo | Dimensiones | Peso | Formato | ¿Se usa? | Ancho de render real |
|---|---|---|---|---|---|
| `IMG/icon.png` | 1024 × 1024 | **1050,6 KB** | PNG | Sí, como favicon | 16–32 px |
| `IMG/photo1.png` | 476 × 682 | 389,5 KB | PNG | Sí (Bill Mahoney) | ~229 px |
| `IMG/photo2.png` | 476 × 694 | 307,3 KB | PNG | Sí (Saba Cabrera) | ~229 px |
| `IMG/photo3.png` | 476 × 682 | 365,9 KB | PNG | Sí (Shae Le) | ~229 px |
| `IMG/photo4.png` | 474 × 682 | 397,9 KB | PNG | Sí (Skylah Lu) | ~229 px |
| `IMG/photo5.png` | 476 × 694 | 534,2 KB | PNG | Sí (Griff Richards) | ~229 px |
| `IMG/photo6.png` | 474 × 682 | 456,3 KB | PNG | Sí (Stan John) | ~229 px |

**Peso total de imágenes: 3 501 KB (3,4 MB).** Ninguna imagen huérfana: las siete se referencian.

### 1.5 Dependencias externas

| Dependencia | Origen | Uso real | Veredicto |
|---|---|---|---|
| jQuery slim **3.0.0-beta1** | `cdnjs.cloudflare.com` | Solo `$(selector)`, `.click()` y `.toggleClass()` | Eliminable. Versión **beta** de 2016 en producción |
| Fuente Lora | `@font-face` → `Lora/Lora-Regular.ttf` | Ninguno: no hay `font-family: Lora` en el CSS | Archivo inexistente. Petición rota |
| Fuente Montserrat | `@font-face` → `Montserrat/Montserrat-Regular.ttf;` | Ninguno | Archivo inexistente **y** sintaxis inválida (`;` dentro de `url()`) |

### 1.6 Archivos basura

Ninguno. No hay `.bak`, `.DS_Store`, `Thumbs.db`, `node_modules`, duplicados ni carpetas de versiones.

---

## 2. Defectos detectados

### 2.1 Rutas y referencias rotas

| Nº | Severidad | Archivo | Problema |
|---|---|---|---|
| 1 | Alta | `CSS/normalize.css:360` | `url(Lora/Lora-Regular.ttf)` — la carpeta `Lora/` no existe en el proyecto |
| 2 | Alta | `CSS/normalize.css:365` | `url(Montserrat/Montserrat-Regular.ttf;)` — carpeta inexistente y punto y coma dentro de `url()` |

No hay enlaces `<a>` en todo el sitio, por lo que no hay enlaces rotos. Las 7 rutas de imagen y las 3 de CSS/JS apuntan a archivos que sí existen.

### 2.2 CSS duplicado y muerto

| Nº | Severidad | Ubicación | Problema |
|---|---|---|---|
| 3 | Alta | `styles.css:67-191` | El bloque de descripción se repite **6 veces** con 12 propiedades idénticas cada vez. Solo cambia `height` (337 px / 343 px) |
| 4 | Alta | `styles.css:216-256` | `.Caja-1` … `.Caja-6`: seis reglas casi idénticas |
| 5 | Alta | `styles.css:300-382` | `.Caja-N > div`, `.Caja-N p:nth-child(2)` y `.Caja-N img` repetidos seis veces cada uno |
| 6 | Media | `styles.css:78, 99, 120, 141, 162, 183` | `cursor: #f9f9f9` — **propiedad inválida**: un color no es un valor de `cursor`. Ignorado por el navegador |
| 7 | Media | `normalize.css:343-356` | Scrollbar de 5 px de ancho: por debajo del mínimo usable con ratón |
| 8 | Baja | `normalize.css:139` | `img { cursor: pointer }` global: todas las imágenes fingen ser clicables |

Estimación: de las 385 líneas de `styles.css`, unas 270 son repetición mecánica.

### 2.3 Layout y responsive

| Nº | Severidad | Ubicación | Problema |
|---|---|---|---|
| 9 | Alta | `styles.css:32, 205` | `margin-left: -50px` en `.Header` y `.Content`. Descentra el contenido y empuja fuera del viewport |
| 10 | Alta | `styles.css:216-256` | Tarjetas con `height` fija (330 px / 340 px) y `width: 250px` fija. El contenido desborda si el texto crece |
| 11 | Alta | `styles.css:71, 92, 113, 134, 155, 176` | Panel de descripción con `height` fija de 337/343 px medida a ojo contra la imagen |
| 12 | Alta | `styles.css` (todo) | Media queries en `max-width` (600 / 805 / 1000 px): desktop-first, y con breakpoints arbitrarios |
| 13 | Media | `styles.css:279-298` | A 600 px las tarjetas llevan `margin: 10px 50px`: 100 px de margen lateral sobre un viewport de 360 px |

### 2.4 HTML

| Nº | Severidad | Ubicación | Problema |
|---|---|---|---|
| 14 | Alta | `index.html:13` | `<body><br><br><br>` — separación vertical con saltos de línea |
| 15 | Alta | `index.html` (todo) | No hay `<main>` ni `<footer>`. Un `<article>` envuelve a las seis personas, cuando cada persona es un artículo |
| 16 | Alta | `index.html:30,40,50,60,70,80` | Las seis imágenes comparten `alt="Integrante"`: no descriptivo, y en español en una página en inglés |
| 17 | Alta | `index.html` (todo) | Las tarjetas son `<div>` con `click` de jQuery: no accesibles por teclado, sin rol, sin `aria-expanded` |
| 18 | Media | `index.html:32,42,52,62,72,82` | Etiqueta `<P>` en mayúsculas |
| 19 | Media | `index.html:22` | Tres `<br>` dentro del párrafo para forzar saltos de línea |
| 20 | Media | `index.html` (todo) | Sin `width`/`height` en las imágenes: layout shift en carga |
| 21 | Baja | `index.html:21` | `<h2>WHO WE ARE?</h2>` — interrogación en un encabezado que no pregunta nada |

### 2.5 SEO y metadatos

| Nº | Severidad | Problema |
|---|---|---|
| 22 | Alta | `<title>Team page</title>` — 9 caracteres, genérico |
| 23 | Alta | Sin `<meta name="description">` |
| 24 | Alta | Sin Open Graph: al compartir el enlace no hay título, descripción ni imagen |
| 25 | Alta | Sin `robots.txt` ni `sitemap.xml` |
| 26 | Media | Sin `<link rel="canonical">` |
| 27 | Media | Favicon de 1 MB y 1024 × 1024 px para renderizarse a 16 px |

### 2.6 JavaScript

| Nº | Severidad | Ubicación | Problema |
|---|---|---|---|
| 28 | Alta | `script.js` (todo) | jQuery 3.0.0-beta1 cargado desde CDN para tres operaciones que el DOM nativo resuelve |
| 29 | Alta | `index.html:8,10` | Ambos scripts sin `defer`: bloquean el render |
| 30 | Media | `script.js` | Seis handlers `document.ready` en vez de uno con delegación |
| 31 | Media | `script.js` | `e.preventDefault()` sobre un `<div>` que no tiene comportamiento por defecto que prevenir |
| 32 | Baja | `script.js:43-48` | Seis líneas en blanco al final |

### 2.7 Rendimiento

| Nº | Severidad | Problema |
|---|---|---|
| 33 | Alta | Primera carga ≈ **3,5 MB**, dominada por PNG sin optimizar |
| 34 | Alta | `icon.png` (1 MB) se descarga entero para un favicon de 16 px |
| 35 | Media | Sin `loading="lazy"` en ninguna imagen |
| 36 | Media | 2 archivos CSS + 1 JS + 1 CDN = 4 peticiones bloqueantes |

### 2.8 Accesibilidad

| Nº | Severidad | Problema |
|---|---|---|
| 37 | Alta | Contenido interactivo inalcanzable por teclado (defecto 17) |
| 38 | Alta | Sin indicador de foco en ningún elemento |
| 39 | Alta | Texto negro sobre `dimgray` (#696969) en las tarjetas 2 y 5 = **3,89:1**. Mínimo exigido: 4,5:1 |
| 40 | Media | El panel de descripción aparece y desaparece sin anunciarse a lectores de pantalla |
| 41 | Baja | Sin `prefers-reduced-motion` pese a usar transiciones |

### 2.9 Contenido de relleno

| Nº | Severidad | Problema |
|---|---|---|
| 42 | Alta | Los seis nombres, retratos y biografías son datos de muestra. El propio README lo declara en «Known issues» |

No hay «Lorem ipsum» ni texto sobrante de ningún template comercial: el HTML está escrito a mano.

### 2.10 Seguridad

Sin hallazgos. No hay credenciales, tokens, claves de API ni endpoints privados en ningún archivo del proyecto.

---

## 3. Resumen (5 líneas)

1. **Qué es**: una página de equipo de una sola vista — encabezado, frase de grupo y seis tarjetas de personas cuya biografía se despliega al hacer clic. Es un componente de UI, no un sitio.
2. **Estado**: funciona en un navegador de escritorio moderno y el diseño tiene identidad propia (rejilla escalonada, rol en vertical, superposición negra), pero el código está en estado de ejercicio de aprendizaje.
3. **Lo más grave**: el peso. 3,5 MB de PNG para renderizar seis retratos a 229 px, con un favicon de 1 MB.
4. **Segundo más grave**: la interacción entera es inalcanzable por teclado y lector de pantalla, porque son `<div>` con un `click` de jQuery.
5. **Tercero**: dos `@font-face` apuntan a carpetas que no existen, uno de ellos con sintaxis inválida, y ninguna de las dos fuentes se usa en ningún sitio.

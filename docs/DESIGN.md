# Design: estilo C "Claro" con la paleta oficial del logo

Estructura y formas del estilo C que aprobó el cliente (redondeado, Plus Jakarta Sans, escalera de pasos). Los colores se pasaron después a los del logo oficial, que llegó una vez aprobado el estilo.

## Idea guía
Una escalera de cinco peldaños que sube hacia una bandera, con un roble joven al lado. Es la misma escalera de "Cómo funciona" (pasos 01 a 05) y se repite como motivo en el inicio.

## Color (OKLCH, estrategia Committed: el vino carga la página)
Paleta oficial del logo: vino `#86211C`, ámbar `#D28120`, arena `#DEB17E` y carbón `#221F1F`.
- Vino de marca: `--wine-800` (= #86211C). Escala `--wine-950` a `--wine-400`. Titulares, botones, íconos, el bloque de horario y la sección de cierre.
- Ámbar: `--amber-500` (≈ #D28120). Acento: sol, hojas del roble, último peldaño, subrayado del menú (`--amber-600`), botón sobre fondo oscuro y bandera.
- Arena: `--sand-300` (≈ #DEB17E) a `--sand-50`. Fondos claros, tarjetas, subrayado de marcador y números sobre fondo oscuro.
- Carbón: `--ink` para el texto; el fondo de "Cómo funciona" y del pie es un vino casi negro (`--wine-950`).
- Neutros tintados hacia el vino y el arena. Nada de #000 ni #fff.
- Ritmo de fondos: inicio crema, para quién papel (con logo de fondo), por qué arena, cómo funciona vino oscuro, preguntas crema, cierre vino (con logo blanco de fondo), pie vino oscuro.
- Contraste revisado con script (WCAG): todos los pares de texto cumplen 4.5:1 y los elementos gráficos 3:1.

## Logo
- Encabezado: horizontal sin lema, a color (`assets/img/logo-horizontal.png`).
- Pie: horizontal con lema, en blanco (`logo-horizontal-lema-blanco.png`).
- Fondo partido a la mitad: vertical a color en "¿Para quién?" (`.watermark`, 10 % de opacidad) y vertical en blanco en el cierre (`.closing-logo`, 14 %). Ambos están centrados sobre el borde derecho de la sección, así asoma solo la mitad.
- Íconos del navegador: escudo recortado del logo vertical (`favicon.ico`, `favicon-32.png`, `apple-touch-icon.png`).
- Los PNG están recortados al contenido; los originales con márgenes quedan fuera del repositorio.

## Tipografía
Plus Jakarta Sans (400 a 800). Titulares en 800 con tracking cerrado, cuerpo en 400 a 17 px. Escala fluida con `clamp()` solo en titulares. Sin segunda familia.

## Forma
Radio 14 px en botones y chips (como en la maqueta aprobada), 28 px en bloques grandes. Sin sombras fuertes, sin vidrio, sin bordes laterales de color.

## Movimiento
Entradas suaves con ease-out exponencial (reveal al hacer scroll), acordeón con animación de altura nativa, barra de progreso bajo el menú. Todo se apaga con `prefers-reduced-motion`.

## Componentes
Menú fijo con scrollspy, botón WhatsApp (se configura en un solo lugar: `assets/js/main.js`), chips de datos, lista de verificación, bento de 4 bloques distintos, escalera de pasos, acordeón `details` exclusivo, botón flotante de WhatsApp solo en celular.

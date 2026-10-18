# Design: estilo C "Claro" (aprobado por el cliente)

## Idea guía
Una escalera de cinco peldaños que sube hacia una bandera, con un roble joven al lado. Es la misma escalera de "Cómo funciona" (pasos 01 a 05) y se repite como motivo en el inicio y en el cierre.

## Color (OKLCH, estrategia Committed: el verde azulado y el coral cargan la página)
- Verde azulado de marca: `--teal-800` (≈ #0C5A5A). Escala `--teal-950` a `--teal-50`.
- Coral de acción: `--coral-600` (≈ #C8381C). Solo botones, la bandera final y el cierre.
- Amarillo sol: `--sun-400`, apenas para la bandera, el sol y un subrayado de marcador.
- Neutros tintados hacia el verde azulado. Nada de #000 ni #fff.
- Ritmo de fondos: inicio claro, para quién papel, por qué menta, cómo funciona verde profundo, preguntas claro, cierre coral, pie verde profundo.

## Tipografía
Plus Jakarta Sans (400 a 800). Titulares en 800 con tracking cerrado, cuerpo en 400 a 17 px. Escala fluida con `clamp()` solo en titulares. Sin segunda familia.

## Forma
Radio 14 px en botones y chips (como en la maqueta aprobada), 28 px en bloques grandes. Sin sombras fuertes, sin vidrio, sin bordes laterales de color.

## Movimiento
Entradas suaves con ease-out exponencial (reveal al hacer scroll), acordeón con animación de altura nativa, barra de progreso bajo el menú. Todo se apaga con `prefers-reduced-motion`.

## Componentes
Menú fijo con scrollspy, botón WhatsApp (se configura en un solo lugar: `assets/js/main.js`), chips de datos, lista de verificación, bento de 4 bloques distintos, escalera de pasos, acordeón `details` exclusivo, botón flotante de WhatsApp solo en celular.

# Almacén Bendición de Dios Uno — Sitio web

Sitio web para el Almacén Bendición de Dios Uno, fundado en 1996 en Santa Tecla, San Salvador. Vende ropa, zapatos, bisutería, perfumes, muebles y enseres para el hogar.

## Contenido del proyecto

```
index.html    → Estructura de todo el sitio (secciones, textos, íconos)
styles.css    → Colores, tipografía y estilos visuales
script.js     → Menú móvil, carrito de compras y catálogo de productos
```

Es un sitio estático: no necesita servidor, base de datos ni instalación. Basta con abrir `index.html` en el navegador, o subir los tres archivos a cualquier hosting.

## ⚠️ Datos de ejemplo que debes reemplazar

Todo el sitio funciona, pero varios datos están puestos como ejemplo para que veas cómo se ve. Antes de publicarlo, cambia:

| Dato | Dónde está | Cómo encontrarlo |
|---|---|---|
| Número de WhatsApp | `index.html` (4 lugares) y `script.js` (`NUMERO_WHATSAPP`) | Buscar `50373458821` |
| Horario de atención | `index.html`, sección "Ubicación" | Buscar `Lunes a sábado` |
| Dirección exacta | `index.html`, sección "Ubicación" | Buscar `Santa Tecla, La Libertad` |
| Mapa | `index.html`, `<iframe src="...google.com/maps...">` | Cambiar el texto después de `q=` por tu dirección exacta |
| Productos y precios | `script.js`, arreglo `PRODUCTOS` al inicio del archivo | Ver sección de abajo |

## Cómo editar el catálogo de productos

En `script.js`, al principio del archivo, está el arreglo `PRODUCTOS`. Cada producto es una línea así:

```js
{ id: "ropa-1", nombre: "Camisa casual hombre", categoria: "ropa", precio: 12.99, icono: "icon-ropa" },
```

- **id**: identificador único (no lo repitas en otro producto).
- **nombre**: lo que ve el cliente.
- **categoria**: debe ser una de estas, tal cual: `ropa`, `zapatos`, `bisuteria`, `perfumes`, `muebles`, `enseres`.
- **precio**: número, sin signo de dólar (ejemplo: `12.99`).
- **icono**: el ícono que se muestra mientras no haya foto real. Usa el que corresponda a la categoría (`icon-ropa`, `icon-zapatos`, `icon-bisuteria`, `icon-perfumes`, `icon-muebles`, `icon-enseres`).

Para **agregar un producto**, copia una línea, cámbiale el `id`, `nombre`, `categoria` y `precio`, y agrégala dentro del arreglo. Para **quitar uno**, borra su línea completa.

### Usar fotos reales en vez de íconos

Ahora mismo cada producto muestra un ícono de línea (no hay fotos). Cuando tengas fotos:

1. Crea una carpeta `imagenes/` junto a `index.html`.
2. Guarda ahí las fotos de los productos.
3. Pídeme que actualice `script.js` para que cada producto use una `<img>` en vez del ícono — es un cambio sencillo una vez tengas las fotos listas.

## Cómo funciona el carrito

- El cliente agrega productos con el botón "Agregar al carrito".
- El carrito se abre desde el ícono de la bolsa en el encabezado.
- No hay pago en línea: al presionar "Pedir por WhatsApp", se arma automáticamente un mensaje con la lista de productos, cantidades y total, y se abre WhatsApp con el chat del almacén listo para enviar.
- El carrito se guarda en el navegador del cliente (no en un servidor), así que si cierra la pestaña y vuelve, el carrito sigue ahí. Si abre el sitio desde otro celular o borra los datos del navegador, el carrito se reinicia.

## Publicar el sitio

Cualquiera de estas opciones funciona porque el sitio no necesita servidor especial:

- **Netlify / Vercel**: arrastrar la carpeta con los 3 archivos a su panel de "deploy".
- **GitHub Pages**: subir los archivos a un repositorio y activar Pages.
- **Hosting tradicional**: subir los 3 archivos por FTP a la carpeta raíz (`public_html` o similar).

## Cosas que se pueden agregar más adelante

- Fotos reales de los productos.
- Buscador de productos por nombre.
- Página o sección de ofertas destacadas.
- Formulario de contacto además del botón de WhatsApp.

Si quieres cualquiera de estos, con gusto te ayudo cuando lo necesites.

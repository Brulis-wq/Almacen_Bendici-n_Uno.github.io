// =========================================================
// Almacén Bendición de Dios Uno — interactividad del sitio
// =========================================================

/* ---------------------------------------------------------
   Catálogo de productos.
   ⚠️ NOMBRES Y PRECIOS SON DE EJEMPLO — reemplázalos por tu
   inventario real. "categoria" debe coincidir con los data-filtro
   de los botones en el HTML: ropa, zapatos, bisuteria, perfumes,
   muebles, enseres.
--------------------------------------------------------- */
const PRODUCTOS = [
  { id: "ropa-1", nombre: "Camisa casual hombre", categoria: "ropa", precio: 12.99, icono: "icon-ropa" },
  { id: "ropa-2", nombre: "Blusa dama", categoria: "ropa", precio: 10.50, icono: "icon-ropa" },
  { id: "ropa-3", nombre: "Pantalón de vestir", categoria: "ropa", precio: 18.00, icono: "icon-ropa" },
  { id: "ropa-4", nombre: "Vestido casual", categoria: "ropa", precio: 15.75, icono: "icon-ropa" },

  { id: "zapatos-1", nombre: "Tenis deportivos", categoria: "zapatos", precio: 22.00, icono: "icon-zapatos" },
  { id: "zapatos-2", nombre: "Zapato formal hombre", categoria: "zapatos", precio: 28.50, icono: "icon-zapatos" },
  { id: "zapatos-3", nombre: "Sandalias dama", categoria: "zapatos", precio: 9.99, icono: "icon-zapatos" },
  { id: "zapatos-4", nombre: "Botas para niño", categoria: "zapatos", precio: 16.00, icono: "icon-zapatos" },

  { id: "bisuteria-1", nombre: "Aretes de fantasía", categoria: "bisuteria", precio: 3.50, icono: "icon-bisuteria" },
  { id: "bisuteria-2", nombre: "Cadena dorada", categoria: "bisuteria", precio: 7.25, icono: "icon-bisuteria" },
  { id: "bisuteria-3", nombre: "Anillo ajustable", categoria: "bisuteria", precio: 2.99, icono: "icon-bisuteria" },
  { id: "bisuteria-4", nombre: "Set de pulseras x3", categoria: "bisuteria", precio: 4.50, icono: "icon-bisuteria" },

  { id: "perfumes-1", nombre: "Perfume dama 100ml", categoria: "perfumes", precio: 14.00, icono: "icon-perfumes" },
  { id: "perfumes-2", nombre: "Perfume caballero 100ml", categoria: "perfumes", precio: 14.00, icono: "icon-perfumes" },
  { id: "perfumes-3", nombre: "Splash corporal", categoria: "perfumes", precio: 6.50, icono: "icon-perfumes" },
  { id: "perfumes-4", nombre: "Mini perfume de viaje", categoria: "perfumes", precio: 5.00, icono: "icon-perfumes" },

  { id: "muebles-1", nombre: "Silla de comedor", categoria: "muebles", precio: 35.00, icono: "icon-muebles" },
  { id: "muebles-2", nombre: "Mesa de centro", categoria: "muebles", precio: 60.00, icono: "icon-muebles" },
  { id: "muebles-3", nombre: "Sillón individual", categoria: "muebles", precio: 95.00, icono: "icon-muebles" },
  { id: "muebles-4", nombre: "Repisa flotante", categoria: "muebles", precio: 18.50, icono: "icon-muebles" },

  { id: "enseres-1", nombre: "Juego de ollas x5", categoria: "enseres", precio: 28.00, icono: "icon-enseres" },
  { id: "enseres-2", nombre: "Set de vasos x6", categoria: "enseres", precio: 8.00, icono: "icon-enseres" },
  { id: "enseres-3", nombre: "Escoba y recogedor", categoria: "enseres", precio: 4.25, icono: "icon-enseres" },
  { id: "enseres-4", nombre: "Organizador de cocina", categoria: "enseres", precio: 6.75, icono: "icon-enseres" },
];

// Acento visual por categoría (coincide con las tarjetas de "Departamentos")
const ACENTO_POR_CATEGORIA = {
  ropa: "acento-vino",
  zapatos: "acento-verde",
  bisuteria: "acento-dorado",
  perfumes: "acento-dorado",
  muebles: "acento-verde",
  enseres: "acento-vino",
};

const NOMBRE_CATEGORIA = {
  ropa: "Ropa",
  zapatos: "Zapatos",
  bisuteria: "Bisutería",
  perfumes: "Perfumes",
  muebles: "Muebles",
  enseres: "Enseres del hogar",
};

const NUMERO_WHATSAPP = "50373458821"; // ⚠️ Reemplazar por el número real del almacén
const CLAVE_CARRITO = "abd1-carrito"; // clave de almacenamiento local del carrito

const formatoDinero = (monto) => `$${monto.toFixed(2)}`;

/* ---------------------------------------------------------
   Estado del carrito (persistido en el navegador del cliente)
--------------------------------------------------------- */
function leerCarrito() {
  try {
    const guardado = localStorage.getItem(CLAVE_CARRITO);
    return guardado ? JSON.parse(guardado) : {};
  } catch (error) {
    return {};
  }
}

function guardarCarrito(carrito) {
  try {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  } catch (error) {
    // Si el almacenamiento local no está disponible, el carrito
    // sigue funcionando en memoria durante la sesión.
  }
}

let carrito = leerCarrito(); // { [idProducto]: cantidad }

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Menú móvil ---------- */
  const navToggle = document.getElementById("nav-toggle");
  const siteNav = document.getElementById("site-nav");

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      const abierto = siteNav.getAttribute("data-open") === "true";
      siteNav.setAttribute("data-open", String(!abierto));
      navToggle.setAttribute("aria-expanded", String(!abierto));
      navToggle.setAttribute("aria-label", abierto ? "Abrir menú" : "Cerrar menú");
    });

    siteNav.querySelectorAll(".nav-link").forEach((enlace) => {
      enlace.addEventListener("click", () => {
        siteNav.setAttribute("data-open", "false");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Abrir menú");
      });
    });
  }

  /* ---------- Resaltar el enlace de la sección visible ---------- */
  const secciones = document.querySelectorAll("main section[id], header[id]");
  const enlacesNav = document.querySelectorAll(".nav-link");

  if (secciones.length && enlacesNav.length && "IntersectionObserver" in window) {
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            const id = entrada.target.getAttribute("id");
            enlacesNav.forEach((enlace) => {
              enlace.classList.toggle("activo", enlace.getAttribute("href") === `#${id}`);
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    secciones.forEach((seccion) => observador.observe(seccion));
  }

  /* ---------- Botón volver arriba ---------- */
  const volverArriba = document.getElementById("volver-arriba");

  if (volverArriba) {
    const alternarVisibilidad = () => {
      volverArriba.classList.toggle("visible", window.scrollY > 480);
    };
    alternarVisibilidad();
    window.addEventListener("scroll", alternarVisibilidad, { passive: true });

    volverArriba.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Año dinámico en el pie de página ---------- */
  const anioActual = document.getElementById("anio-actual");
  if (anioActual) {
    anioActual.textContent = new Date().getFullYear();
  }

  /* ================= TIENDA Y CARRITO ================= */

  const gridProductos = document.getElementById("grid-productos");
  const filtros = document.querySelectorAll(".filtro");
  const btnCarrito = document.getElementById("btn-carrito");
  const carritoContador = document.getElementById("carrito-contador");
  const carritoFondo = document.getElementById("carrito-fondo");
  const carritoPanel = document.getElementById("carrito-panel");
  const carritoCerrar = document.getElementById("carrito-cerrar");
  const carritoLista = document.getElementById("carrito-lista");
  const carritoVacio = document.getElementById("carrito-vacio");
  const carritoResumen = document.getElementById("carrito-resumen");
  const carritoTotalMonto = document.getElementById("carrito-total-monto");
  const carritoPedir = document.getElementById("carrito-pedir");
  const carritoVaciar = document.getElementById("carrito-vaciar");

  function buscarProducto(id) {
    return PRODUCTOS.find((producto) => producto.id === id);
  }

  function renderizarProductos(categoria) {
    if (!gridProductos) return;

    const lista = categoria === "todos"
      ? PRODUCTOS
      : PRODUCTOS.filter((producto) => producto.categoria === categoria);

    gridProductos.innerHTML = lista.map((producto) => `
      <article class="tarjeta-producto" data-id="${producto.id}">
        <div class="producto-visual ${ACENTO_POR_CATEGORIA[producto.categoria]}">
          <svg><use href="#${producto.icono}"></use></svg>
        </div>
        <div class="producto-info">
          <span class="producto-categoria">${NOMBRE_CATEGORIA[producto.categoria]}</span>
          <p class="producto-nombre">${producto.nombre}</p>
          <p class="producto-precio">${formatoDinero(producto.precio)}</p>
          <button class="producto-agregar" data-id="${producto.id}">Agregar al carrito</button>
        </div>
      </article>
    `).join("");
  }

  if (filtros.length) {
    filtros.forEach((boton) => {
      boton.addEventListener("click", () => {
        filtros.forEach((otro) => {
          otro.classList.remove("activo");
          otro.setAttribute("aria-selected", "false");
        });
        boton.classList.add("activo");
        boton.setAttribute("aria-selected", "true");
        renderizarProductos(boton.dataset.filtro);
      });
    });
  }

  renderizarProductos("todos");

  // Delegación de eventos: "Agregar al carrito" en cualquier tarjeta
  if (gridProductos) {
    gridProductos.addEventListener("click", (evento) => {
      const boton = evento.target.closest(".producto-agregar");
      if (!boton) return;

      const id = boton.dataset.id;
      carrito[id] = (carrito[id] || 0) + 1;
      guardarCarrito(carrito);
      actualizarCarritoUI();

      boton.textContent = "Agregado ✓";
      boton.classList.add("agregado");
      setTimeout(() => {
        boton.textContent = "Agregar al carrito";
        boton.classList.remove("agregado");
      }, 900);
    });
  }

  function totalUnidadesCarrito() {
    return Object.values(carrito).reduce((suma, cantidad) => suma + cantidad, 0);
  }

  function totalMontoCarrito() {
    return Object.entries(carrito).reduce((suma, [id, cantidad]) => {
      const producto = buscarProducto(id);
      return producto ? suma + producto.precio * cantidad : suma;
    }, 0);
  }

  function construirMensajeWhatsapp() {
    const lineas = Object.entries(carrito).map(([id, cantidad]) => {
      const producto = buscarProducto(id);
      if (!producto) return "";
      return `• ${producto.nombre} x${cantidad} — ${formatoDinero(producto.precio * cantidad)}`;
    }).filter(Boolean);

    const total = formatoDinero(totalMontoCarrito());
    const mensaje = [
      "Hola, quisiera hacer un pedido en Almacén Bendición de Dios Uno:",
      "",
      ...lineas,
      "",
      `Total estimado: ${total}`,
    ].join("\n");

    return `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
  }

  function renderizarCarrito() {
    const items = Object.entries(carrito).filter(([id]) => buscarProducto(id));

    if (!items.length) {
      if (carritoLista) carritoLista.hidden = true;
      if (carritoResumen) carritoResumen.hidden = true;
      if (carritoVacio) carritoVacio.hidden = false;
      return;
    }

    if (carritoVacio) carritoVacio.hidden = true;
    if (carritoLista) carritoLista.hidden = false;
    if (carritoResumen) carritoResumen.hidden = false;

    if (carritoLista) {
      carritoLista.innerHTML = items.map(([id, cantidad]) => {
        const producto = buscarProducto(id);
        return `
          <div class="item-carrito" data-id="${id}">
            <div class="item-visual ${ACENTO_POR_CATEGORIA[producto.categoria]}">
              <svg><use href="#${producto.icono}"></use></svg>
            </div>
            <div class="item-detalle">
              <p>${producto.nombre}</p>
              <span>${formatoDinero(producto.precio)} c/u</span>
            </div>
            <div class="item-cantidad">
              <button class="item-restar" data-id="${id}" aria-label="Quitar una unidad">
                <svg width="12" height="12"><use href="#icon-menos"></use></svg>
              </button>
              <span>${cantidad}</span>
              <button class="item-sumar" data-id="${id}" aria-label="Agregar una unidad">
                <svg width="12" height="12"><use href="#icon-mas"></use></svg>
              </button>
            </div>
            <button class="item-quitar" data-id="${id}" aria-label="Eliminar del carrito">
              <svg width="17" height="17"><use href="#icon-basura"></use></svg>
            </button>
          </div>
        `;
      }).join("");
    }

    if (carritoTotalMonto) carritoTotalMonto.textContent = formatoDinero(totalMontoCarrito());
    if (carritoPedir) carritoPedir.href = construirMensajeWhatsapp();
  }

  function actualizarCarritoUI() {
    const totalUnidades = totalUnidadesCarrito();
    if (carritoContador) {
      carritoContador.textContent = String(totalUnidades);
      carritoContador.hidden = totalUnidades === 0;
    }
    renderizarCarrito();
  }

  function abrirCarrito() {
    if (!carritoPanel || !carritoFondo) return;
    carritoFondo.hidden = false;
    carritoPanel.hidden = false;
    requestAnimationFrame(() => carritoPanel.classList.add("abierto"));
    document.body.style.overflow = "hidden";
  }

  function cerrarCarrito() {
    if (!carritoPanel || !carritoFondo) return;
    carritoPanel.classList.remove("abierto");
    document.body.style.overflow = "";
    setTimeout(() => {
      carritoPanel.hidden = true;
      carritoFondo.hidden = true;
    }, 250);
  }

  if (btnCarrito) btnCarrito.addEventListener("click", abrirCarrito);
  if (carritoCerrar) carritoCerrar.addEventListener("click", cerrarCarrito);
  if (carritoFondo) carritoFondo.addEventListener("click", cerrarCarrito);

  if (carritoLista) {
    carritoLista.addEventListener("click", (evento) => {
      const sumar = evento.target.closest(".item-sumar");
      const restar = evento.target.closest(".item-restar");
      const quitar = evento.target.closest(".item-quitar");

      if (sumar) {
        const id = sumar.dataset.id;
        carrito[id] = (carrito[id] || 0) + 1;
      } else if (restar) {
        const id = restar.dataset.id;
        carrito[id] = (carrito[id] || 0) - 1;
        if (carrito[id] <= 0) delete carrito[id];
      } else if (quitar) {
        delete carrito[quitar.dataset.id];
      } else {
        return;
      }

      guardarCarrito(carrito);
      actualizarCarritoUI();
    });
  }

  if (carritoVaciar) {
    carritoVaciar.addEventListener("click", () => {
      carrito = {};
      guardarCarrito(carrito);
      actualizarCarritoUI();
    });
  }

  actualizarCarritoUI();

});

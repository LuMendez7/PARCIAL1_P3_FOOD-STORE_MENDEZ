import { PRODUCTS, getCategories } from "../../../data/data";

const contenedor = document.getElementById("productos") as HTMLElement;
const buscador = document.getElementById("buscador") as HTMLInputElement;
const contCategorias = document.getElementById("categorias") as HTMLElement;

let productosActuales = [...PRODUCTS];

contenedor.style.display = "flex";
contenedor.style.flexWrap = "wrap";
contenedor.style.gap = "15px";

function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");

  const total = carrito.reduce((acc: number, prod: any) => {
    return acc + prod.cantidad;
  }, 0);

  const span = document.getElementById("contador-carrito");
  if (span) {
    span.textContent = total > 0 ? total.toString() : "0";
  }
}

function mostrarMensaje(texto: string) {
  const mensaje = document.createElement("div");

  mensaje.textContent = texto;
  mensaje.style.position = "fixed";
  mensaje.style.bottom = "20px";
  mensaje.style.right = "20px";
  mensaje.style.background = "#22c55e";
  mensaje.style.color = "white";
  mensaje.style.padding = "10px 15px";
  mensaje.style.borderRadius = "8px";
  mensaje.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
  mensaje.style.zIndex = "999";

  document.body.appendChild(mensaje);

  setTimeout(() => mensaje.remove(), 2000);
}

function renderProductos(lista: any[]) {
  contenedor.innerHTML = "";

  if (lista.length === 0) {
    contenedor.innerHTML = "<p>No hay productos</p>";
    return;
  }

  lista.forEach((prod: any) => {
    const div = document.createElement("div");

    div.innerHTML = `
      <div style="
        border:1px solid #d1fae5;
        padding:10px;
        width:200px;
        border-radius:12px;
        background:#ffffff;
        box-shadow:0 4px 8px rgba(0,0,0,0.1);
        transition:0.3s;
      ">
        <img src="${prod.imagen}" style="width:100%; height:150px; object-fit:cover; border-radius:8px;" />
        
        <h3 style="color:#065f46; margin:8px 0 4px 0;">
          ${prod.nombre}
        </h3>

        <p style="
          margin:0;
          font-size:12px;
          color:#6b7280;
        ">
          ${prod.descripcion ?? ""}
        </p>
        
        <p style="color:#047857; font-weight:bold; margin:8px 0;">
          $${prod.precio}
        </p>

        <!-- BOTÓN CENTRADO CON + -->
        <div style="
          display:flex;
          justify-content:center;
          margin-top:10px;
        ">
          <button style="
            background:#22c55e;
            color:white;
            border:none;
            padding:6px 12px;
            border-radius:8px;
            cursor:pointer;
            display:flex;
            align-items:center;
            gap:6px;
            font-weight:bold;
          ">
            <span style="
              width:18px;
              height:18px;
              display:flex;
              align-items:center;
              justify-content:center;
              background:white;
              color:#22c55e;
              border-radius:50%;
              font-weight:bold;
              font-size:14px;
            ">
              +
            </span>
            Agregar
          </button>
        </div>

      </div>
    `;

    div.querySelector("button")!.addEventListener("click", () => {
      agregarAlCarrito(prod);
    });

    contenedor.appendChild(div);
  });
}

function agregarAlCarrito(prod: any) {
  let carrito = JSON.parse(localStorage.getItem("carrito") || "[]");

  const existe = carrito.find((p: any) => p.id === prod.id);

  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({ ...prod, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));

  mostrarMensaje("Producto agregado 🛒");
  actualizarContadorCarrito();
}

buscador.addEventListener("input", () => {
  const texto = buscador.value.toLowerCase();

  const filtrados = productosActuales.filter(p =>
    p.nombre.toLowerCase().includes(texto)
  );

  renderProductos(filtrados);
});

function renderCategorias() {
  const categorias = getCategories();

  categorias.forEach(cat => {
    const btn = document.createElement("button");
    btn.textContent = cat;

    btn.style.margin = "5px";
    btn.style.padding = "6px 12px";
    btn.style.cursor = "pointer";
    btn.style.borderRadius = "6px";
    btn.style.border = "none";
    btn.style.background = "#a7f3d0";
    btn.style.color = "#065f46";

    btn.addEventListener("click", () => {
      if (cat.toLowerCase() === "todos") {
        productosActuales = [...PRODUCTS];
      } else {
        productosActuales = PRODUCTS.filter(p =>
          p.categoria.toLowerCase() === cat.toLowerCase()
        );
      }

      renderProductos(productosActuales);
    });

    contCategorias.appendChild(btn);
  });
}

renderCategorias();
renderProductos(PRODUCTS);
actualizarContadorCarrito();
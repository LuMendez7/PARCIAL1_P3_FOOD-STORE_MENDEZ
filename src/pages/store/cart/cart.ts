const contenedor = document.getElementById("lista-carrito") as HTMLElement;
const subtotalSpan = document.getElementById("subtotal") as HTMLElement;
const totalSpan = document.getElementById("total") as HTMLElement;
const btnVaciar = document.getElementById("vaciar") as HTMLButtonElement;
const btnFinalizar = document.getElementById("finalizar") as HTMLButtonElement;

function formatearPrecio(num: number): string {
  return num.toLocaleString("es-AR");
}

function getCarrito() {
  return JSON.parse(localStorage.getItem("carrito") || "[]");
}

function setCarrito(carrito: any[]) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function renderCarrito() {
  const carrito = getCarrito();
  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.innerHTML = `
      <div style="text-align:center; color:#065f46;">
        <h2>🛒</h2>
        <p>Tu carrito está vacío</p>
      </div>
    `;
    subtotalSpan.textContent = "0";
    totalSpan.textContent = "0";
    btnFinalizar.disabled = true;
    return;
  }

  btnFinalizar.disabled = false;

  let subtotal = 0;

  carrito.forEach((prod: any) => {
    subtotal += prod.precio * prod.cantidad;

    const div = document.createElement("div");

    div.innerHTML = `
      <div style="
        display:flex;
        gap:12px;
        background:white;
        padding:10px;
        margin-bottom:10px;
        border-radius:12px;
        box-shadow:0 2px 5px rgba(0,0,0,0.08);
        align-items:center;
        max-width:550px;
      ">

        <img src="${prod.imagen}" style="
          width:65px;
          height:65px;
          object-fit:cover;
          border-radius:8px;
        " />

        <div style="flex:1;">
          <h3 style="margin:0; color:#065f46; font-size:14px;">${prod.nombre}</h3>
          <p style="margin:4px 0; color:#047857;">$${formatearPrecio(prod.precio)}</p>
        </div>

        <div style="display:flex; flex-direction:column; align-items:center; gap:5px;">

          <div style="
            display:flex;
            align-items:center;
            gap:6px;
            background:#ecfdf5;
            padding:4px 6px;
            border-radius:6px;
          ">
            <button data-id="${prod.id}" class="menos">-</button>
            <span>${prod.cantidad}</span>
            <button data-id="${prod.id}" class="mas">+</button>
          </div>

          <button data-id="${prod.id}" class="eliminar" style="
            background:none;
            border:none;
            color:#ef4444;
            cursor:pointer;
            font-size:12px;
          ">
            Eliminar
          </button>

        </div>

      </div>
    `;

    contenedor.appendChild(div);
  });

  subtotalSpan.textContent = formatearPrecio(subtotal);
  totalSpan.textContent = formatearPrecio(subtotal);

  agregarEventos();
}

function agregarEventos() {
  const carrito = getCarrito();

  document.querySelectorAll(".mas").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number((btn as HTMLElement).dataset.id);
      const prod = carrito.find((p: any) => p.id === id);
      if (!prod) return;

      prod.cantidad++;
      setCarrito(carrito);
      renderCarrito();
    });
  });

  document.querySelectorAll(".menos").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number((btn as HTMLElement).dataset.id);
      const prod = carrito.find((p: any) => p.id === id);
      if (!prod) return;

      if (prod.cantidad > 1) {
        prod.cantidad--;
      } else {
        const index = carrito.findIndex((p: any) => p.id === id);
        carrito.splice(index, 1);
      }

      setCarrito(carrito);
      renderCarrito();
    });
  });

  document.querySelectorAll(".eliminar").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number((btn as HTMLElement).dataset.id);
      const nuevoCarrito = carrito.filter((p: any) => p.id !== id);
      setCarrito(nuevoCarrito);
      renderCarrito();
    });
  });
}

btnVaciar.addEventListener("click", () => {
  localStorage.removeItem("carrito");
  renderCarrito();
});

btnFinalizar.addEventListener("click", () => {
  alert("Compra realizada con éxito ✅");
  localStorage.removeItem("carrito");
  renderCarrito();
});

renderCarrito();
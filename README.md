# 🛒 Food Store

## 📌 Descripción del proyecto

Food Store es una aplicación web de tienda online desarrollada con HTML, CSS y TypeScript utilizando Vite. Permite visualizar productos, filtrarlos por categoría, buscarlos y agregarlos a un carrito de compras con persistencia en localStorage.

El usuario puede navegar entre el catálogo y el carrito, modificar cantidades y ver el total actualizado en tiempo real.

---

## 🚀 Funcionalidades principales

- 🔐 Sistema de login de usuario con validación en localStorage
- 🛍️ Catálogo dinámico de productos
- 🔎 Buscador en tiempo real por nombre
- 🏷️ Filtro de productos por categoría
- 🛒 Carrito de compras persistente
- ➕➖ Incremento y decremento de cantidades
- 🧮 Cálculo automático de subtotal y total
- 💾 Persistencia de datos mediante localStorage
- 🔁 Navegación entre vistas (Home / Carrito)

---

## 🚀 Ejecución del proyecto

npm install  
npm run dev  

Abrir:
http://localhost:5173/

---

## 📁 Estructura del proyecto

src/
 ├── pages/
 │    └── store/
 │         ├── home/
 │         │     ├── home.html   ← Catálogo de productos
 │         │     └── home.ts     ← Lógica: render, búsqueda, filtros
 │         │
 │         └── cart/
 │               ├── cart.html   ← Vista del carrito
 │               └── cart.ts     ← Lógica: render, cantidades, total
 │
 ├── types/
 │     ├── product.ts    ← Interfaces Product y CartItem
 │     └── categoria.ts  ← Interface Icategoria
 │
 └── data/
       └── data.ts       ← PRODUCTS y getCategories()

---

## 🔗 Repositorio

https://github.com/LuMendez7/PARCIAL1_P3_FOOD-STORE_MENDEZ

---
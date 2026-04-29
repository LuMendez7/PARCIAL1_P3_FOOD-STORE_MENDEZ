export const PRODUCTS = [
  {
    id: 1,
    nombre: "Hamburguesa",
    precio: 2500,
    categoria: "Comida",
    imagen: "/src/assets/hamburguesa.webp",
    descripcion: "Hamburguesa triple"
  },
  {
    id: 2,
    nombre: "Pizza",
    precio: 3000,
    categoria: "Comida",
    imagen: "/src/assets/pizza.webp",
    descripcion: "Pizza de muzzarella"
  },
  {
    id: 3,
    nombre: "Coca Cola",
    precio: 1500,
    categoria: "Bebida",
    imagen: "/src/assets/coca.jpg",
    descripcion: "Botella de 500ml"
  },
  {
    id: 4,
    nombre: "Papas",
    precio: 1800,
    categoria: "Comida",
    imagen: "/src/assets/papas.webp",
    descripcion: "Papas fritas con cheddar"
  }
];

export function getCategories() {
  return ["Todos", "Comida", "Bebida"];
}
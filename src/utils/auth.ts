import type { IUser } from "../types/IUser";
import type { Rol } from "../types/Rol";
import { getUSer, removeUser } from "./localStorage";
import { navigate } from "./navigate";

export const checkAuhtUser = (
  redireccion1: string, // Ruta al login
  redireccion2: string, // Ruta por error de rol (ej. home de cliente)
  rol: Rol
) => {
  console.log("comienzo de checkeo");

  const user = getUSer();
  const currentPath = window.location.pathname;

  if (!user) {
    console.log("no existe en local");
    
    if (!currentPath.includes(redireccion1)) {
      navigate(redireccion1);
    }
    return;
  } 

  console.log("Usuario detectado, verificando permisos...");
  const parseUser: IUser = JSON.parse(user);

  if (parseUser.role !== rol) {
    console.log("Existe pero no tiene el rol necesario");
    
    if (!currentPath.includes(redireccion2)) {
      navigate(redireccion2);
    }
    return;
  }

  console.log("Acceso permitido para el rol:", rol);
};

export const logout = () => {
  removeUser();
  navigate("/src/pages/auth/login/login.html");
};
import type { IUser } from "../../../types/IUser";

const loginUsuario = (email: string, pass: string) => {
    const usuarios: IUser[] = JSON.parse(localStorage.getItem('users') || '[]');

    const usuarioEncontrado = usuarios.find(
        u => u.email === email && u.password === pass
    );

    if (usuarioEncontrado) {
        localStorage.setItem('userData', JSON.stringify(usuarioEncontrado));

        alert("¡Bienvenido!");

        // ✔ REDIRECCIÓN CORRECTA EN VITE
        window.location.href = "/src/pages/store/home/home.html";
    } else {
        alert("Correo o contraseña incorrectos.");
    }
};

// ✔ EVITAR PROBLEMAS DE ELEMENTOS NULL
const btnIngresar = document.getElementById('btnIngresar') as HTMLButtonElement | null;
const inputEmail = document.getElementById('loginEmail') as HTMLInputElement | null;
const inputPass = document.getElementById('loginPass') as HTMLInputElement | null;

// ✔ BLOQUEO SI NO EXISTEN ELEMENTOS
if (btnIngresar && inputEmail && inputPass) {
    btnIngresar.addEventListener('click', () => {
        const email = inputEmail.value.trim();
        const pass = inputPass.value.trim();

        if (!email || !pass) {
            alert("Por favor, completa ambos campos.");
            return;
        }

        loginUsuario(email, pass);
    });
}

/* 🔥 IMPORTANTE: EVITAR BUCLE AL ENTRAR AL LOGIN */
const user = localStorage.getItem("userData");

if (user) {
    // Si ya está logueado, no volver al login
    window.location.href = "/src/pages/store/home/home.html";
}
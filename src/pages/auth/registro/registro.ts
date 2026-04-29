import type { IUser } from "../../../types/IUser";

const registrarUsuario = (email: string, pass: string) => {
    const usuariosActuales: IUser[] = JSON.parse(localStorage.getItem('users') || '[]');

    const existe = usuariosActuales.some(u => u.email === email);
    if (existe) {
        alert("Este correo electrónico ya está registrado.");
        return;
    }

    const nuevoUsuario: IUser = {
        email: email,
        password: pass,
        role: 'client' 
    };

    usuariosActuales.push(nuevoUsuario);
    localStorage.setItem('users', JSON.stringify(usuariosActuales));
    
    alert("Usuario registrado con éxito");
    
    window.location.href = "../login/login.html"; 
};

const inputEmail = document.getElementById('email') as HTMLInputElement;
const inputPass = document.getElementById('password') as HTMLInputElement;
const btnRegistrar = document.getElementById('btnRegistrar') as HTMLButtonElement;

if (btnRegistrar) {
    btnRegistrar.addEventListener('click', () => {
        const email = inputEmail.value;
        const pass = inputPass.value;

        if (email && pass) {
            registrarUsuario(email, pass);
        } else {
            alert("Por favor, completa todos los campos para continuar.");
        }
    });
}
import { CRMController } from "./controllers/crm.controller";
import type { Usuario } from './models/interfaces';

// Instanciamos el motor (creamos el objeto en memoria)
const miEscuelaCRM = new CRMController("1.0.0");

console.log("Versión del CRM: ", miEscuelaCRM.verVersion());
// miEscuelaCRM.usuariosDelCentro = [];

// Usamos sus métodos
const profesores = miEscuelaCRM.filtrarUsuarioPorRol("profesor");

console.log("Profesores del centro:", profesores);

const newUser1: Usuario = {
    id: 1,
    nombre: 'Ana Martínez',
    rol: 'profesor',
    activo: true
};

miEscuelaCRM.agregarUsuario(newUser1);

/* const newUser2: Usuario = {
    id: 19,
    nombre: 'Denis Peña',
    rol: 'alumno',
    activo: false
};


miEscuelaCRM.agregarUsuario(newUser2); */
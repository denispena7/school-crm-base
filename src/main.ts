import { CRMController } from "./controllers/crm.controller";
import { StorageService } from './services/storage.service';
import type { RegistroHorario } from './models/interfaces';
//import type { Usuario } from './models/interfaces';

// Instanciamos el motor (creamos el objeto en memoria)
const miEscuelaCRM = new CRMController("1.0.0");
/* let todosLosUsuarios: Usuario[] = [];

async function leerTodosLosUsuarios() {
    console.log("Leyendo todos los usuarios");
    todosLosUsuarios = await miEscuelaCRM.leerTodosAsync();
    console.log(todosLosUsuarios);
}
//leerTodosLosUsuarios();

// miEscuelaCRM.usuariosDelCentro = [];

async function pintarUSuariosEnPantalla(){
    // Capturmos el contenedor donde vamos a pintar la lista de usuarios
    const contenedor = document.getElementById("lista-usuarios") as HTMLDivElement;
    if (!contenedor) return; // Si no existe el contenedor, salimos de la función

    // Limpiamos el contenedor antes de pintar
    contenedor.innerHTML = "";

    const usuarios = await miEscuelaCRM.leerTodosAsync(); // Obtenemos los alumnos
 contenedor.innerHTML = usuarios[0].nombre;
}

// pintarUSuariosEnPantalla();

 async function addUsuario() {
    console.log("Agregando un nuevo usuario...");
    let guardaConExito =  false;
    guardaConExito = await miEscuelaCRM.registrarUsuarioAsync({ id: 4, nombre: "Ana Torres", rol: "alumno", activo: true });
    if (guardaConExito) {
        console.log("Usuario agregado con éxito.");
    } else {
        console.log("Error al agregar el usuario.");
    }
}


// addUsuario();

//console.log("Versión del CRM: ", miEscuelaCRM.verVersion());

// Usamos sus métodos
const profesores = miEscuelaCRM.filtrarUsuarioPorRol("profesor");

//console.log("Profesores del centro:", profesores);

const newUser1: Usuario = {
    id: 1,
    nombre: 'Ana Martínez',
    rol: 'profesor',
    activo: true
}; */

// miEscuelaCRM.agregarUsuario(newUser1);

// Implementación de las funciones creadas en crm.controller.ts
async function ejecutarPrueba() {
    console.log("=== Iniciando simulación de SchoolCRM ===");

    try {
        // Limpiamos los datos anteriores para que cada ejecución
        // de la prueba empiece desde cero.
        localStorage.removeItem('crm_asistencias');
        localStorage.removeItem('crm_sanciones');
        localStorage.removeItem('crm_horarios');

        // Creamos un horario de prueba.
        const horariosStorage = new StorageService<RegistroHorario>('crm_horarios');

        horariosStorage.add({
            dia: 'Lunes',
            franja: '1ª Hora',
            cursoId: 'curso1',
            asignaturaId: 'asig1',
            profesorId: 'prof1',
            aula: 'Aula 101'
        });

        console.log("Horario de prueba añadido.");

        // Comprobamos si el profesor tiene conflicto.
        const conflicto = await miEscuelaCRM.comprobarConflictoProfesor(
            'prof1',
            'Lunes',
            '1ª Hora'
        );

        console.log(`¿Hay conflicto horario?: ${conflicto}`);

        // Comprobamos un horario libre.
        const horarioLibre = await miEscuelaCRM.comprobarConflictoProfesor(
            'prof1',
            'Lunes',
            '2ª Hora'
        );

        console.log(`¿Hay conflicto en 2ª Hora?: ${horarioLibre}`);

        // Registramos una falta.
        const faltaRegistrada = await miEscuelaCRM.registrarAsistencia(
            'alumno1',
            'prof1',
            '1ª Hora',
            'falta'
        );

        console.log(`Falta registrada correctamente: ${faltaRegistrada}`);

        // Registramos un retraso.
        const retrasoRegistrado = await miEscuelaCRM.registrarAsistencia(
            'alumno1',
            'prof1',
            '2ª Hora',
            'retraso'
        );

        console.log(`Retraso registrado correctamente: ${retrasoRegistrado}`);

        // Registramos una asistencia normal.
        await miEscuelaCRM.registrarAsistencia(
            'alumno1',
            'prof1',
            '3ª Hora',
            'presente'
        );

        console.log("Asistencia registrada correctamente.");

        // Registramos una sanción.
        await miEscuelaCRM.registrarSancion(
            'alumno1',
            'prof1',
            'comportamiento',
            'Conducta inapropiada durante la clase.'
        );

        console.log("Sanción registrada correctamente.");

        // Obtenemos el informe del alumno.
        const informe = await miEscuelaCRM.obtenerInformeAlumno('alumno1');

        console.log("=== Informe del alumno ===");
        console.log(`Faltas: ${informe.faltas}`);
        console.log(`Retrasos: ${informe.retrasos}`);
        console.log(`Sanciones: ${informe.sanciones}`);

        console.log("=== Simulación finalizada ===");

    } catch (error) {
        console.error("Error en la ejecución:", error);
    }
}

ejecutarPrueba();
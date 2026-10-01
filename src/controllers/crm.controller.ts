import type { Usuario, Rol, Asistencia, Sancion, RegistroHorario, EstadoAsistencia, TipoSancion } from '../models/interfaces';
import { StorageService } from '../services/storage.service';

export class CRMController {
    // Inicialización de los almacenes persistentes
    private asistenciaStorage = new StorageService<Asistencia>('crm_asistencias');
    private sancionesStorage = new StorageService<Sancion>('crm_sanciones');
    private horariosStorage = new StorageService<RegistroHorario>('crm_horarios');

    private usuariosDelCentro: Usuario[] = [];
    private listaUsuarios: Usuario[] = [];
    private readonly CLAVE_STORAGE = 'school-crm-usuarios';
    private readonly CLAVE_USUARIOS = 'school_crm_usuarios';

    // Constructor se ejecuta al crear el objeto
    constructor(private version: string) {
        // Inicializamos el array de usuarios si no existe en localStorage
        const datosLocales = localStorage.getItem(this.CLAVE_STORAGE);
        if (datosLocales) {
            this.usuariosDelCentro = JSON.parse(datosLocales);
        } else {
            this.usuariosDelCentro = [
                { id: 1, nombre: "Juan Pérez", rol: "admin", activo: true },
                { id: 2, nombre: "María López", rol: "profesor", activo: true },
                { id: 3, nombre: "Carlos García", rol: "alumno", activo: true },
            ]; // Inicializamos el array vacío si no hay datos en localStorage
            localStorage.setItem(this.CLAVE_USUARIOS, JSON.stringify(this.listaUsuarios));
        }
        // Carga de asistencias previas
   /*     const asistenciasLocales = localStorage.getItem(this.CLAVE_ASISTENCIAS);
        if (asistenciasLocales) {
            this.listaAsistencias = JSON.parse(asistenciasLocales);
        }
*/
    }

    /**
     * Registra una falta, retraso o asistencia en el sistema de forma asíncrona.
     */
    public async registrarAsistencia(alumnoId: string, profesorId: string, franja: string, estado: EstadoAsistencia): Promise<boolean> {
        // TODO: El alumno debe implementar la simulación de retraso de red (setTimeout con Promise)
        // y añadir el registro usando el servicio de almacenamiento.
        throw new Error('Método no implementado');
}

     /**
     * Registra una sanción disciplinaria.
     */
    public async registrarSancion(alumnoId: string, profesorId: string, tipo: TipoSancion, descripcion: string): Promise<void> {
        // TODO: Implementar lógica de inserción asíncrona.
        throw new Error('Método no implementado');
    }

    /**
     * VERIFICACIÓN CRÍTICA: Comprueba si un profesor ya tiene una clase asignada en el mismo día y hora.
     * Devuelve true si hay conflicto (el profesor está duplicado) o false si está libre.
     */
    public async comprobarConflictoProfesor(profesorId: string, dia: string, franja: string): Promise<boolean> {
        // TODO: Recuperar los horarios y utilizar métodos de array (.some, .filter, etc.) 
        // para buscar coincidencias exactas.
        throw new Error('Método no implementado');
    }

    /**
     * Genera un informe resumido con el total de faltas y retrasos de un alumno concreto.
     */
    public async obtenerInformeAlumno(alumnoId: string): Promise<{ faltas: number; retrasos: number; sanciones: number }> {
        // TODO: Filtrar asistencias y sanciones del alumno para devolver el objeto con los contadores.
        throw new Error('Método no implementado');
    }
    

  public registrarUsuarioAsync(usuario: Usuario): Promise<boolean> {
    return new Promise((resolve) => {
      console.log(
        `[NETWORK]: Conectando con el servidor escolar para registrar a ${usuario.id}...`,
      );

      // Simulamos un retraso de red de 2 segundos (2000 milisegundos)
      setTimeout(() => {
        const nuevoUsuario: Usuario = {
          id: usuario.id, // Genera un ID único aleatorio nativo de la plataforma web
          nombre: usuario.nombre,
          rol: usuario.rol,
          activo: usuario.activo,
        };

        this.usuariosDelCentro.push(nuevoUsuario);
        localStorage.setItem(
          this.CLAVE_STORAGE,
          JSON.stringify(this.usuariosDelCentro),
        );

        // La operación ha terminado con éxito: resolvemos la promesa
        resolve(true);
      }, 2000);
    });
  }

     // Método para exponer la lista de forma segura (filtrando solo alumnos para la pantalla)
    public obtenerAlumnos(): Usuario[] {
        return this.listaUsuarios.filter(user => user.rol === 'alumno');
    }

        public leerTodosAsync(): Promise<Usuario[]>{
          // Este método devuelve el listado completo de usuarios con un retardo de 2 segundos
          return new Promise((resolve) => {
            console.log(
              "[NETWORK]: Conectando con el servidor escolar para leer los usuarios...",
            );
            setTimeout(() => {
                resolve(this.usuariosDelCentro);
            }, 2000);
          });
        }


    // Métodos : La función de ayer, que estaba en counter, convertida en un método o habilidad de la clase
    filtrarUsuarioPorRol(rolBuscado: Rol): Usuario[] {
        // Usuamos this para referirnos a la propiedad de esta misma clase
        return this.usuariosDelCentro.filter(usuario => usuario.rol == rolBuscado);
    }

    actualizarVersion(nuevaVersion: string): void {
        this.version = nuevaVersion;
    }

    verVersion(): string {
        return this.version;
    }

    // crear metodo añadir usuario void que debe añadir un usuario al final de la lista, que controle que el id existe o no, si e lid existe que no pueda añadirlo y si no que lo añada al final
  public agregarUsuario(nuevoUsuario: Usuario): void {
    // 1. Validamos si el ID ya existe en nuestro array privado
    const idDuplicado = this.usuariosDelCentro.some(
      (user) => user.id === nuevoUsuario.id,
    );

    if (idDuplicado) {
      console.error(
        `Error: El usuario con ID [${nuevoUsuario.id}] ya existe en el SchoolCRM.`,
      );
      return; // Cortamos la ejecución para no añadirlo
    }

    // 2. Si no está duplicado, lo añadimos de forma segura
    this.usuariosDelCentro.push(nuevoUsuario);
    console.log(` Usuario ${nuevoUsuario.nombre} añadido correctamente.`);
    this.guardarEnDisco(); // Guardamos los cambios en localStorage
  }

    private guardarEnDisco(): void {
        localStorage.setItem(this.CLAVE_STORAGE, JSON.stringify(this.usuariosDelCentro));
    }
}
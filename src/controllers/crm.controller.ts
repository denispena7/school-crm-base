import type { Usuario, Rol } from "../models/interfaces";

export class CRMController {
    // Propiedades
    private usuariosDelCentro: Usuario[] = [];
    private listaUsuarios: Usuario[] = [];
    private readonly CLAVE_STORAGE = 'school-crm-usuarios';

    // Constructor se ejecuta al crear el objeto
    constructor(private version: string = "1.0.0") {
        const datosLocales = localStorage.getItem(this.CLAVE_STORAGE)
        this.usuariosDelCentro = [
            { id: 1, nombre: 'Ana Martínez', rol: 'profesor', activo: true },
            { id: 2, nombre: 'Carlos Soler', rol: 'alumno', activo: true },
            { id: 3, nombre: 'Lucía Gómez', rol: 'admin', activo: true },
            { id: 4, nombre: 'Ana Martínez', rol: 'profesor', activo: false },
            { id: 5, nombre: 'Luis Fernandez', rol: 'alumno', activo: true },
            { id: 6, nombre: 'Patricia Sanchez', rol: 'alumno', activo: false }
        ]
        if (datosLocales) {
            this.listaUsuarios = JSON.parse(datosLocales);
        } else {
            this.listaUsuarios = [{ id: 1, nombre: 'Ana', rol: 'profesor', activo: true }];
            this.guardarEnDisco();
        }

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
        // Validación de duplicados implacable mediante .some() 
        const idDuplicado = this.listaUsuarios.some(user => user.id === nuevoUsuario.id);
        if (idDuplicado) {
            console.error(`El ID ${nuevoUsuario.id} ya existe.`);
            return;
        }
        this.listaUsuarios.push(nuevoUsuario);
        this.guardarEnDisco(); // Persistencia inmediata 
        console.log(` ${nuevoUsuario.nombre} guardado con éxito en disco.`);


    }

    private guardarEnDisco(): void {
        localStorage.setItem(this.CLAVE_STORAGE, JSON.stringify(this.usuariosDelCentro));
    }
}
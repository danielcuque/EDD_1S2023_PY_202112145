class HashNode {
    constructor(id, name, password) {
        this.id = id
        this.name = name
        this.password = password
    }
}

export class HashTable {
    constructor() {
        this.data = new Array(7)
        this.maxSize = 7
        this.bucketsUsed = 0
    }

    set(id, name, password) {
        let indice = this.hashMethod(id)
        const nuevoNodo = new HashNode(id, name, password)
        if (indice < this.maxSize) {
            try {
                if (this.data[indice] == null) {
                    this.data[indice] = nuevoNodo
                    this.bucketsUsed++
                    this.capacidad_tabla()
                } else {
                    let contador = 1
                    indice = this.RecalculoIndice(id, contador)
                    while (this.data[indice] != null) {
                        contador++
                        indice = this.RecalculoIndice(id, contador)
                    }
                    this.data[indice] = nuevoNodo
                    this.bucketsUsed++
                    this.capacidad_tabla()
                }
            } catch (err) {
                console.log("Hubo un error en insercion")
            }
        }
    }

    hashMethod(id) {
        let carnet_cadena = id.toString()
        let divisor = 0
        for (let i = 0; i < carnet_cadena.length; i++) {
            divisor = divisor + carnet_cadena.charCodeAt(i)
        }
        let indice_final = divisor % this.maxSize
        return indice_final
    }

    capacidad_tabla() {
        let aux_utilizacion = this.maxSize * 0.75
        if (this.bucketsUsed > aux_utilizacion) {
            this.maxSize = this.nueva_capacidad()
            this.bucketsUsed = 0
            this.ReInsertar()
        }
    }

    nueva_capacidad() { //Sustituir por un algoritmo del siguiente numero primo
        let numero = this.maxSize + 1;
        while (!this.isPrime(numero)) {
            numero++;
        }
        return numero;
    }

    ReInsertar() {
        const auxiliar_tabla = this.data
        this.data = new Array(this.maxSize)
        auxiliar_tabla.forEach((alumno) => {
            this.set(alumno.id, alumno.name, alumno.password)
        })
    }

    RecalculoIndice(id, intento) {
        let nuevo_indice = this.hashMethod(id) + intento * intento
        let nuevo = this.nuevo_Indice(nuevo_indice)
        return nuevo
    }

    nuevo_Indice(numero) {
        let nueva_posicion = 0
        if (numero < this.maxSize) {
            nueva_posicion = numero
        } else {
            nueva_posicion = numero - this.maxSize
            nueva_posicion = this.nuevo_Indice(nueva_posicion)
        }
        return nueva_posicion
    }

    busquedaUsuario(id) {
        let indice = this.hashMethod(id)
        if (indice < this.maxSize) {
            try {
                if (this.data[indice] == null) {
                    alert("Bienvenido " + this.data[indice].name)
                } else if (this.data[indice] != null && this.data[indice].id == id) {
                    alert("Bienvenido " + this.data[indice].name)
                } else {
                    let contador = 1
                    indice = this.RecalculoIndice(id, contador)
                    while (this.data[indice] != null) {
                        contador++
                        indice = this.RecalculoIndice(id, contador)
                        if (this.data[indice].id == id) {
                            alert("Bienvenido " + this.data[indice].name)
                            return
                        }
                    }
                }
            } catch (err) {
                console.log("Hubo un error en busqueda")
            }
        }
    }

    /**
     * Este codigo es un extra para generar una tabla 
     */


    isPrime(numero) {
        if (numero <= 1) { return false }
        if (numero === 2) { return true }
        if (numero % 2 === 0) { return false }
        for (let i = 3; i <= Math.sqrt(numero); i += 2) {
            if (numero % i === 0) { return false };
        }
        return true;
    }

}
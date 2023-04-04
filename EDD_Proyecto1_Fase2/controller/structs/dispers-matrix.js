class nodoMatriz {
    constructor(posX, posY, nombre_archivo) {
        this.siguiente = null;
        this.anterior = null;
        this.abajo = null;
        this.arriba = null;
        this.posX = posX;
        this.posY = posY;
        this.posicion = nombre_archivo;
        this.typeOfFile = "";
    }
}

export class Matrix {
    constructor() {
        this.principal = new nodoMatriz(-1, -1, "Raiz")
        this.coordenadaY = 0;
        this.coordenadaX = 0;
    }

    buscarX(x) {
        let aux = this.principal;
        while (aux) {
            if (aux.posX === x && aux.posY === -1) {
                return aux;
            } else {
                aux = aux.siguiente
            }
        }
        return null;
    }

    buscarY(y) {
        let aux = this.principal;
        while (aux) {
            if (aux.posY === y && aux.posX === -1) {
                return aux;
            } else {
                aux = aux.abajo
            }
        }
        return null;
    }

    buscarF(nombre_archivo) {
        let aux = this.principal
        while (aux) {
            if (aux.posicion === nombre_archivo) {
                return aux;
            } else {
                aux = aux.abajo;
            }
        }
        return null;
    }

    buscarC(carnet) {
        let aux = this.principal;
        while (aux) {
            if (aux.posicion === carnet) {
                return aux;
            } else {
                aux = aux.siguiente
            }
        }
        return null;
    }

    insertarColumna(posicion, texto) {
        const nuevoNodo = new nodoMatriz(posicion, -1, texto);
        let piv = this.principal;
        let pivA = this.principal;
        while (piv.siguiente) {
            if (nuevoNodo.posX > piv.posX) {
                pivA = piv;
                piv = piv.siguiente
            } else {
                nuevoNodo.siguiente = piv;
                nuevoNodo.anterior = pivA;
                pivA.siguiente = nuevoNodo;
                piv.anterior = nuevoNodo;
                return;
            }
        }
        nuevoNodo.anterior = piv;
        piv.siguiente = nuevoNodo;
    }

    insertarFila(posicion, texto) {
        const nuevoNodo = new nodoMatriz(-1, posicion, texto);
        let piv = this.principal;
        let pivA = this.principal;
        while (piv.abajo) {
            if (nuevoNodo.posY > piv.posY) {
                pivA = piv;
                piv = piv.abajo;
            } else {
                nuevoNodo.abajo = piv;
                nuevoNodo.arriba = pivA;
                pivA.abajo = nuevoNodo;
                piv.arriba = nuevoNodo;
                return;
            }
        }
        nuevoNodo.arriba = piv;
        piv.abajo = nuevoNodo;
        return nuevoNodo;
    }

    insertarNodo(x, y, texto) {
        const nuevoNodo = new nodoMatriz(x, y, texto);
        let tempX = this.principal;
        let tempY = this.principal;
        //Agregar en Columna
        while (tempX.siguiente) {
            if (tempX.posX === nuevoNodo.posX) {
                break;
            }
            tempX = tempX.siguiente;
        }
        while (true) {
            if (tempX.posY === nuevoNodo.posY) {
                break;
            } else if (tempX.abajo !== null && tempX.abajo.posY > nuevoNodo.posY) {
                nuevoNodo.abajo = tempX.abajo;
                nuevoNodo.arriba = tempX;
                tempX.abajo = nuevoNodo;
                break;
            } else if (tempX.abajo === null) {
                nuevoNodo.arriba = tempX
                nuevoNodo.abajo = tempX.abajo
                tempX.abajo = nuevoNodo;
                break;
            } else {
                tempX = tempX.abajo;
            }
        }
        //Agregar en Fila
        while (tempY.abajo) {
            if (tempY.posY === nuevoNodo.posY) {
                break;
            }
            tempY = tempY.abajo;
        }
        while (true) {
            if (tempY.posX === nuevoNodo.posX) {
                break;
            } else if (tempY.siguiente !== null && tempY.siguiente.posX > nuevoNodo.posX) {
                nuevoNodo.siguiente = tempY.siguiente;
                nuevoNodo.anterior = tempY;
                tempY.siguiente = nuevoNodo;
            } else if (tempY.siguiente === null) {
                nuevoNodo.anterior = tempY;
                nuevoNodo.siguiente = tempY.siguiente;
                tempY.siguiente = nuevoNodo;
            } else {
                tempY = tempY.siguiente;
            }
        }
    }

    insertarArchivo(texto, numero, nombreArchivo) {
        let nuevaFila = this.buscarF(texto)
        if (nuevaFila === null) {
            this.insertarFila(this.coordenadaY, texto)
            this.coordenadaY++
        } else {
            let copia_archivo = "(" + (numero++) + ")" + nombreArchivo
            this.insertarArchivo(copia_archivo, numero)
        }
    }

    colocarPermiso(archivo, carnet, permisos) {
        /** NOTA: Paso Previo Buscar en AVL si existe el carnet*/
        let nuevaColumna = this.buscarC(carnet)
        let nuevaFila = this.buscarF(archivo)
        if (nuevaColumna === null) {
            this.insertarColumna(this.coordenadaX, carnet)
            this.coordenadaX++
            nuevaColumna = this.buscarC(carnet)
        }
        if (nuevaColumna !== null && nuevaFila !== null) {
            this.insertarNodo(nuevaColumna.posX, nuevaFila.posY, permisos)
        }
    }

    getFiles() {
        let aux = this.principal;
        let lista = [];
        while (aux) {
            if (aux.posicion !== "Raiz") {
                lista.push(aux.posicion)
            }
            aux = aux.abajo;
        }
        return lista;
    }

    reporte() {
        let cadena = "";
        let aux1 = this.principal;
        let aux2 = this.principal;
        let aux3 = this.principal;
        if (aux1 !== null) {
            cadena = "digraph MatrizCapa{ node[shape=box]  rankdir=UD;  {rank=min; ";
            /** Creacion de los nodos actuales */
            while (aux1) {
                cadena += "nodo" + (aux1.posX + 1) + (aux1.posY + 1) + "[label=\"" + aux1.posicion + "\" ,rankdir=LR,group=" + (aux1.posX + 1) + "]; ";
                aux1 = aux1.siguiente;
            }
            cadena += "}"
            // Recorremos en cada fila
            while (aux2) {
                aux1 = aux2;
                cadena += "{rank=same; ";
                while (aux1) {
                    cadena += "nodo" + (aux1.posX + 1) + (aux1.posY + 1) + "[label=\"" + aux1.posicion + "\" ,group=" + (aux1.posX + 1) + "]; ";
                    aux1 = aux1.siguiente;
                }
                cadena += "}";
                aux2 = aux2.abajo;
            }
            /** Conexiones entre los nodos de la matriz */
            // Conexiones en X
            aux2 = aux3;
            while (aux2) {
                aux1 = aux2;
                while (aux1.siguiente) {
                    cadena += "nodo" + (aux1.posX + 1) + (aux1.posY + 1) + " -> " + "nodo" + (aux1.siguiente.posX + 1) + (aux1.siguiente.posY + 1) + " [dir=both];"
                    aux1 = aux1.siguiente
                }
                aux2 = aux2.abajo;
            }

            // Conexiones en Y
            aux2 = aux3;
            while (aux2) {
                aux1 = aux2;
                while (aux1.abajo) {
                    cadena += "nodo" + (aux1.posX + 1) + (aux1.posY + 1) + " -> " + "nodo" + (aux1.abajo.posX + 1) + (aux1.abajo.posY + 1) + " [dir=both];"
                    aux1 = aux1.abajo
                }
                aux2 = aux2.siguiente;
            }
            cadena += "}";
        } else {
            cadena = "No hay elementos en la matriz"
        }
        return cadena;
    }

    toJSON() {
        /*
        Los files van a lucir asi:
        {
            'text': 'texto',
            'numero': 1,
            'nombreArchivo': 'nombreArchivo', 
        }
        */
        const convertedFiles = [];
        /* 
        Los permisos van a lucir asi:
        {
            'nombreArchivo': 'nombreArchivo',
            'carnet': 'carnet',
            'permisos': 'permisos'
        }
        */
        const permisos = [];
        let aux1 = this.principal;
        let aux2 = this.principal;
        if (aux1 !== null) {
            // Recorremos las filas que son los archivos
            // Nos saltamos la raíz
            aux1 = aux1.abajo;
            while (aux1) {
                convertedFiles.push({
                    text: aux1.posicion,
                    numero: 1,
                    nombreArchivo: aux1.posicion
                })
                aux1 = aux1.abajo;
            }

            // Recorremos la matriz buscando los nodos que contienen la informacion de los permisos
            while (aux2) {
                aux1 = aux2;
                while (aux1) {
                    aux1 = aux1.siguiente;
                    if (aux1 !== null) {
                        if (aux1.posY !== -1) {
                            const fileName = this.buscarY(aux1.posY);
                            const carnet = this.buscarX(aux1.posX);
                            permisos.push({
                                nombreArchivo: fileName.posicion,
                                carnet: carnet.posicion,
                                permisos: aux1.posicion
                            })
                        }
                    }

                }
                aux2 = aux2.abajo;
            }
        }
        return {
            permisos,
            convertedFiles
        }
    }
}
class MatrixNode {
    constructor(posX, posY, fileName, content) {
        this.next = null;
        this.prev = null;
        this.below = null;
        this.above = null;
        this.posX = posX;
        this.posY = posY;
        this.fileName = fileName;
        this.content = content;
    }
}

export class Matrix {
    constructor() {
        this.root = new MatrixNode(-1, -1, "Raiz")
        this.path = "";
        this.coordinateY = 0;
        this.coordinateX = 0;
    }

    searchRow(x) {
        let aux = this.root;
        while (aux) {
            if (aux.posX === x && aux.posY === -1) {
                return aux;
            } else {
                aux = aux.next
            }
        }
        return null;
    }

    searchCol(y) {
        let aux = this.root;
        while (aux) {
            if (aux.posY === y && aux.posX === -1) {
                return aux;
            } else {
                aux = aux.below
            }
        }
        return null;
    }

    searchRowByFilename(fileName) {
        let aux = this.root
        while (aux) {
            if (aux.fileName === fileName) {
                return aux;
            } else {
                aux = aux.below;
            }
        }
        return null;
    }

    searchColById(id) {
        let aux = this.root;
        while (aux) {
            if (aux.fileName === id) {
                return aux;
            } else {
                aux = aux.next
            }
        }
        return null;
    }

    insertColumn(filename, description) {
        const newNode = new MatrixNode(filename, -1, description);
        let piv = this.root;
        let pivA = this.root;
        while (piv.next) {
            if (newNode.posX > piv.posX) {
                pivA = piv;
                piv = piv.next
            } else {
                newNode.next = piv;
                newNode.prev = pivA;
                pivA.next = newNode;
                piv.prev = newNode;
                return;
            }
        }
        newNode.prev = piv;
        piv.next = newNode;
    }

    insertRow(position, text, content) {
        const newNode = new MatrixNode(-1, position, text, content);
        let piv = this.root;
        let pivA = this.root;
        while (piv.below) {
            if (newNode.posY > piv.posY) {
                pivA = piv;
                piv = piv.below;
            } else {
                newNode.below = piv;
                newNode.above = pivA;
                pivA.below = newNode;
                piv.above = newNode;
                return;
            }
        }
        newNode.above = piv;
        piv.below = newNode;
        return newNode;
    }

    insertNode(x, y, text) {
        const newNode = new MatrixNode(x, y, text);
        let tempX = this.root;
        let tempY = this.root;
        while (tempX.next) {
            if (tempX.posX === newNode.posX) {
                break;
            }
            tempX = tempX.next;
        }
        while (true) {
            if (tempX.posY === newNode.posY) {
                break;
            } else if (tempX.below !== null && tempX.below.posY > newNode.posY) {
                newNode.below = tempX.below;
                newNode.above = tempX;
                tempX.below = newNode;
                break;
            } else if (tempX.below === null) {
                newNode.above = tempX
                newNode.below = tempX.below
                tempX.below = newNode;
                break;
            } else {
                tempX = tempX.below;
            }
        }
        //Agregar en Fila
        while (tempY.below) {
            if (tempY.posY === newNode.posY) {
                break;
            }
            tempY = tempY.below;
        }
        while (true) {
            if (tempY.posX === newNode.posX) {
                break;
            } else if (tempY.next !== null && tempY.next.posX > newNode.posX) {
                newNode.next = tempY.next;
                newNode.prev = tempY;
                tempY.next = newNode;
            } else if (tempY.next === null) {
                newNode.prev = tempY;
                newNode.next = tempY.next;
                tempY.next = newNode;
            } else {
                tempY = tempY.next;
            }
        }
    }

    insertNewFile(text, copyNumber, fileName, content) {
        let newRow = this.searchRowByFilename(text)
        if (newRow === null) {
            this.insertRow(this.coordinateY, text, content)
            this.coordinateY++
        } else {
            let copyFilename = "(" + (copyNumber++) + ")" + fileName
            this.insertNewFile(copyFilename, copyNumber, fileName, content)
        }
    }

    setCredentials(filename, id, credentials) {
        let newCol = this.searchColById(id)
        let newRow = this.searchRowByFilename(filename)
        if (newCol === null) {
            this.insertColumn(this.coordinateX, id)
            this.coordinateX++
            newCol = this.searchColById(id)
        }
        if (newCol !== null && newRow !== null) {
            this.insertNode(newCol.posX, newRow.posY, credentials)
        }
    }

    getFiles() {
        let aux = this.root;
        let auxList = [];
        while (aux) {
            if (aux.fileName !== "Raiz") {
                auxList.push(aux.fileName)
            }
            aux = aux.below;
        }
        return auxList;
    }

    toDot() {
        if (this.root.fileName === "Raiz" && this.root.next === null && this.root.below === null) {
            return '';
        }

        let graph = "";
        let aux1 = this.root;
        let aux2 = this.root;
        let aux3 = this.root;
        if (aux1 !== null) {
            graph = "digraph MatrizCapa{ node[shape=box]  rankdir=UD;  {rank=min; ";
            /** Creacion de los nodos actuales */
            while (aux1) {
                graph += "nodo" + (aux1.posX + 1) + (aux1.posY + 1) + "[label=\"" + aux1.fileName + "\" ,rankdir=LR,group=" + (aux1.posX + 1) + "]; ";
                aux1 = aux1.next;
            }
            graph += "}"
            // Recorremos en cada fila
            while (aux2) {
                aux1 = aux2;
                graph += "{rank=same; ";
                while (aux1) {
                    graph += "nodo" + (aux1.posX + 1) + (aux1.posY + 1) + "[label=\"" + aux1.fileName + "\" ,group=" + (aux1.posX + 1) + "]; ";
                    aux1 = aux1.next;
                }
                graph += "}";
                aux2 = aux2.below;
            }
            /** Conexiones entre los nodos de la matriz */
            // Conexiones en X
            aux2 = aux3;
            while (aux2) {
                aux1 = aux2;
                while (aux1.next) {
                    graph += "nodo" + (aux1.posX + 1) + (aux1.posY + 1) + " -> " + "nodo" + (aux1.next.posX + 1) + (aux1.next.posY + 1) + " [dir=both];"
                    aux1 = aux1.next
                }
                aux2 = aux2.below;
            }

            // Conexiones en Y
            aux2 = aux3;
            while (aux2) {
                aux1 = aux2;
                while (aux1.below) {
                    graph += "nodo" + (aux1.posX + 1) + (aux1.posY + 1) + " -> " + "nodo" + (aux1.below.posX + 1) + (aux1.below.posY + 1) + " [dir=both];"
                    aux1 = aux1.below
                }
                aux2 = aux2.next;
            }
            graph += "}";
        } else {
            graph = "No hay elementos en la matriz"
        }
        return graph;
    }

    toJSON() {
        const convertedFiles = [];
        const credentials = [];
        let aux1 = this.root;
        let aux2 = this.root;
        if (aux1 !== null) {
            // Recorremos las filas que son los archivos
            // Nos saltamos la raíz
            aux1 = aux1.below;
            while (aux1) {
                convertedFiles.push({
                    text: aux1.fileName,
                    index: 1,
                    filename: aux1.fileName,
                    content: aux1.content || ''
                })
                aux1 = aux1.below;
            }

            // Recorremos la matriz buscando los nodos que contienen la informacion de los permisos
            while (aux2) {
                aux1 = aux2;
                while (aux1) {
                    aux1 = aux1.next;
                    if (aux1 !== null) {
                        if (aux1.posY !== -1) {
                            const fileName = this.searchCol(aux1.posY);
                            const carnet = this.searchRow(aux1.posX);
                            credentials.push({
                                filename: fileName.fileName,
                                id: carnet.fileName,
                                credential: aux1.fileName
                            })
                        }
                    }

                }
                aux2 = aux2.below;
            }
        }
        return {
            credentials,
            convertedFiles,
            path: this.path
        }
    }
}
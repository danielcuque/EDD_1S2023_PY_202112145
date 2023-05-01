class HashNode {
    constructor(userId, username, password) {
        this.userId = userId
        this.username = username
        this.password = password
    }
}


class HashTable {
    constructor() {
        this.data = new Array(7)
        this.maxSize = 7
        this.bucketsUsed = 0
    }

    set(userId, username, password) {
        let index = this.hashFunction(userId)
        const nuevoNodo = new nodoHash(userId, username, password)
        if (index < this.maxSize) {
            try {
                if (this.data[index] == null) {
                    console.log("Entre")
                    this.data[index] = nuevoNodo
                    this.bucketsUsed++
                    this.capacityTable()
                } else {
                    let contador = 1
                    index = this.recalculateIndex(userId, contador)
                    while (this.data[index] != null) {
                        contador++
                        index = this.recalculateIndex(userId, contador)
                    }
                    this.data[index] = nuevoNodo
                    this.bucketsUsed++
                    this.capacityTable()
                }
            } catch (err) {
                console.log("Hubo un error en insercion")
            }
        }
    }

    hashFunction(userId) {
        let userIdStr = userId.toString()
        let hash = 0
        for (let i = 0; i < userIdStr.length; i++) {
            hash = (hash + userIdStr.charCodeAt(i) * i) % this.maxSize
        }
        return hash

    }

    capacityTable() {
        let aux_utilizacion = this.maxSize * 0.75
        if (this.bucketsUsed > aux_utilizacion) {
            this.maxSize = this.newCapacityTable()
            this.bucketsUsed = 0
            this.reSet()
        }
    }

    newCapacityTable() { //Sustituir por un algoritmo del siguiente numero primo
        let i = this.maxSize + 1;
        while (!this.isPrime(i)) {
            i++;
        }
        return i;
    }

    reSet() {
        const auxTable = this.data
        this.data = new Array(this.maxSize)
        auxTable.forEach((alumno) => {
            this.set(alumno.carnet, alumno.usuario, alumno.password)
        })
    }

    recalculateIndex(userId, intento) {
        let index = this.hashFunction(userId) + intento * intento
        return this.newIndex(index)
    }

    newIndex(number) {
        let newPosition = 0
        if (number < this.maxSize) {
            newPosition = number
        } else {
            newPosition = number - this.maxSize
            newPosition = this.newIndex(newPosition)
        }
        return newPosition
    }

    findUserById(userId) {
        let index = this.hashFunction(userId)
        if (index < this.maxSize) {
            try {
                if (this.data[index] == null) {
                    alert("Bienvenido " + this.data[index].usuario)
                } else if (this.data[index] != null && this.data[index].carnet == userId) {
                    alert("Bienvenido " + this.data[index].usuario)
                } else {
                    let counter = 1
                    index = this.recalculateIndex(userId, counter)
                    while (this.data[index] != null) {
                        counter++
                        index = this.recalculateIndex(userId, counter)
                        if (this.data[index].carnet == userId) {
                            alert("Bienvenido " + this.data[index].usuario)
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

    generateTable() {
        // Obtener la referencia del elemento body
        var body = document.getElementsByTagName("body")[0];

        // Crea un elemento <table> y un elemento <tbody>
        var divtable = document.createElement("div");
        var tabla = document.createElement("table");
        var tblBody = document.createElement("tbody");
        var salto_html = document.createElement("br")
        divtable.className = "container"
        tabla.className = "table"
        //carnet
        var encabezado = document.createElement("tr")
        var celda_encabezado = document.createElement("td");
        var encabezado_contenido = document.createTextNode("Carnet")
        celda_encabezado.appendChild(encabezado_contenido);
        encabezado.appendChild(celda_encabezado)
        tblBody.appendChild(encabezado)
        //Nombre
        celda_encabezado = document.createElement("td");
        encabezado_contenido = document.createTextNode("Nombre")
        celda_encabezado.appendChild(encabezado_contenido);
        encabezado.appendChild(celda_encabezado)
        tblBody.appendChild(encabezado)
        //Password
        celda_encabezado = document.createElement("td");
        encabezado_contenido = document.createTextNode("Password")
        celda_encabezado.appendChild(encabezado_contenido);
        encabezado.appendChild(celda_encabezado)
        tblBody.appendChild(encabezado)

        for (var i = 0; i < this.maxSize; i++) {
            if (this.data[i] != null) {
                var hilera = document.createElement("tr");
                var arreglo = new Array(3)
                arreglo[0] = this.data[i].carnet
                arreglo[1] = this.data[i].usuario
                arreglo[2] = this.data[i].password
                for (var j = 0; j < 3; j++) {
                    var celda = document.createElement("td");
                    var textoCelda = document.createTextNode(arreglo[j]);
                    celda.appendChild(textoCelda);
                    hilera.appendChild(celda);
                }
                tblBody.appendChild(hilera);
            }
        }


        divtable.appendChild(tabla)
        // posiciona el <tbody> debajo del elemento <table>
        tabla.appendChild(tblBody);
        // appends <table> into <body>
        body.appendChild(salto_html);
        body.appendChild(divtable);
        // modifica el atributo "border" de la tabla y lo fija a "2";
        tabla.setAttribute("border", "2");
    }

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
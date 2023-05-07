# Fase 3 - GoDrive

## Manual técnico

## Tecnologías utilizadas
- Javascript
- HTML5
- CSS3

## Estructuras utilizadas
- Blockchain
- Grafo dirigido
- Tabla hash
- Matriz dispersa

## Tabla hash
### Clase HashNode
La clase HashNode es una clase que representa los nodos de una tabla hash. Cada nodo tiene tres propiedades: un id, un nombre y una contraseña, y una propiedad graph, que es una instancia de la clase Graph.
### Clase HashTable
- La clase `HashTable` es una clase que representa una tabla hash. Cada tabla tiene un tamaño maxSize, que se establece en 7 por defecto. La tabla se implementa como un array de tamaño maxSize, con cada elemento siendo un nodo de tipo HashNode.

- La función `set` se encarga de añadir un nuevo nodo a la tabla. Primero, se calcula la dirección donde se almacenará el nodo utilizando la función hashMethod. Si la dirección calculada no está vacía, se utiliza la técnica de "resolución de colisiones por prueba lineal" para encontrar una dirección vacía para el nuevo nodo.

- La función `fillGraph` se encarga de llenar el grafo asociado a un nodo, si existe un árbol naryTree correspondiente. La función fillGraphAux es una función auxiliar que se encarga de recorrer el árbol naryTree y añadir cada nodo al grafo.

- La función `resize` se encarga de redimensionar la tabla hash cuando se llena más del 75% de su capacidad. Primero se comprueba si se necesita una redimensión, y si es así, se llama a la función nextPrime para calcular el siguiente número primo después del tamaño actual de la tabla. Luego se resetea la tabla con el nuevo tamaño.

- La función `nextPrime` calcula el siguiente número primo después del tamaño actual de la tabla.

- La función `reset` resetea la tabla a su tamaño original y vuelve a insertar cada nodo en la tabla.

- La función `recalculateNewIndex` se encarga de calcular una nueva dirección para un nodo en caso de que su dirección actual esté ocupada. La función utiliza la técnica de "resolución de colisiones por cuadrado" para calcular la nueva dirección.

- La función `calculateNewIndex` es una función auxiliar de recalculateNewIndex que se encarga de realizar la recursión necesaria en caso de que la nueva dirección calculada sea mayor o igual al tamaño de la tabla.

- La función `findUserById` se encarga de buscar un nodo en la tabla hash por su id. Si el nodo existe, la función devuelve el nodo. Si el nodo no existe, la función muestra un mensaje de error utilizando la función showSnackbar.

- La función `findUserByIdAndPass` se encarga de buscar un nodo en la tabla hash por su id y su contraseña. Si el nodo existe y la contraseña coincide, la función devuelve el nodo. Si el nodo no existe o la contraseña no coincide, la función devuelve null. Si hay una colisión, la función utiliza la técnica de "resolución de colisiones por prueba lineal" para buscar la siguiente dirección vacía. Si no se encuentra un nodo con el id y la contraseña especificados, la función devuelve null.

## Grafo dirigido

La clase Graph es una implementación de un grafo utilizando una matriz de adyacencia para representar las relaciones entre los nodos. A continuación se describen los métodos disponibles en esta clase:

- constructor(): Crea una nueva instancia de la clase Graph con un número de nodos inicializado en cero y una matriz de adyacencia vacía.

- addVertex(path, files): Agrega un nuevo vértice al grafo con el camino path y los archivos files. Si el camino ya existe, no se agrega un nuevo vértice.

- addEdge(path1, path2): Agrega una nueva arista al grafo, conectando el vértice con el camino path1 al vértice con el camino path2.

- findVertex(path): Devuelve el vértice correspondiente al camino path si existe, de lo contrario devuelve undefined.

- getAllFiles(): Devuelve una matriz con todos los archivos de todos los vértices del grafo.

- findPath(path): Devuelve el vértice correspondiente al último elemento del camino path si existe, de lo contrario devuelve null.

- getFiles(path): Devuelve todos los archivos del vértice correspondiente al camino path si existe, de lo contrario devuelve null.

- getFolders(path): Devuelve los caminos de los hijos del vértice correspondiente al camino path, si existe, de lo contrario devuelve una matriz vacía.

- toDot(): Devuelve una cadena en formato DOT que representa el grafo.

- deserializeGraph(): Convierte los archivos de cada vértice del grafo de su formato serializado a su formato original utilizando la función deserializeMatrix().

- deserializeMatrix(files, credentials, path): Convierte los archivos y credenciales serializados en la matriz files a su formato original y los agrega a una nueva instancia de la clase Matrix con el camino path especificado. Devuelve la instancia de Matrix con los archivos y credenciales deserializados.

## Blockchain

La clase Block representa un bloque en una cadena de bloques (también conocida como blockchain). Cada bloque tiene un índice, una fecha, un emisor, un receptor, un mensaje, un hash anterior y un hash actual. Los métodos de la clase Block incluyen decryptMsg, que decodifica el mensaje cifrado usando la función decode importada, y formatDate, que convierte la fecha del bloque en un formato legible.

La clase `BlockChain` representa la cadena de bloques en sí misma. Cada objeto BlockChain tiene un puntero al primer bloque (start) y un contador de bloques (blockCounter). Los métodos de la clase BlockChain incluyen insert, que agrega un nuevo bloque a la cadena de bloques y lo conecta con el bloque anterior, insertBlock, que agrega un bloque existente a la cadena de bloques y lo conecta con el bloque anterior, sha256, que cifra el mensaje utilizando el algoritmo SHA-256, y toDot, que devuelve una representación en formato DOT de la cadena de bloques.

La función `graphvizNodes` de la clase BlockChain devuelve una cadena que representa los nodos de la cadena de bloques en formato DOT, y la función graphvizEdges devuelve una cadena que representa las conexiones entre los nodos. Juntas, estas dos funciones se utilizan en el método toDot para generar la representación completa de la cadena de bloques en formato DOT.

## Encriptación

Primero, se define una constante llamada secretKey que contiene la clave secreta que se utilizará para cifrar y descifrar los mensajes. Esta clave se representa como una cadena de caracteres.

A continuación, se crea un búfer de 16 bytes (128 bits) utilizando el constructor ArrayBuffer, que se usará para almacenar la clave en un formato que sea adecuado para su uso en el cifrado. Luego, se crea una vista sobre el búfer utilizando el constructor Uint8Array. La vista se usa para acceder y modificar los bytes individuales en el búfer.

Luego, se recorre cada carácter de la cadena secretKey utilizando un bucle for, y se utiliza el método charCodeAt para obtener el código Unicode de cada carácter. Estos códigos se almacenan en la vista que se creó anteriormente, lo que permite que la clave se represente como una serie de bytes.

A continuación, se define una constante llamada iv que contiene un vector de inicialización de 16 bytes. El vector de inicialización se utiliza en el cifrado AES-CBC para proporcionar una aleatoriedad adicional a cada bloque de datos cifrado. El objeto algorithm se crea como un objeto con dos propiedades: name (que especifica el algoritmo de cifrado que se utilizará, que es AES-CBC en este caso) y iv (que especifica el vector de inicialización que se utilizará).

La función `encode` toma un mensaje como entrada y lo cifra utilizando la clave y el vector de inicialización especificados. Primero, el mensaje se convierte en una serie de bytes utilizando el constructor TextEncoder. A continuación, se importa la clave en el formato necesario utilizando el método importKey del objeto crypto.subtle. La clave se importa en modo de cifrado. Después, se utiliza el método encrypt del objeto crypto.subtle para cifrar los datos utilizando el algoritmo y la clave especificados. El mensaje cifrado se convierte a una cadena base64 utilizando el método btoa, y luego se devuelve la cadena codificada como base64.

La función `decode` toma un mensaje cifrado como entrada y lo descifra utilizando la clave y el vector de inicialización especificados. Primero, el mensaje cifrado se convierte de una cadena base64 a una serie de bytes utilizando el método atob. A continuación, se importa la clave en el formato necesario utilizando el método importKey del objeto crypto.subtle. La clave se importa en modo de descifrado. Después, se utiliza el método decrypt del objeto crypto.subtle para descifrar los datos utilizando el algoritmo y la clave especificados. El mensaje descifrado se convierte de nuevo a una cadena utilizando el constructor TextDecoder, y luego se devuelve la cadena original.

La función `encryptSha256` toma una contraseña como entrada y genera una clave utilizando la función de hash SHA-256. Primero, la contraseña se convierte en una serie de bytes utilizando el constructor TextEncoder. A continuación, se utiliza el método digest del objeto crypto.subtle para generar un hash SHA-256 de los datos de la contraseña. El hash se convierte a una cadena hexadecimal
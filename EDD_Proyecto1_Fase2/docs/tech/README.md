# Munual técnico - GoDrive

## **Clase Student**

La clase `Student` representa a un estudiante, con su nombre, identificación, contraseña, carpeta raíz y listas de registros de actividad y almacenamiento.

### Constructor
- constructor(name, id, password): constructor de la clase Student. Recibe tres parámetros:
    - name: nombre del estudiante
    - id: identificación del estudiante
    - password: contraseña del estudiante

Dentro del constructor se inicializan las siguientes propiedades:
- this.name: nombre del estudiante
- this.id: identificación del estudiante
- this.password: contraseña del estudiante
- this.rootFolder: carpeta raíz del estudiante (inicialmente, '/')
- this.logList: lista circular enlazada para el registro de actividad del estudiante (inicialmente, una lista vacía)
- this.storage: árbol n-ario para el almacenamiento de archivos del estudiante (inicialmente, un árbol vacío)
### Métodos
- `createRow()`: este método crea y devuelve un elemento HTML que representa al estudiante en una tabla. Retorna un elemento div con las siguientes propiedades:
class: "w-full flex flex-row py-6 border border-gray-300"
dos elementos div con class "w-full text-center" que contienen la identificación y el nombre del estudiante, respectivamente.
- `deserealizeStudent()`: este método sirve para recuperar el árbol n-ario del estudiante, reconstruyendo todos sus nodos después de serializarlo. Este método no tiene parámetros de entrada. Dentro del método, se hace uso de los siguientes métodos de otras clases:
- `deserializeTree()`: método de la clase NaryTree que se utiliza para reconstruir el árbol n-ario del estudiante.

- `deserializeCircularList(serialized)`: método de la clase Student que se utiliza para reconstruir la lista circular enlazada de registros de actividad del estudiante a partir de una lista serializada. Este método recibe como parámetro la lista serializada y devuelve una nueva lista circular enlazada reconstruida.
- `deserializeCircularList(serialized)`: este método se utiliza para reconstruir la lista circular enlazada de registros de actividad del estudiante a partir de una lista serializada. Este método recibe como parámetro la lista serializada y devuelve una nueva lista circular enlazada reconstruida. Este método hace uso del método addWithDate(description, date, hour) de la clase CircularLinkedList para agregar nuevos nodos a la lista reconstruida.

## **Clase NodeCircularList**
Representa un nodo de una lista circular enlazada.

### Atributos
- description: descripción del nodo.
- date: fecha asociada al nodo (por defecto null).
- hour: hora asociada al nodo (por defecto null).
- next: referencia al siguiente nodo de la lista (por defecto null).
### Métodos
- `nodeDescriptionToGraphviz()`:
Convierte la información del nodo en una cadena de texto en formato Graphviz para su visualización.
Retorna: una cadena de texto en formato Graphviz.

## **Clase CircularLinkedList**
Representa una lista circular enlazada.

### Atributos
- head: referencia al primer nodo de la lista (por defecto null).
- tail: referencia al último nodo de la lista (por defecto null).
- size: cantidad de nodos en la lista (por defecto 0).
### Métodos
- addWithDate(description, date, hour)
Agrega un nodo a la lista con su descripción, fecha y hora asociadas.

### Parámetros:

- description: descripción del nodo.
- date: fecha asociada al nodo.
- hour: hora asociada al nodo.
- Retorna: el nuevo nodo agregado a la lista.

- convertToGraphviz()
Convierte la lista en una cadena de texto en formato Graphviz para su visualización.
- Retorna: una cadena de texto en formato Graphviz.

- toJSON()
Convierte la lista en un array de objetos JSON.

Retorna: un array de objetos JSON que representan los nodos de la lista.

## **Clase nodoMatriz**

La clase nodoMatriz representa un nodo de la matriz dispersa, que contiene información sobre la posición (posX, posY) del nodo en la matriz, el nombre del archivo y su contenido. Cada nodo también tiene referencias a los nodos adyacentes en las cuatro direcciones: arriba, abajo, izquierda y derecha.

## **Clase Matrix**
La clase Matrix representa la matriz dispersa en sí misma. La matriz comienza con un nodo raíz, y se expande a medida que se agregan nodos en las columnas y filas.

La matriz dispersa admite cuatro operaciones principales: búsqueda por fila, búsqueda por columna, inserción de fila y columna, e inserción de nodo.

- `buscarX(x)`: busca el nodo en la columna x. Si el nodo no existe, devuelve null.
- `buscarY(y)`: busca el nodo en la fila y. Si el nodo no existe, devuelve null.
- `buscarF(nombre_archivo)`: busca la fila que contiene el archivo nombre_archivo. Si la fila no existe, devuelve null.
- `buscarC(carnet)`: busca la columna que contiene el carnet carnet. Si la columna no existe, devuelve null.
- `insertarColumna(posicion, texto)`: inserta una columna en la posición posicion, con el texto texto.
- `insertarFila(posicion, texto, content)`: inserta una fila en la posición posicion, con el texto texto y el contenido content.
- `insertarNodo(x, y, texto)`: inserta un nodo en la posición (x, y), con el texto texto.
- `insertarArchivo(texto, numero, nombreArchivo, content)`: inserta un archivo con el nombre nombreArchivo, en la posición texto y numero, y con el contenido content.

## **Clase TreeAVL **
La clase TreeAVL representa un árbol AVL, que es un árbol binario de búsqueda balanceado. El árbol AVL admite las siguientes operaciones:

- `insertar(nodo)`: inserta un nodo en el árbol.
- `buscar(nodo)`: busca un nodo en el árbol.
- `eliminar(nodo)`: elimina un nodo del árbol.
- `inOrden()`: recorre el árbol en inOrden.
- `preOrden()`: recorre el árbol en preOrden.
- `postOrden()`: recorre el árbol en postOrden.
- `graficar()`: grafica el árbol en Graphviz.

## **Clase NodeAVL**
La clase NodeAVL representa un nodo del árbol AVL. Cada nodo tiene una referencia a su padre, a su hijo izquierdo y a su hijo derecho, y también tiene un factor de equilibrio.

## **Clase NaryTree**
La clase NaryTree representa un árbol n-ario. El árbol n-ario admite las siguientes operaciones:

- `insertNode(node, parent)`: inserta un nodo en el árbol.
- `deleteNode(node)`: elimina un nodo del árbol.
- `searchNode(node)`: busca un nodo en el árbol.
- `serializeTree()`: serializa el árbol en un array de objetos JSON.
- `deserializeTree(serialized)`: reconstruye el árbol a partir de un array de objetos JSON.
- `toGraphviz()`: convierte el árbol en una cadena de texto en formato Graphviz para su visualización.

## **Clase NodeNaryTree**
La clase NodeNaryTree representa un nodo del árbol n-ario. Cada nodo tiene una referencia a su padre, a su hijo izquierdo y a su hijo derecho, y también tiene un factor de equilibrio.

## **Clase Node**
La clase Node representa un nodo del árbol binario de búsqueda. Cada nodo tiene una referencia a su padre, a su hijo izquierdo y a su hijo derecho, y también tiene un factor de equilibrio.
# EDD GoDrive

## Descripción general

El paquete controller contiene varias estructuras de datos implementadas en Go para manejar listas, pilas, colas y logs. En este paquete encontraremos las siguientes estructuras:

## Node

```go
type Node struct {
    Next, Prev *Node
    Data       interface{}
}
```

- Nodo es una estructura que contiene punteros a los nodos siguiente y anterior en la lista doblemente enlazada.
- Los datos pueden almacenar cualquier tipo de datos.

## DoublyLinkedList


```go
type DoublyLinkedList struct {
    Head, Tail *Node
    Size       int
}
```

- DoublyLinkedList es una estructura que contiene punteros a los nodos de cabeza y cola en la lista doblemente enlazada.
- El tamaño representa el número de nodos en la lista.
- SizeList() devuelve el tamaño de la lista.
- HeadList() devuelve el encabezado de la lista.
- Insertar (interfaz de datos{}) inserta un nuevo nodo con los datos proporcionados en la lista y devuelve el nodo recién insertado.
- Print() imprime la identificación y el nombre de todos los estudiantes en la lista.
- IsEmpty() devuelve verdadero si la lista está vacía, falso en caso contrario.

## Log


```golang
type Log struct {
    Desc string
    Date time.Time
}
```

Log es una estructura que contiene una descripción y una marca de tiempo.

## Queue

````golang
type Queue struct {
    Head, Tail *SimpleNode
    Size       int
}
````

- La cola es una estructura que contiene punteros a los nodos de cabeza y cola en la lista enlazada individualmente.
- El tamaño representa el número de nodos en la lista.
- NewQueue() crea y devuelve una nueva cola.
- Enqueue (interfaz de datos{}) agrega un nuevo nodo con los datos proporcionados al final de la cola.
- Dequeue() elimina y devuelve los datos del principio de la cola.
- IsEmpty() devuelve verdadero si la cola está vacía, falso en caso contrario.
- SizeQueue() devuelve el tamaño de la cola.
- Front() devuelve los datos de la cabeza de la cola.

## SimpleNode

```golang
type SimpleNode struct {
    Next *SimpleNode
    Data interface{}
}
```

- SimpleNode es una estructura que contiene un puntero al nodo siguiente en la lista enlazada individualmente.

## Stack

```golang
type Stack struct {
    Top *SimpleNode
    Size int
}
```

- Stack es una estructura que contiene un puntero al nodo superior en la pila.
- El tamaño representa el número de nodos en la pila.
- NewStack() crea y devuelve una nueva pila.
- Push (interfaz de datos{}) agrega un nuevo nodo con los datos proporcionados al principio de la pila.
- Pop() elimina y devuelve los datos del principio de la pila.
- IsEmpty() devuelve verdadero si la pila está vacía, falso en caso contrario.
- SizeStack() devuelve el tamaño de la pila.
- TopStack() devuelve los datos del nodo superior de la pila.

## Paquete Model

El paquete model contiene las estructuras de datos y funciones que conforman la lógica del modelo de la aplicación EDDGoDrive.

## Funciones
`AddStudentToQueue`
Agrega un nuevo estudiante a la cola de estudiantes pendientes para su aprobación.

```go
func AddStudentToQueue(name string, id string, password string)
```

Argumentos:

- name: Nombre del estudiante a agregar.
- id: Carné del estudiante a agregar.
- password: Contraseña del estudiante a agregar.

`CheckCredentials`
Verifica si las credenciales ingresadas corresponden a un estudiante aprobado en el sistema.

```go
func CheckCredentials(id string, pass string) (student *controller.Student, msg string)
```
Argumentos:

- id: Carné del estudiante a verificar.
- pass: Contraseña del estudiante a verificar.
Retorna:

- student: Objeto Student correspondiente al estudiante aprobado si las credenciales son correctas, nil en caso contrario.
- msg: Mensaje indicando el resultado de la verificación.

`CheckPendingStudents`
Verifica si hay estudiantes pendientes de aprobación y realiza la acción correspondiente dependiendo de si el estudiante es aprobado o rechazado.

```go
func CheckPendingStudents(queue *controller.Queue, isApproved bool)
```

Argumentos:

- queue: Cola de estudiantes pendientes a verificar.
- isApproved: Indica si el estudiante debe ser aprobado (true) o rechazado (false).

`CheckStudentLogs`

Agrega una nueva entrada al historial de logs de un estudiante.

````go
func CheckStudentLogs(student *controller.Student)
````

Argumentos:

- student: Objeto Student al que se le agregará la entrada al historial de logs.

DisplayPendingStudent
Muestra en consola la cantidad de estudiantes pendientes de aprobación y el nombre del estudiante actual en la cola de pendientes.

````go
func DisplayPendingStudent()
`````

`MassiveInsertion`
Realiza la inserción masiva de estudiantes a partir de un archivo CSV.

````go
func MassiveInsertion(filename string) (int, error)
`````

Argumentos:

- filename: Nombre del archivo CSV con los datos de los estudiantes a insertar.
Retorna:

- counter: Cantidad de estudiantes insertados.
- error: Error en caso de que no se pueda leer el archivo.

`ModifyTextView`
Modifica la consola para mostrar un mensaje con un color y estilo de texto específico.

````go
func ModifyTextView(properties string, text string, reset ...string)
````
Argumentos:

- properties: Propiedades que definen el color y estilo de texto a mostrar.
- text: Texto a mostrar.
- reset: Propiedades adicionales que se utilizarán para resetear la consola.

`PrintApprovedStudents`
Muestra en consola la lista de estudiantes aprobados en el sistema.

```go
func PrintApprovedStudents(dll *controller.DoublyLinkedList)
```
Argumentos:

- dll: Lista doblemente enlazada con los estudiantes aprobados.
PrintStudentLogs
Muestra en consola el historial de logs de un estudiante.

````go
func PrintStudentLogs(stundet *controller.Student)
````

Argumentos:

- student: Objeto Student del cual se mostrará el historial de logs.

`PrintStudents`
Muestra en consola la lista de estudiantes pendientes de aprobación.

````go
func PrintStudents(queue *controller.Queue)
````

Argumentos:

- queue: Cola de estudiantes pendientes de aprobación.

### Librerías utilizadas
- [fmt](https://golang.org/pkg/fmt/)
- [os](https://golang.org/pkg/os/)
- [survey](github.com/AlecAivazis/survey/v2)
- [tablewriter](github.com/olekukonko/tablewriter)


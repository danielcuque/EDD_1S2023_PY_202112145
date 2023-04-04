class Node {
  constructor(description) {
    this.description = description;
    this.date = null;
    this.hour = null;
    this.next = null;
  }
}

export class CircularLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  addWithDate(description, date, hour) {
    const newNode = new Node(description);
    newNode.date = date;
    newNode.hour = hour;

    // If the list is empty, set the head to the new node
    if (!this.head) {
      this.head = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
  }


  // Remove the node at the front of the list
  remove() {
    // If the list is empty, return
    if (!this.head) {
      return;
    }

    // If the list has only one node, set the head and tail to null
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      return;
    }

    // Set the head to the next node
    this.head = this.head.next;

    // Set the next of the tail to the new head
    this.tail.next = this.head;
  }

  convertToGraphviz() {
    let nodoActual = cabeza;
    let codigo = "digraph G {\n";
    codigo += "  rankdir=LR;\n";
    codigo += "  node [shape=circle];\n";
    codigo += "  edge [arrowhead=vee];\n";

    if (cabeza) {
      codigo += `  "${nodoActual.valor}" -> "${nodoActual.siguiente.valor}";\n`;
      nodoActual = nodoActual.siguiente;

      while (nodoActual != cabeza) {
        codigo += `  "${nodoActual.valor}" -> "${nodoActual.siguiente.valor}";\n`;
        nodoActual = nodoActual.siguiente;
      }
    }

    codigo += "  { rank=same; ";
    codigo += `"${cabeza.valor}" -> "${cabeza.anterior.valor}" -> "${cabeza.valor}"`;
    codigo += " }\n";
    codigo += "}";

    return codigo;

  }

  toJSON() {
    const nodesArray = [];

    let current = this.head;
    do {
      if (!current) {
        break;
      }
      nodesArray.push(
        {
          description: current.description,
          date: current.date,
          hour: current.hour
        }
      );
      current = current.next;
    } while (current !== this.head);
    console.log(nodesArray);
    return nodesArray;
  }
}
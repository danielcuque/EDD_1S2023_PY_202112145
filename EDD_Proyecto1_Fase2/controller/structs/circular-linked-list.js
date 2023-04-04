class Node {
  constructor(description) {
    this.description = description;
    this.date = null;
    this.hour = null;
    this.next = null;
  }

  nodeDescriptionToGraphviz() {
    return `${this.description} \\n
    Fecha: ${this.date} \\n
    Hora: ${this.hour}`
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
      this.tail = newNode;
      this.tail.next = this.head
    } else {
      newNode.next = this.head;
      this.head = newNode;
      this.tail.next = this.head;
    }
    this.size++;
    return newNode
  }

  convertToGraphviz() {
    if (!this.head) {
      return "";
    }
    let report = "https://quickchart.io/graphviz?graph=digraph G { \n";
    report += "node [shape=box]; \n";
    report += "rankdir=LR; \n";
    let current = this.head;
    let index = 0;

    while (index < this.size) {
      report += `node${index} [label="${current.nodeDescriptionToGraphviz()}"]; \n`;
      report += `node${index} -> node${index + 1 >= this.size ? 0 + ' [constraint=false]' : index + 1} ;\n`;
      current = current.next;
      index++;
    }
    report += "rank = same; \n";
    report += "}";
    return report;

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

    return nodesArray;
  }
}
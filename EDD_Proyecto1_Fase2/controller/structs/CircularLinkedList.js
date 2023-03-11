class CircularLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  // Add a node to the end of the list
  add(value) {
    const newNode = new Node(value);

    // If the list is empty, set the head to the new node
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      newNode.next = newNode;
      return;
    }

    // Set the next of the tail to the new node
    this.tail.next = newNode;

    // Set the next of the new node to the head
    newNode.next = this.head;

    // Set the tail to the new node
    this.tail = newNode;
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
}
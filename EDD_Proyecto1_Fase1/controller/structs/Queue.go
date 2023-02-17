package structs

import (
	"fmt"
)


type Queue struct {
	items *DoublyLinkedList
}

func NewQueue() *Queue {
	return &Queue{
		items: NewDoublyLinkedList(),
	}
}

func (q *Queue) Enqueue(data interface{}) *Node {
    return q.items.InsertAtStart(data)
}

func (q *Queue) Dequeue() *Node {
    if q.items.Size() == 0 {
        return nil
    }
    return q.items.RemoveAtPosition(q.items.Size() - 1)
}

func (q *Queue) DequeueByIndex(index int) *Node {
    if q.items.Size() == 0 {
        return nil
    }
    return q.items.RemoveAtPosition(index)
}

func (q *Queue) Traverse() {
    node := q.items.Head()
    for node != nil {
        fmt.Printf("%v\n", node.Data)
        node = node.Next
    }
}

func (q *Queue) IsEmpty() bool {
    return q.items.Size() == 0
}

func (q *Queue) GetSize() int {
    return q.items.Size()
}
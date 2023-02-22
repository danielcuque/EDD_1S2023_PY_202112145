package controller

import (
	"fmt"
)

// Node struct
type Node struct {
	Next, Prev *Node
	Data       interface{}
}

type DoublyLinkedList struct {
	Head, Tail *Node
	Size       int
}

func (dll *DoublyLinkedList) SizeList() int {
	return dll.Size
}

func (dll *DoublyLinkedList) HeadList() *Node {
	return dll.Head
}

func NewNode(data interface{}) *Node {
	return &Node{Data: data,
		Next: nil,
		Prev: nil,
	}
}

func NewDoublyLinkedList() *DoublyLinkedList {
	return &DoublyLinkedList{
		Head: nil,
		Size: 0,
	}
}

func (dll *DoublyLinkedList) InsertAtStart(data interface{}) *Node {
	node := NewNode(data)
	if dll.IsEmpty() {
		dll.Head = node

	} else {
		node.Next = dll.Head
		dll.Head.Prev = node
		dll.Head = node
	}

	dll.Size++
	return node

}

func (dll *DoublyLinkedList) InsertAtEnd(data interface{}) *Node {
	node := NewNode(data)
	if dll.Size == 0 {
		dll.Head = node
		dll.Tail = node
	} else {
		node.Prev = dll.Tail
		dll.Tail.Next = node
		dll.Tail = node
	}

	dll.Size++
	return node
}

func (dll *DoublyLinkedList) RemoveAtStart() interface{} {
	if dll.IsEmpty() {
		return nil
	}

	data := dll.Head.Data
	dll.Head = dll.Head.Next

	if dll.Head != nil {
		dll.Head.Prev = nil
	}

	dll.Size--
	return data
}

func (dll *DoublyLinkedList) RemoveAtEnd() interface{} {
	if dll.IsEmpty() {
		return nil
	}

	data := dll.Tail.Data
	if dll.Head == dll.Tail {
		dll.Head = nil
		dll.Tail = nil
	} else {
		dll.Tail = dll.Tail.Prev
		dll.Tail.Next = nil
	}
	dll.Size--
	return data
}

func (dll *DoublyLinkedList) Print() {
	if dll.IsEmpty() {
		fmt.Println("Empty list")
		return
	}
	curr := dll.Head
	for curr != nil {
		var data *Student = curr.Data.(*Student)
		fmt.Println(
			"ID: ", data.Id,
			"Name: ", data.Name,
		)

		curr = curr.Next
	}
}

func (dll *DoublyLinkedList) IsEmpty() bool {
	return dll.Size == 0
}

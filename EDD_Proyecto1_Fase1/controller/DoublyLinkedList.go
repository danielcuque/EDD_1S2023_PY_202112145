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

func (dll *DoublyLinkedList) Insert(data interface{}) *Node {
	node := NewNode(data)
	if dll.IsEmpty() {
		dll.Head = node
		dll.Tail = node
		dll.Size++
		return node
	}

	if dll.Head.Data.(*Student).Id >= data.(*Student).Id {
		node.Next = dll.Head
		dll.Head.Prev = node
		dll.Head = node
		dll.Size++
		return node
	}

	current := dll.Head
	for current.Next != nil && current.Next.Data.(*Student).Id < data.(*Student).Id {
		current = current.Next
	}

	node.Next = current.Next
	node.Prev = current

	if current.Next != nil {
		current.Next.Prev = node
	} else {
		dll.Tail = node
	}

	current.Next = node
	dll.Size++
	return node
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

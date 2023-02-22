package controller

type SimpleNode struct {
	Next *SimpleNode
	Data interface{}
}

type SinglyLinkedList struct {
	Head, Tail *SimpleNode
	Size       int
}

func NewSimpleNode(data interface{}) *SimpleNode {
	return &SimpleNode{Data: data,
		Next: nil,
	}
}

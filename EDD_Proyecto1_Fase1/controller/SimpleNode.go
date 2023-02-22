package controller

type SimpleNode struct {
	Next *SimpleNode
	Data interface{}
}

func NewSimpleNode(data interface{}) *SimpleNode {
	return &SimpleNode{Data: data,
		Next: nil,
	}
}

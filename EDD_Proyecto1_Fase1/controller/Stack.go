package controller


type Stack struct {
	items *DoublyLinkedList
}

func NewStack() *Stack {
	return &Stack{
		items: NewDoublyLinkedList(),
	}
}

func (s *Stack) Push(data interface{}) *Node {
    node := &Node{Data: data,
		Next: nil,
		Prev: nil,
	}

    if s.IsEmpty() {
        s.items.InsertAtEnd(data)
    } else {
        node.Next = s.items.Head
        s.items.Head.Prev = node
        s.items.Head = node
        s.items.Size++
    }
    return node
}

func (s *Stack) Pop() *Node {
	if s.IsEmpty() {
		return nil
	}
	return s.items.RemoveAtStart()
}

func (s *Stack) Peek() *Node {
	if s.IsEmpty() {
		return nil
	}
	return s.items.HeadList()
}

func (s *Stack) IsEmpty() bool {
	return s.IsEmpty()
}
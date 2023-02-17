package structs 

type Stack struct {
	items *DoublyLinkedList
}

func NewStack() *Stack {
	return &Stack{
		items: NewDoublyLinkedList(),
	}
}

func (s *Stack) Push(data interface{}) *Node {
    node := NewNode(data)
    if s.stack.IsEmpty() {
        s.stack.InsertAtEnd(data)
    } else {
        node.Next = s.stack.Head
        s.stack.Head.Prev = node
        s.stack.Head = node
        s.stack.Size++
    }
    return node
}

func (s *Stack) Pop() *Node {
	if s.stack.IsEmpty() {
		return nil
	}
	return s.stack.RemoveAtStart()
}

func (s *Stack) Peek() *Node {
	if s.stack.IsEmpty() {
		return nil
	}
	return s.stack.Head()
}

func (s *Stack) IsEmpty() bool {
	return s.stack.IsEmpty()
}
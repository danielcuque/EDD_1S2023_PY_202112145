package controller

type Stack struct {
	Top  *SimpleNode
	Size int
}

func (s *Stack) IsEmpty() bool {
	return s.Size == 0
}

func (s *Stack) Push(data interface{}) *SimpleNode {
	node := NewSimpleNode(data)

	if s.IsEmpty() {
		s.Top = node
	} else {
		node.Next = s.Top
		s.Top = node
	}
	s.Size++
	return node
}

func (s *Stack) Pop() interface{} {
	if s.IsEmpty() {
		return nil
	}
	data := s.Top.Data
	s.Top = s.Top.Next
	s.Size--
	return data
}

func (s *Stack) Peek() interface{} {
	if s.IsEmpty() {
		return nil
	}
	return s.Top.Data
}

func (s *Stack) SizeStack() int {
	return s.Size
}

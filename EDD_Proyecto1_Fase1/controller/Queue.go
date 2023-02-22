package controller

type Queue struct {
	Head, Tail *Node
	Size       int
}

func (q *Queue) Enqueue(data interface{}) {
	node := &Node{Data: data}
	if q.Size == 0 {
		q.Head = node
		q.Tail = node
	} else {
		q.Tail.Next = node
		q.Tail = node
	}
}

func (q *Queue) Dequeue() interface{} {
	if q.Size == 0 {
		return nil
	}
	data := q.Head.Data
	q.Head = q.Head.Next
	q.Size--
	return data
}

func (q *Queue) IsEmpty() bool {
	return q.Size == 0
}

func (q *Queue) SizeQueue() int {
	return q.Size
}

func (q *Queue) Peek() interface{} {
	if q.Size == 0 {
		return nil
	}
	return q.Head.Data
}

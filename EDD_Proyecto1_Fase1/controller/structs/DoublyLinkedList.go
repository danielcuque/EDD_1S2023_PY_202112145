package structs

// Node struct
type Node struct {
	Next *Node
	Prev *Node
	Data interface{}
}

type DoublyLinkedList struct {
	Head *Node
	Tail *Node
	Size int
}

func (dll *DoublyLinkedList) Head() *Node {
	return dll.head
}

func (dll *DoublyLinkedList) Tail() *Node {
	return dll.tail
}

func (dll *DoublyLinkedList) Size() int {
	return dll.size
}

func (n *Node) NewNode(data interface{}) *Node {
	return &Node{Data: data,
		Next: nil,
		Prev: nil,

	}
}

func NewDoublyLinkedList() *DoublyLinkedList {
	return &DoublyLinkedList{}
}

func (dll *DoublyLinkedList) InsertAtStart(data interface{}) *Node {
    node := &Node{Data: data}
    if dll.size == 0 {
        dll.head = node
        dll.tail = node
    } else {
        node.Next = dll.head
        dll.head.Prev = node
        dll.head = node
    }
    dll.size++
    return node
}

func SortAsc(list *DoublyLinkedList) {
    if list.IsEmpty() || list.Head == list.Tail {
        return // list is already sorted
    }

    current := list.Head.Next

    for current != nil {
        key := current.Data
        j := current.Prev

        for j != nil && j.Data.(int) > key.(int) {
            // Swap j and j.Next
            j.Data, j.Next.Data = j.Next.Data, j.Data
            j = j.Prev
        }
        current = current.Next
    }
}

func (dll *DoublyLinkedList) InsertAtEnd(data interface{}) *Node {
	node := &Node{Data: data}
	if dll.size == 0 {
		dll.head = node
		dll.tail = node
	} else {
		node.Prev = dll.tail
		dll.tail.Next = node
		dll.tail = node
	}
	dll.size++
	return node
}

func (dll *DoublyLinkedList) InsertAtPosition(data interface{}, position int) *Node {
    if position < 0 || position > dll.size {
        return nil
    }
    if position == 0 {
        return dll.InsertAtStart(data)
    }
    if position == dll.size {
        return dll.InsertAtEnd(data)
    }
    node := &Node{Data: data}
    curr := dll.head
    for i := 0; i < position-1; i++ {
        curr = curr.Next
    }
    node.Prev = curr
    node.Next = curr.Next
    curr.Next.Prev = node
    curr.Next = node
    dll.size++
    return node
}

func (dll *DoublyLinkedList) RemoveAtStart() *Node {
    if dll.size == 0 {
        return nil
    }
    node := dll.head
    if dll.size == 1 {
        dll.head = nil
        dll.tail = nil
    } else {
        dll.head = node.Next
        dll.head.Prev = nil
    }
    node.Next = nil
    dll.size--
    return node
}


func (dll *DoublyLinkedList) RemoveAtEnd() *Node {
    if dll.size == 0 {
        return nil
    }
    node := dll.tail
    if dll.size == 1 {
        dll.head = nil
        dll.tail = nil
    } else {
        dll.tail = node.Prev
        dll.tail.Next = nil
    }
    node.Prev = nil
    dll.size--
    return node
}

func (dll *DoublyLinkedList) RemoveAtPosition(position int) *Node {
    if position < 0 || position >= dll.size {
        return nil
    }

    var node *Node
    if position == 0 {
        node = dll.head
        dll.head = node.Next
        if dll.head != nil {
            dll.head.Prev = nil
        } else {
            dll.tail = nil
        }
    } else if position == dll.size-1 {
        node = dll.tail
        dll.tail = node.Prev
        dll.tail.Next = nil
    } else {
        node = dll.head
        for i := 0; i < position; i++ {
            node = node.Next
        }
        node.Prev.Next = node.Next
        node.Next.Prev = node.Prev
    }

    node.Next, node.Prev = nil, nil
    dll.size--
    return node
}
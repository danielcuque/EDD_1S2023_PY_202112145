package structs

// Node struct
type Node struct {
	Next, Prev *Node
	Data interface{}
}

type DoublyLinkedList struct {
	Head, Tail *Node
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

// Sort minor to major
func (l *DoublyLinkedList) SortById() {
    if list.Size < 2 {
        return
    }
    newHead := list.Head
    newTail := list.Tail
    for current := list.Head.Next; current != nil; current = current.Next {
        if current.Student.ID < newHead.Student.ID {
            current.Prev = nil
            newHead.Prev = current
            current.Next = newHead
            newHead = current
        } else if current.Student.ID > newTail.Student.ID {
            current.Next = nil
            newTail.Next = current
            current.Prev = newTail
            newTail = current
        } else {
            next := current.Next
            for check := newHead.Next; check != current; check = check.Next {
                if check.Student.ID > current.Student.ID {
                    current.Prev = check.Prev
                    current.Next = check
                    check.Prev.Next = current
                    check.Prev = current
                    break
                }
            }
            current = next
        }
    }
    list.Head = newHead
    list.Tail = newTail
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
    if dll.IsEmpty() {
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

func (dll *DoublyLinkedList) Print() {
    if dll.IsEmpty() {
        fmt.Println("Empty list")
        return
    }
    curr := dll.head
    for curr != nil {
        fmt.Println(curr.Data)
        curr = curr.Next
    }
}

func (dll *DoublyLinkedList) PrintReverse() {
    if dll.IsEmpty() {
        fmt.Println("Empty list")
        return
    }
    curr := dll.tail
    for curr != nil {
        fmt.Println(curr.Data)
        curr = curr.Prev
    }
}

func (dll *DoublyLinkedList) IsEmpty() bool {
    return dll.size == 0
}
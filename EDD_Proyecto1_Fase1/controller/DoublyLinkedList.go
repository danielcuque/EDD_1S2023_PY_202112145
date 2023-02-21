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

func (dll *DoublyLinkedList) TailList() *Node {
	return dll.Tail
}

func (n *Node) NewNode(data interface{}) *Node {
	return &Node{Data: data,
		Next: nil,
		Prev: nil,
	}
}

func NewDoublyLinkedList() *DoublyLinkedList {
	return &DoublyLinkedList{
		Head: nil,
		Tail: nil,
		Size: 0,
	}
}

func CheckCredentials(dll *DoublyLinkedList, id string, pass string) (student *Student, msg string) {

	for current := dll.Head; current != nil; current = current.Next {
		if current.Data.(*Student).Id == id {
			if current.Data.(*Student).Password == pass {
				return current.Data.(*Student), "ok"
			} else {
				return nil, "Contraseña incorrecta"
			}
		} else {
			return nil, "Usuario no encontrado"
		}
	}
	return nil, "Usuario o contraseña incorrectos"
}

func (dll *DoublyLinkedList) InsertAtStart(data interface{}) *Node {
	node := &Node{Data: data}
	if dll.Size == 0 {
		dll.Head = node
		dll.Tail = node
	} else {
		node.Next = dll.Head
		dll.Head.Prev = node
		dll.Head = node
	}
	dll.Size++
	return node
}

// Sort minor to major
// func (list *DoublyLinkedList) SortById() {
//     if list.Size < 2 {
//         return
//     }
//     newHead := list.Head
//     newTail := list.Tail
//     for current := list.Head.Next; current != nil; current = current.Next {
//         if current.Student.ID < newHead.Student.ID {
//             current.Prev = nil
//             newHead.Prev = current
//             current.Next = newHead
//             newHead = current
//         } else if current.Student.ID > newTail.Student.ID {
//             current.Next = nil
//             newTail.Next = current
//             current.Prev = newTail
//             newTail = current
//         } else {
//             next := current.Next
//             for check := newHead.Next; check != current; check = check.Next {
//                 if check.Student.ID > current.Student.ID {
//                     current.Prev = check.Prev
//                     current.Next = check
//                     check.Prev.Next = current
//                     check.Prev = current
//                     break
//                 }
//             }
//             current = next
//         }
//     }
//     list.Head = newHead
//     list.Tail = newTail
// }

func (dll *DoublyLinkedList) InsertAtEnd(data interface{}) *Node {
	node := &Node{Data: data}
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

func (dll *DoublyLinkedList) InsertAtPosition(data interface{}, position int) *Node {
	if position < 0 || position > dll.Size {
		return nil
	}
	if position == 0 {
		return dll.InsertAtStart(data)
	}
	if position == dll.Size {
		return dll.InsertAtEnd(data)
	}
	node := &Node{Data: data}
	curr := dll.Head
	for i := 0; i < position-1; i++ {
		curr = curr.Next
	}
	node.Prev = curr
	node.Next = curr.Next
	curr.Next.Prev = node
	curr.Next = node
	dll.Size++
	return node
}

func (dll *DoublyLinkedList) RemoveAtStart() *Node {
	if dll.Size == 0 {
		return nil
	}
	node := dll.Head
	if dll.Size == 1 {
		dll.Head = nil
		dll.Tail = nil
	} else {
		dll.Head = node.Next
		dll.Head.Prev = nil
	}
	node.Next = nil
	dll.Size--
	return node
}

func (dll *DoublyLinkedList) RemoveAtEnd() *Node {
	if dll.IsEmpty() {
		return nil
	}
	node := dll.Tail
	if dll.Size == 1 {
		dll.Head = nil
		dll.Tail = nil
	} else {
		dll.Tail = node.Prev
		dll.Tail.Next = nil
	}
	node.Prev = nil
	dll.Size--
	return node
}

func (dll *DoublyLinkedList) RemoveAtPosition(position int) *Node {
	if position < 0 || position >= dll.Size {
		return nil
	}

	var node *Node
	if position == 0 {
		node = dll.Head
		dll.Head = node.Next
		if dll.Head != nil {
			dll.Head.Prev = nil
		} else {
			dll.Tail = nil
		}
	} else if position == dll.Size-1 {
		node = dll.Tail
		dll.Tail = node.Prev
		dll.Tail.Next = nil
	} else {
		node = dll.Head
		for i := 0; i < position; i++ {
			node = node.Next
		}
		node.Prev.Next = node.Next
		node.Next.Prev = node.Prev
	}

	node.Next, node.Prev = nil, nil
	dll.Size--
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

func (dll *DoublyLinkedList) PrintReverse() {
	if dll.IsEmpty() {
		fmt.Println("Empty list")
		return
	}
	curr := dll.Tail
	for curr != nil {
		fmt.Println(curr.Data)
		curr = curr.Prev
	}
}

func (dll *DoublyLinkedList) IsEmpty() bool {
	return dll.Size == 0
}

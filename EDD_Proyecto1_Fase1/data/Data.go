package data

import (
	C "github.com/danielcuque/fase1/controller"
)

// DoublyLinkedList struct
var store = C.NewDoublyLinkedList()

// Insert admin user
func InsertAdmin() {
	store.InsertAtStart(
		C.NewStudent(1, "admin", "admin"),
	)
	store.Print()
}

// Insert student user

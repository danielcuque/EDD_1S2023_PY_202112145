package data

import (
	"github.com/danielcuque/fase1/controller"
)

// DoublyLinkedList struct
var Store = controller.NewDoublyLinkedList()

// Insert admin user
func InsertAdmin() {
	Store.InsertAtStart(
		controller.NewStudent("2021", "admin", "admin"),
	)
}

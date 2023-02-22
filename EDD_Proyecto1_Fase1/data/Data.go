package data

import (
	"github.com/danielcuque/fase1/controller"
)

// DoublyLinkedList struct
var ListApprovedStudents = controller.NewDoublyLinkedList()
var QueuePendingStudents = controller.NewQueue()

// Insert admin user
func InsertAdmin() {
	ListApprovedStudents.InsertAtStart(
		controller.NewStudent("2021", "admin", "admin"),
	)
}

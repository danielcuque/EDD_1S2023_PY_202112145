package data

import (
	"github.com/danielcuque/fase1/controller"
)

// DoublyLinkedList struct
var ListApprovedStudents = controller.NewDoublyLinkedList()
var QueuePendingStudents = controller.NewQueue()
var AdminStackLogs = controller.NewStack()
var StudenStacktLogs = controller.NewStack()

// Insert admin user
func InsertAdmin() {
	ListApprovedStudents.InsertAtEnd(
		controller.NewStudent("231", "admin", "admin"),
	)
	ListApprovedStudents.InsertAtEnd(
		controller.NewStudent("202112145", "Daniel Cuque", "1234"),
	)
}

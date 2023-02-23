package data

import (
	"github.com/danielcuque/fase1/controller"
)

// DoublyLinkedList struct
var ListApprovedStudents = controller.NewDoublyLinkedList()
var QueuePendingStudents = controller.NewQueue()
var AdminStackLogs = controller.NewStack()
var StudenStacktLogs = controller.NewStack()
var UserLogged *controller.Student = nil

// Insert admin user
func InsertAdmin() {
	ListApprovedStudents.InsertAtEnd(controller.NewStudent("202100000", "admin", "admin"))
}

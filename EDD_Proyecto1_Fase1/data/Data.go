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
	ListApprovedStudents.InsertAtEnd(controller.NewStudent("202112104", "Daniel Cuque", "1234"))
	ListApprovedStudents.InsertAtEnd(controller.NewStudent("202112133", "Daniel Cuque", "1234"))
	ListApprovedStudents.InsertAtEnd(controller.NewStudent("202112112", "Daniel Cuque", "1234"))
	ListApprovedStudents.InsertAtEnd(controller.NewStudent("202112154", "Daniel Cuque", "1234"))
}

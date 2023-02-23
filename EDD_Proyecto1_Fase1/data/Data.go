package data

import (
	"github.com/danielcuque/fase1/controller"
)

// Global variables
var ListApprovedStudents = controller.NewDoublyLinkedList()
var QueuePendingStudents = controller.NewQueue()

// Describe the actions of the admin when aproving or rejecting a student
var AdminStackLogs = controller.NewStack()

var ListStudentLogs = controller.NewDoublyLinkedList()
var Exit = false

// Insert admin user
func InsertAdmin() {
	ListApprovedStudents.Insert(controller.NewStudent("202100000", "admin", "admin"))
}

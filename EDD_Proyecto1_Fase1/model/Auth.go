package model

import (
	"fmt"

	"github.com/danielcuque/fase1/controller"
)

func InsertNewStudent() {
	// Inser
}

func PrintStudents(dll *controller.DoublyLinkedList) {
	current := dll.Head
	for current != nil {
		student := current.Data.(*controller.Student)
		if student.Name == "admin" {
			current = current.Next
			continue
		}
		fmt.Printf(
			"Nombre: %s, Carnet: %s\n", student.Name, student.Id,
		)

		current = current.Next
	}
}

func CheckCredentials(dll *controller.DoublyLinkedList, id string, pass string) (student *controller.Student, msg string) {

	for current := dll.Head; current != nil; current = current.Next {
		if current.Data.(*controller.Student).Id == id {
			if current.Data.(*controller.Student).Password == pass {
				return current.Data.(*controller.Student), "ok"
			} else {
				return nil, "Contraseña incorrecta"
			}
		} else {
			return nil, "Usuario no encontrado"
		}
	}
	return nil, "Usuario o contraseña incorrectos"
}

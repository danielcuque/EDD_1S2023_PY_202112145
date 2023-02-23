package model

import (
	"encoding/csv"
	"fmt"
	"log"
	"os"
	"strconv"

	"github.com/danielcuque/fase1/controller"
	"github.com/danielcuque/fase1/data"
	"github.com/mgutz/ansi"
)

func MassiveInsertion(filename string) (int, error) {
	// Read file
	file, err := os.Open(filename)
	if err != nil {
		return 0, err
	}
	defer file.Close()

	// Crear lector de CSV
	reader := csv.NewReader(file)
	// Read and discard the first row (headers)
	_, err = reader.Read()
	if err != nil {
		return 0, err
	}

	records, err := reader.ReadAll()
	if err != nil {
		log.Fatal(err)
	}

	counter := 0

	for _, record := range records {
		AddStudentToQueue(record[1], record[0], record[2])
		counter++

	}

	return counter, nil
}

func AddStudentToQueue(name string, id string, password string) {
	// Insertar a la cola
	newStudent := controller.NewStudent(id, name, password)
	data.QueuePendingStudents.Enqueue(newStudent)
}

func PrintApprovedStudents(dll *controller.DoublyLinkedList) {
	if dll.SizeList() == 1 {
		fmt.Println("No hay estudiantes registrados")
		return
	}

	current := dll.Head
	for current != nil {
		student := current.Data.(*controller.Student)
		if student.Name == "admin" {
			current = current.Next
			continue
		}
		ModifyTextView("orange", "Nombre: "+student.Name+" - Carnet: "+strconv.Itoa(student.Id))
		current = current.Next
	}
}

func ModifyTextView(properties string, text string) {
	foregroundColor := ansi.ColorCode(properties)
	fmt.Println(foregroundColor, text)
	fmt.Println()
}

func CheckPendingStudents(queue *controller.Queue, isApproved bool) {
	if queue.SizeQueue() == 0 {
		ModifyTextView("red", "No hay estudiantes pendientes")
		return
	}

	ModifyTextView("white+bh", "Pendientes"+strconv.Itoa(queue.SizeQueue()))
	ModifyTextView("white", "Estudiante actual: "+queue.Front().(*controller.Student).Name)

	if isApproved {
		ModifyTextView("green", "Estudiante aprobado")
		data.ListApprovedStudents.InsertAtEnd(queue.Dequeue())
	} else {
		ModifyTextView("red", "Estudiante rechazado")
		queue.Dequeue()
	}

}

func TransformId(id string) int {
	idInt, err := strconv.Atoi(id)
	if err != nil {
		panic(err)
	}
	return idInt
}

func CheckCredentials(dll *controller.DoublyLinkedList, id string, pass string) (student *controller.Student, msg string) {

	for current := dll.Head; current != nil; current = current.Next {
		// Check if id exists
		if current.Data.(*controller.Student).Id == TransformId(id) {
			// Check if password is correct
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

package model

import (
	"encoding/csv"
	"fmt"
	"log"
	"os"
	"strconv"
	"time"

	"github.com/danielcuque/fase1/controller"
	"github.com/danielcuque/fase1/data"
	"github.com/mgutz/ansi"
	"github.com/olekukonko/tablewriter"
)

func AddStudentToQueue(name string, id string, password string) {
	// Insertar a la cola
	newStudent := controller.NewStudent(id, name, password)
	data.QueuePendingStudents.Enqueue(newStudent)
}

func CheckCredentials(id string, pass string) (student *controller.Student, msg string) {

	current := data.ListApprovedStudents.Head
	for current != nil {
		student := current.Data.(*controller.Student)
		if student.Id == TransformToInt(id) {
			if student.Password == pass {
				return student, "ok"
			} else {
				return nil, "Contraseña incorrecta"
			}
		}
		current = current.Next
	}

	return nil, "Usuario no encontrado"
}

func CheckPendingStudents(queue *controller.Queue, isApproved bool) {

	if isApproved {
		ModifyTextView("green", "Estudiante aprobado")
		student := queue.Dequeue()
		data.ListApprovedStudents.Insert(student)
		data.AdminStackLogs.Push(controller.NewLog("Se aprobó al estudiante " + student.(*controller.Student).Name))
		GraphListApprovedStudent()
	} else {
		student := queue.Dequeue()
		data.AdminStackLogs.Push(controller.NewLog("Se rechazó al estudiante " + student.(*controller.Student).Name))
		ModifyTextView("red", "Estudiante rechazado")

	}

}

func CheckStudentLogs(student *controller.Student) {
	node := controller.NewLog("Se inicio sesión")
	student.StackLogs.Push(node)
}

func DisplayPendingStudent() {
	ModifyTextView("white+bh", "Pendientes: "+TransformToString(data.QueuePendingStudents.SizeQueue()))
	ModifyTextView("white", "Estudiante actual: "+data.QueuePendingStudents.Front().(*controller.Student).Name)

}

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

func ModifyTextView(properties string, text string, reset ...string) {
	foregroundColor := ansi.ColorCode(properties)
	fmt.Println(foregroundColor, text)
	fmt.Println()
}

func PrintApprovedStudents(dll *controller.DoublyLinkedList) {
	if dll.SizeList() == 1 {
		ModifyTextView("red", "No hay estudiantes registrados")
		return
	}
	ModifyTextView("blue+bh", "Estudiantes del sistema - EDDGoDrive")
	ModifyTextView("white", "")
	table := tablewriter.NewWriter(os.Stdout)
	table.SetHeader([]string{"Nombre", "Carné"})
	table.SetFooter([]string{"Total", TransformToString(dll.SizeList() - 1)})
	table.AppendBulk(StudentListToTableData(data.ListApprovedStudents)) // Add Bulk Data
	table.Render()
	fmt.Println()
}

func PrintStudentLogs(stundet *controller.Student) {
	ModifyTextView("blue+bh", "Logs del estudiante "+stundet.Name)
	ModifyTextView("white", "")
	table := tablewriter.NewWriter(os.Stdout)
	table.SetHeader([]string{"Fecha", "Descripción"})
	table.SetFooter([]string{"Total", TransformToString(stundet.StackLogs.SizeStack())})
	table.AppendBulk(StackToTableData(stundet.StackLogs)) // Add Bulk Data
	table.Render()
	fmt.Println()
}

func StudentListToTableData(list *controller.DoublyLinkedList) [][]string {
	data := make([][]string, 0)

	current := list.Head
	for current != nil {
		student := current.Data.(*controller.Student)
		if student.Name == "admin" {
			current = current.Next
			continue
		}
		row := []string{student.Name, TransformToString(student.Id)}
		data = append(data, row)
		current = current.Next
	}

	return data
}

func StackToTableData(stack *controller.Stack) [][]string {
	data := make([][]string, 0)

	current := stack.Top
	for current != nil {
		log := current.Data.(*controller.Log)
		row := []string{TransformDate(log.Date), log.Desc}
		data = append(data, row)
		current = current.Next
	}

	return data
}

func TransformDate(date time.Time) string {
	return date.Format("2006-01-02 15:04:05")
}

func TransformToInt(id string) int {
	idInt, err := strconv.Atoi(id)
	if err != nil {
		panic(err)
	}
	return idInt
}

func TransformToString(id int) string {
	idString := strconv.Itoa(id)
	return idString
}

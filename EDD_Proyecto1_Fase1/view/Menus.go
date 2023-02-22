package view

import (
	"fmt"

	"github.com/AlecAivazis/survey/v2"
	"github.com/danielcuque/fase1/data"
	"github.com/danielcuque/fase1/model"
)

// InitialMenu muestra el menú inicial y realiza una acción basada en la opción seleccionada por el usuario
func InitialMenu() {

	answer := struct {
		InitialMenu string
	}{}

	ModifyText("blue+bh", "Bienvenido a GoDrive")

	err := survey.Ask(qsInitialMenu, &answer)
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	switch answer.InitialMenu {
	case "1. Iniciar sesión":
		LoginMenu()
	case "2. Salir del sistema":
		ModifyText("red+bh", "Saliendo del sistema...")
		return
	}

}

// AdminMenu muestra el menú de administrador y realiza una acción basada en la opción seleccionada por el usuario
func AdminMenu() {

	answer := struct {
		AdminMenu string
	}{}

	err := survey.Ask(qsAdminMenu, &answer)
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	switch answer.AdminMenu {
	case "1. Ver estudiantes pendientes":
		PendingStudents()
	case "2. Ver estudiantes del sistema":
		DisplayAllStudents()
	case "3. Registrar nuevo estudiante":
		AddNewStudent()
	case "4. Carga masiva de estudiantes":
		AddManyStudents()
	case "5. Cerrar sesión":
		LogOut()
	}

}

// StudentMenu muestra el menú de estudiante y realiza una acción basada en la opción seleccionada por el usuario
func StudentMenu() {

}

func LoginMenu(recursive ...string) {

	// Get answer for login form
	answer := struct {
		ID       string
		Password string
	}{}

	if len(recursive) > 0 {
		ModifyText("red+bh", recursive[0])
	}

	err := survey.Ask(qsLoginForm, &answer)
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	// Check if user exists
	data, msg := model.CheckCredentials(data.ListApprovedStudents, answer.ID, answer.Password)

	if data != nil {
		if data.Name == "admin" && data.Id == "231" && data.Password == "admin" {
			AdminMenu()
		} else {
			StudentMenu()
		}

	} else {
		LoginMenu(msg)
	}

}

// Menu 1
func PendingStudents() {

}

// Menu 2
func DisplayAllStudents() {
	ModifyText("blue+bh", "Estudiantes del sistema - EDDGoDrive")

	//Print all students
	model.PrintStudents(
		data.ListApprovedStudents,
	)

}

// Menu 3
func AddNewStudent() {

	ModifyText("blue+bh", "Registro de nuevo estudiante - EDDGoDrive")

	answer := struct {
		Nombre   string
		Apellido string
		Carnet   string
		Password string
	}{}

	err := survey.Ask(qsNewStudentForm, &answer)
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	// Check if student already exists
	_, msg := model.CheckCredentials(data.ListApprovedStudents, answer.Carnet, answer.Password)

	if msg == "" {
		ModifyText("red+bh", "El estudiante ya existe")
		AdminMenu()
	}

	// Create new student
	model.AddStudentToQueue(
		answer.Nombre+" "+answer.Apellido,
		answer.Carnet,
		answer.Password,
	)
}

// Menu 4
func AddManyStudents() {

}

func LogOut() {
	InitialMenu()
}

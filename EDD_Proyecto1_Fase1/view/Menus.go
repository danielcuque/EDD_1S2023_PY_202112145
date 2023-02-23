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
	for !data.Exit {
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
}

// AdminMenu muestra el menú de administrador y realiza una acción basada en la opción seleccionada por el usuario
func AdminMenu() {

	answer := struct {
		AdminMenu string
	}{}

	for {
		err := survey.Ask(qsAdminMenu, &answer)
		if err != nil {
			fmt.Println(err.Error())
			return
		}

		switch answer.AdminMenu {
		case "1. Ver estudiantes pendientes":
			SelectPendingStudents()
		case "2. Ver estudiantes del sistema":
			DisplayApprovedStudents()
		case "3. Registrar nuevo estudiante":
			AddNewStudent()
		case "4. Carga masiva de estudiantes":
			AddManyStudents()
		case "5. Cerrar sesión":
			LogOut()
			return
		}

	}
}

// StudentMenu muestra el menú de estudiante y realiza una acción basada en la opción seleccionada por el usuario
func StudentMenu() {

	answer := struct {
		StudentMenu string
	}{}

	for {
		err := survey.Ask(qsStudentMenu, &answer)
		if err != nil {
			fmt.Println(err.Error())
			return
		}

		switch answer.StudentMenu[0] {
		case '1':
			ModifyText("blue+bh", "Subir archivo")
		case '2':
			LogOut()
			return
		}

	}

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
	studentData, msg := model.CheckCredentials(data.ListApprovedStudents, answer.ID, answer.Password)

	if studentData != nil {
		if studentData.Name == "admin" && studentData.Id == 202100000 && studentData.Password == "admin" {
			AdminMenu()
		} else {
			StudentMenu()
		}
	} else {
		LoginMenu(msg)
	}

}

// Menu 1
func SelectPendingStudents() {

	ModifyText("blue+bh", "Estudiantes pendientes - EDDGoDrive")

	if data.QueuePendingStudents.IsEmpty() {
		ModifyText("red+bh", "No hay estudiantes pendientes")
		return
	}

	//Print all students
	backToMenu := false
	for !backToMenu {

		answer := struct {
			AproveStudent string
		}{}

		model.DisplayPendingStudent()

		err := survey.Ask(qsAproveStudent, &answer)
		if err != nil {
			fmt.Println(err.Error())
			return
		}

		switch answer.AproveStudent[0] {
		case '1':
			model.CheckPendingStudents(data.QueuePendingStudents, true)
		case '2':
			model.CheckPendingStudents(data.QueuePendingStudents, false)
		case '3':
			backToMenu = true
		}

	}
}

// Menu 2
func DisplayApprovedStudents() {

	//Print all students
	model.PrintApprovedStudents(
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

	if msg == "Usuario no encontrado" {
		model.AddStudentToQueue(
			answer.Nombre+" "+answer.Apellido,
			answer.Carnet,
			answer.Password,
		)
		ModifyText("green+bh", "El estudiante se ha agregado a la cola de espera")
	} else {
		ModifyText("red+bh", "El estudiante ya existe")
	}

}

// Menu 4
func AddManyStudents() {

	ModifyText("blue+bh", "Carga masiva de estudiantes - EDDGoDrive")

	answer := struct {
		MassiveInsertion string
	}{}

	err := survey.Ask(qsMassiveInsertion, &answer)
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	path := answer.MassiveInsertion

	qStudents, massiveInsertionError := model.MassiveInsertion(path)

	if massiveInsertionError != nil {
		ModifyText("red+bh", massiveInsertionError.Error())
		return
	}

	// Show how many students were added
	ModifyText("green+bh", "Se agregaron "+model.TransformIdToString(qStudents)+" estudiantes")

}

func LogOut() {
	ModifyText("red+bh", "Cerrando sesión...")
}

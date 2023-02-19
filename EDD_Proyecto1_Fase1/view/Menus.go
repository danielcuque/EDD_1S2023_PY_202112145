package view

import (
	"fmt"
	"github.com/AlecAivazis/survey/v2"
)



// InitialMenu muestra el menú inicial y realiza una acción basada en la opción seleccionada por el usuario
func InitialMenu() {

	answer := struct {
		InitialMenu string
	}{}

	err := survey.Ask(qsInitialMenu, &answer)
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	switch answer.InitialMenu {
	case "1. Iniciar sesión":
		LoginMenu()
	case "2. Salir del sistema":
		fmt.Println("Saliendo del sistema")
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
		AllStudents()
	case "3. Registrar nuevo estudiante":
		AddNewStudent()
	case "4. Carga masiva de estudiantes":
		AddManyStudents()
	case "5. Cerrar sesión":
		LogOut()
	}

}



func LoginMenu() {

	// Get answer for login form
	answer := struct {
		Login string
		Password string
	}{}

	err := survey.Ask(qsLoginForm, &answer)
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	// Check if user exists
	// If user exists, then check if password is correct
	// If password is correct, then show admin menu
	// If password is incorrect, then show error message
	// If user doesn't exist, then show error message
	// If user is not admin, then show error message
	// If user is admin, then show admin menu
	AdminMenu()

}




// Menu 1
func PendingStudents() {

}

// Menu 2
func AllStudents() {

}

// Menu 3
func AddNewStudent() {

}

// Menu 4
func AddManyStudents() {

}


func LogOut() {

}

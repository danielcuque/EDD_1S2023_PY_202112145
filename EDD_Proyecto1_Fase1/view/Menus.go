package view

import (
	"fmt"

	"github.com/AlecAivazis/survey/v2"
	"github.com/danielcuque/fase1/controller"
	"github.com/danielcuque/fase1/data"

	"github.com/mgutz/ansi"
)

// InitialMenu muestra el menú inicial y realiza una acción basada en la opción seleccionada por el usuario
func InitialMenu() {

	answer := struct {
		InitialMenu string
	}{}

	// cache escape codes and build strings manually
	foregroundColor := ansi.ColorCode("blue+bh")

	fmt.Println(foregroundColor, "Bienvenido a GoDrive")
	fmt.Println()

	err := survey.Ask(qsInitialMenu, &answer)
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	switch answer.InitialMenu {
	case "1. Iniciar sesión":
		LoginMenu()
	case "2. Salir del sistema":

		foregroundColor := ansi.ColorCode("red+bh")
		fmt.Println()
		fmt.Println(foregroundColor, "Saliendo del sistema")
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
		ID       string
		Password string
	}{}

	err := survey.Ask(qsLoginForm, &answer)
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	// Check if user exists
	store := data.Store
	if controller.CheckCredentials(store, answer.ID, answer.Password) {
		AdminMenu()
	} else {
		fmt.Println("Usuario o contraseña incorrectos")

	}

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
	InitialMenu()
}

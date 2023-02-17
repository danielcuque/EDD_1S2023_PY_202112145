package view

import (
	"fmt"
	"github.com/AlecAivazis/survey/v2"
)

var qsMain = []*survey.Question{
	{
		Name: "AdminMenu",
		Prompt: &survey.Select{
			Message: "Elige una opción",
			Options: []string{
				"1. Ver estudiantes pendientes",
				"2. Ver estudiantes del sistema",
				"3. Registrar nuevo estudiante",
				"4. Carga masiva de estudiantes",
				"5. Cerrar sesión",
				},
			},
		Validate: survey.Required,
	},
}

func AdminMenu() {

	// Get answer for main dashboard menu
	answer := struct {
		AdminMenu string
	}{}

	err := survey.Ask(qsMain, &answer)
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	// Switch case for main dashboard menu
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
		
	default:
		fmt.Println("Opción no válida")
		AdminMenu()
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

}

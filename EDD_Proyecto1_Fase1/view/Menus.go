package view

import (
	"fmt"
	"github.com/AlecAivazis/survey/v2"
)

var qsMain = []*survey.Question{
	{
		Name: "mainMenu",
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

func MainMenu() {

	// Get answer for main dashboard menu
	answer := struct {
		MainMenu string
	}{}

	err := survey.Ask(qsMain, &answer)
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	// Switch case for main dashboard menu
	switch answer.MainMenu {
	case "1. Ver estudiantes pendientes":
		Menu1()
	case "2. Ver estudiantes del sistema":
		Menu2()
}
}

func Menu1() {
	fmt.Println("Menu 1")
}

func Menu2() {
	fmt.Println("Menu 2")
}

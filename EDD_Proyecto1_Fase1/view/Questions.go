package view

import (
	"regexp"

	"github.com/AlecAivazis/survey/v2"
)

var qsInitialMenu = []*survey.Question{
	{
		Name: "InitialMenu",
		Prompt: &survey.Select{
			Message: "Elige una opción",
			Options: []string{
				"1. Iniciar sesión",
				"2. Salir del sistema",
			},
		},
		Validate: survey.Required,
	},
}

var qsAdminMenu = []*survey.Question{
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

var qsLoginForm = []*survey.Question{
	{
		Name: "ID",
		Prompt: &survey.Input{
			Message: "Ingresa tu usuario",
		},
		Validate: survey.Required,
	},
	{
		Name: "Password",
		Prompt: &survey.Password{
			Message: "Ingresa tu contraseña",
		},
		Validate: survey.Required,
	},
}

var qsNewStudentForm = []*survey.Question{
	{
		Name: "Nombre",
		Prompt: &survey.Input{
			Message: "Ingresa el nombre del estudiante",
		},
		Validate: survey.Required,
	},
	{
		Name: "Apellido",
		Prompt: &survey.Input{
			Message: "Ingresa el apellido del estudiante",
		},
		Validate: survey.Required,
	},
	{
		Name: "Carnet",
		Prompt: &survey.Input{
			Message: "Ingresa el carnet del estudiante",
		},
		Validate: func(val interface{}) error {

			s := val.(string)
			if len(s) != 8 && regexp.MustCompile(`[0-9]{8}`).MatchString(s) {
				ModifyText("red+bh", "El carnet debe tener 8 dígitos")
				return nil
			}
			return nil
		},
	},
	{
		Name: "Password",
		Prompt: &survey.Password{
			Message: "Ingresa la contraseña del estudiante",
		},
		Validate: survey.Required,
	},
}

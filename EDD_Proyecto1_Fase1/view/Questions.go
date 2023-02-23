package view

import (
	"fmt"
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
		Validate: func(ans interface{}) error {
			s := ans.(string)
			if len(s) != 9 && !regexp.MustCompile(`[0-9]{9}`).MatchString(s) {
				fmt.Println()
				return fmt.Errorf("el usuario debe tener 9 dígitos")
			}
			return nil

		},
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
			if len(s) != 9 && !regexp.MustCompile(`[0-9]{9}`).MatchString(s) {
				fmt.Println()
				return fmt.Errorf("el carnet debe tener 9 dígitos")
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

var qsMassiveInsertion = []*survey.Question{
	{
		Name: "MassiveInsertion",
		Prompt: &survey.Input{
			Message: "Ingresa el nombre del archivo",
		},
		Validate: func(val interface{}) error {

			s := val.(string)
			if !regexp.MustCompile(`[a-zA-Z0-9]+\.csv`).MatchString(s) {
				fmt.Println()
				return fmt.Errorf("el archivo debe ser un archivo CSV")
			}
			return nil
		},
	},
}

var qsAproveStudent = []*survey.Question{
	{
		Name: "AproveStudent",
		Prompt: &survey.Select{

			Message: "Elige una opción",
			Options: []string{
				"1. Aprobar estudiante",
				"2. Rechazar estudiante",
				"3. Volver al menú principal",
			},
		},
		Validate: survey.Required,
	},
}

var qsStudentMenu = []*survey.Question{
	{
		Name: "StudentMenu",
		Prompt: &survey.Select{
			Message: "Elige una opción",
			Options: []string{
				"1. Cerrar sesión",
			},
		},
		Validate: survey.Required,
	},
}

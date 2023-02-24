package model

import (
	"github.com/danielcuque/fase1/controller"
	"github.com/danielcuque/fase1/data"
)

func GenerateJSONReport() {
	if data.ListApprovedStudents.SizeList() == 1 {
		return
	}

	// Generamos el archivo .json
	filename := "report/alumnos_aprobados.json"

	// Generamos el contenido del archivo .json
	content := "{\n\t\"alumnos\": [\n"

	current := data.ListApprovedStudents.HeadList()
	for current != nil {
		student := current.Data.(*controller.Student)
		if student.Id == 202100000 {
			current = current.Next
			continue
		}

		name := student.Name
		carnet := TransformToString(student.Id)
		pass := student.Password

		content += "\t\t{\n"
		content += "\t\t\t\"nombre\": \"" + name + "\",\n"
		content += "\t\t\t\"carnet\": \"" + carnet + "\",\n"
		content += "\t\t\t\"password\": \"" + pass + "\",\n"
		content += "\t\t\t\"carpeta_raiz\": \"" + "/" + "\"\n"

		// Cerramos el objeto

		content += "\t\t},\n"
		current = current.Next
	}

	content += "\t]\n"
	content += "}"

	// Generamos el archivo .json
	GenerateFile(filename)

	// Generamos el contenido del archivo .json
	GenerateFileContent(content, filename)
}

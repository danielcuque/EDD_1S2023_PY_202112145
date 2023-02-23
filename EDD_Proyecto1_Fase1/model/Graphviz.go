package model

import (
	"io/ioutil"
	"os"
	"os/exec"

	"github.com/danielcuque/fase1/controller"
	"github.com/danielcuque/fase1/data"
)

func GenerateFile(filename string) {
	//Verifica que el archivo existe
	var _, err = os.Stat(filename)
	//Crea el archivo si no existe
	if os.IsNotExist(err) {
		var file, err = os.Create(filename)
		if err != nil {
			return
		}
		defer file.Close()
	}
}

func GenerateFileContent(content string, filename string) {
	var file, err = os.OpenFile(filename, os.O_RDWR, 0644)
	if err != nil {
		return
	}
	defer file.Close()
	// Escribe algo de texto linea por linea
	_, err = file.WriteString(content)
	if err != nil {
		return
	}
	// Salva los cambios
	err = file.Sync()
	if err != nil {
		return
	}
}

func Execute(imageName string, filedot string) {
	path, _ := exec.LookPath("dot")
	cmd, _ := exec.Command(path, "-Tjpg", filedot).Output()
	mode := 0777
	_ = ioutil.WriteFile(imageName, cmd, os.FileMode(mode))
}

func GraphListApprovedStudent() {
	if data.ListApprovedStudents.SizeList() == 1 {
		return
	}
	// Generamos el archivo .dot
	filename := "dot/estudiantes_aprobados.dot"

	// Generamos el archivo .jpg
	imageName := "dot/estudiantes_aprobados.jpg"

	// Generamos el contenido del archivo .dot
	var graph string
	var connectionStudents string = "\n" + `{rankdir=TB;`

	// Generamos el contenido del archivo .dot

	graph += `digraph {
		node [color="#FFEDBB", shape=box style=filled]
		label="Estudiantes aprobados"
		nodesep=1
	`
	current := data.ListApprovedStudents.Head
	counterStudents := 0
	for current != nil {
		student := current.Data.(*controller.Student)

		if student.Id == 202100000 {
			current = current.Next
			continue
		}

		name := student.Name
		carnet := TransformToString(student.Id)

		graph += "\n" + `subgraph ` + carnet + ` {
				rankdir=LR
				Estudiante` + TransformToString(counterStudents) + `[label="` + name + "\\n" + carnet + `"]` + "\n"

		// Generamos los nodos de la pila de logs
		currentLog := student.StackLogs.Top
		counterLogs := 0

		for currentLog != nil {
			log := currentLog.Data.(*controller.Log)
			graph += `Log` + carnet + TransformToString(counterLogs) + `[label="` + log.Desc + "\\n " + TransformDate(log.Date) + `"]` + "\n"
			currentLog = currentLog.Next
			counterLogs++
		}

		if counterLogs > 0 {
			graph += `Estudiante` + TransformToString(counterStudents)
			for i := 0; i < counterLogs; i++ {
				graph += `->Log` + carnet + TransformToString(i)
			}
		}

		graph += `}`

		if counterStudents == 0 {
			connectionStudents += `Estudiante` + TransformToString(counterStudents)
		} else {
			connectionStudents += `->Estudiante` + TransformToString(counterStudents)
		}

		current = current.Next
		counterStudents++
	}

	connectionStudents += `[constraint=false] [dir=both]}`
	graph += connectionStudents
	graph += `}`

	GenerateFile(filename)
	GenerateFileContent(graph, filename)
	Execute(imageName, filename)
}

func GraphLogStudent() {

}

func GraphQueuePendingStudent() {
	if data.QueuePendingStudents.SizeQueue() == 0 {
		return
	}

	filename := "dot/estudiantes_pendientes.dot"
	imageName := "dot/estudiantes_pendientes.jpg"

	var graph string

	graph += `
		digraph {
		node [color="#FFEDBB", shape=box style=filled]
		label="Estudiantes pendientes"
		}
	`
	// current := data.ListApprovedStudents.Head
	// for current != nil {
	// 	student := current.Data.(*controller.Student)

	// }

	// Generamos los nodos de cada estudiante

	GenerateFile(filename)
	GenerateFileContent(graph, filename)
	Execute(imageName, filename)
}

func GraphStackAdminLog() {

}

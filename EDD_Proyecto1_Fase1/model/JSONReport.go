package model

import "os"

func GenerateJSONReport(filename string) {
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

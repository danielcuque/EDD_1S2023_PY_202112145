package main

import (
	"github.com/danielcuque/fase1/data"
	"github.com/danielcuque/fase1/view"
)

func main() {
	// Insert admin user
	data.InsertAdmin()

	// Show initial menu
	view.InitialMenu()
}

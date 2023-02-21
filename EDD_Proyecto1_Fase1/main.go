package main

import (
	"github.com/danielcuque/fase1/data"
	"github.com/danielcuque/fase1/view"
)

func main() {
	data.InsertAdmin()
	view.InitialMenu()
}

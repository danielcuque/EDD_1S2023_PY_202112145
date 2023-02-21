package view

import (
	"fmt"

	"github.com/mgutz/ansi"
)

func ModifyText(properties string, text string) {
	foregroundColor := ansi.ColorCode(properties)
	fmt.Println(foregroundColor, text)
	fmt.Println()
}

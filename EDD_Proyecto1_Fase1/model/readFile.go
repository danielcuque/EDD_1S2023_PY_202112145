package model

import (
	"bufio"
	"fmt"
	"os"
)

// ReadFile reads the file and returns the content as a string
func ReadFile(filename string) string {
	file, err := os.Open(filename)
	if err != nil {
		fmt.Println(err)
	}
	defer file.Close()

	var text string
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		text += scanner.Text()
	}

	return text
}

func InsertNewStudent() {
	// Inser
}

// Path: model/parseFile.go

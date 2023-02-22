package controller

import "strconv"

type Student struct {
	Id       int
	Name     string
	Password string
}

func NewStudent(id string, name string, password string) *Student {
	idInt, err := strconv.Atoi(id)
	if err != nil {
		panic(err)
	}

	return &Student{
		Id:       idInt,
		Name:     name,
		Password: password,
	}
}

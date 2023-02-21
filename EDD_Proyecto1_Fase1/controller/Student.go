package controller

type Student struct {
	id       string
	name     string
	password string
}

func NewStudent(id string, name string, password string) *Student {
	return &Student{
		id:       id,
		name:     name,
		password: password,
	}
}

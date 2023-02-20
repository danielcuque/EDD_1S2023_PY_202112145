package controller

type Student struct {
	id int
	name string
	password string
}

func NewStudent(id int, name string, password string) *Student {
	return &Student{
		id: id,
		name: name,
		password: password,
	}
}
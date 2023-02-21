package controller

type Student struct {
	Id       string
	Name     string
	Password string
}

func NewStudent(id string, name string, password string) *Student {
	return &Student{
		Id:       id,
		Name:     name,
		Password: password,
	}
}

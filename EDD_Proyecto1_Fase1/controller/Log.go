package controller

import "time"

type Log struct {
	Desc string
	Date time.Time
}

func NewLog(desc string) *Log {
	return &Log{
		Desc: desc,
		Date: time.Now(),
	}
}

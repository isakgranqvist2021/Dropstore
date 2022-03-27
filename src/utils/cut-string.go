package utils

import "strings"

func CutStr(value string) string {
	cutAt := 100

	if len(value) < cutAt {
		return value
	}

	subStr := strings.TrimSpace(value[:100])

	return subStr + "..."

}
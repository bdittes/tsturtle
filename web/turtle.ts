import { turtle as asd } from "./base.js";

export function main() {
	asd.moveSpeed = 1000
	asd.taste = meineTaste;
	// asd.for(9000, () => {
	// 	asd.segment(100, 0.01, (r) => Math.random() * 0.1)
	// })
}

function meineTaste(c: string) {
	if (c == "s") {
		asd.rückwärts(10)
	} else if (c == "a") {
		asd.drehenLinks(22.5)
	} else if (c == "d") {
		asd.drehenRechts(22.5)
	} else if (c == "w") {
		asd.vorwärts(10)
	} else if (c == " ") {
		asd.farbe(Math.random())
	} else if (c == "e") {
		asd.stiftHoch()
	} else if (c == "q") {
		asd.stiftRunter()
	} else if (c == "Escape") {
		asd.neu()
	} else {
		console.log(c)
	}
}

































































































































































































































































import { turtle as asd } from "../base/base.js";

// export function main() {
// 	asd.moveSpeed = 30
// 	asd.segment(100, 360, (r) => r)
// 	asd.segment(-100, 360, (r) => r)
// }

export function main() {
	asd.moveSpeed = 1000
	asd.farbe(Math.random())
	asd.drehenRechts(30)
	asd.vorwärts(200)
	asd.drehenLinks(30)
	asd.farbe(Math.random())
	asd.segment(100, 180, (r) => r)
	asd.drehenRechts(180)
	asd.farbe(Math.random())
	asd.for(9000, () => {
		asd.segment(100, 0.01, (r) => Math.random() * 0.1)
	})
	asd.for(9000, () => {
		asd.segment(100, 0.01, (r) => Math.random() * 0.1 + 0.5)
	})
	asd.farbe(Math.random())
	asd.drehenLinks(30)
	for (let i = 1; i <= 2; i++) {
		asd.farbe(Math.random())
		asd.vorwärts(100)
	}
	asd.for(2, (i) => {
		asd.farbe(Math.random())
		asd.vorwärts(100)
	})
}


























































































































































































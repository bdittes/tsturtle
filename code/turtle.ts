import { turtle as asd, Point } from "../base/base.js";

let L1 = [
	"XXXXX",
	"X    ",
	"X   X",
	"XT XX",
	"XXXXX"]

export function main() {
	asd.moveSpeed = 100000

	asd.stiftHoch()
	asd.vorwärts(-15)
	asd.drehenRechts(90)
	asd.dicke = 30
	let t
	asd.for(5, (zeile) => {
		asd.for(5, (spalte) => {
			if (L1[zeile][spalte] == "X") {
				asd.stiftRunter()
			}
			if (L1[zeile][spalte] == "T") {
				t = asd.pos()
			}
			asd.vorwärts(30)
			asd.stiftHoch()
		})
		asd.drehenRechts(90)
		asd.vorwärts(30)
		asd.drehenLinks(90)
		asd.rückwärts(150)
	})
	asd.geheZu(t)
	asd.vorwärts(15)

	asd.stiftRunter()
	asd.dicke = 1
	asd.taste = meineTaste;
	asd.tick = meinTick;
	// asd.for(9000, () => {
	// 	asd.segment(100, 0.01, (r) => Math.random() * 0.1)
	// })
}

function meinTick() {
	asd.vorwärts(1)


	let t = asd.pos()
	//console.log(t)
	if (t.x < 0 || t.y < 0 || t.x > 150 || t.y > 150) {
		//asd.neu()
		//main()
		return
	}
	let zeile = Math.floor(t.y / 30)
	let spalte = Math.floor(t.x / 30)
	if (L1[zeile][spalte] == "X") {
		asd.neu()
		main()
		return
	}
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
		main()
		return
	} else {
		console.log(c)
	}
}


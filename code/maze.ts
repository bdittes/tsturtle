import { turtle as asd, Point } from "../base/base.js";

let L1 = [
	"XXXXXXXXXXX",
	"X        XX",
	"X XXXXXX  X",
	"X X    X  X",
	"  X XX X  X",
	" XX XX X  X",
	"X   XX X  X",
	"X XXXX X  X",
	"X    X    X",
	"XT   X    X",
	"XXXXXXXXXXX",
]

export async function main() {
	asd.geschwindigkeit = 10000000000
	//console.log(asd.pos())
	asd.stiftHoch()
	asd.vorwärts(-15)
	asd.drehenRechts(90)
	asd.dicke = 30
	let t
	asd.for(L1.length, (zeile) => {
		asd.for(L1[zeile].length, (spalte) => {
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
		asd.rückwärts(L1[zeile].length * 30)
	})
	asd.geheZu(t)
	asd.vorwärts(15)

	asd.stiftRunter()
	asd.drehenLinks(90)
	asd.dicke = 1
	asd.taste = meineTaste;
	asd.tick = meinTick;
	asd.click = meinClick;
}
let pause = true // false
let gs = 3
let kugelWinkel = 0.0
let gk = 1

function meinTick() {
	kugel()
	asd.farbe(Math.random())
	if (!pause) {
		asd.vorwärts(gs)
	}
	wände()
}

function meinClick(p: Point) {
	asd.geheZu(p)
}

function meineTaste(c: string) {
	if (c == "s") {
		asd.rückwärts(10)
	} else if (c == "a") {
		asd.drehenLinks(22.5)
	} else if (c == "d") {
		asd.drehenRechts(22.5)
	} else if (c == "w") {
		//asd.vorwärts(10)

	} else if (c == " ") {
		pause = !pause
	} else if (c == "e") {
		asd.stiftHoch()
	} else if (c == "q") {
		asd.stiftRunter()
	} else if (c == "Escape") {
		kugelWinkel = 0
		asd.neu()
		main()
		return
	} else {
		console.log(c)
	}
}

function wände() {
	let t = asd.pos()
	//console.log(t)
	let zeile = Math.floor(t.y / 30)
	let spalte = Math.floor(t.x / 30)
	if (t.x < 0 || t.y < 0 || t.y > 30 * L1.length || t.x > 30 * L1[zeile].length) {
		//asd.neu()
		//main()
		return
	}
	if (L1[zeile][spalte] == "X") {
		kugelWinkel = 0
		asd.neu()
		main()
		return
	}
}

function kugel() {
	if (!pause) {
		kugelWinkel += gk;
	}
	// asd.farbe(Math.random())
	const pos = asd.pos()
	const winkel = asd.winkel()
	asd.neu()
	main()
	asd.stiftHoch()
	let x = 175 + Math.sin(kugelWinkel / 360 * 2 * Math.PI) * 80
	let y = 175 - Math.cos(kugelWinkel / 360 * 2 * Math.PI) * 80
	asd.geheZu({ x, y })
	asd.stiftRunter()
	asd.dicke = 10
	asd.segment(20, 360)
	asd.stiftHoch()
	asd.geheZu(pos)
	asd.drehenLinks(asd.winkel())
	asd.drehenRechts(winkel)
	asd.dicke = 1
	asd.stiftRunter()
	let dx = x - pos.x
	let dy = y - pos.y
	let abstand = Math.sqrt(dx * dx + dy * dy)
	if (abstand <= 14) {
		kugelWinkel = 0
		asd.neu()
		main()
	}
}

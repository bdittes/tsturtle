import { turtle as asd } from "../base/base.js";

export function main() {
	asd.geschwindigkeit = 100
	for (let i = 0; i < 8; i++) {
		asd.farbe(Math.random())
		nikolaus()
	}
	asd.stiftHoch()
	asd.rückwärts(100 + 200 / Math.SQRT2)
	asd.drehenRechts(90)
	asd.stiftRunter()
	for (let k = 1; k < 20; k++) {
		kreis(k * 25)
	}
}

function kreis(d: number) {
	asd.farbe(d / 200)
	asd.stiftHoch()
	asd.vorwärts(d / 2)
	asd.drehenRechts(90)
	asd.stiftRunter()
	let n = d * 2
	asd.drehenRechts(360 / n / 2)
	for (let y = 0; y < n; y++) {
		asd.vorwärts(d * Math.PI / n)
		asd.drehenRechts(360 / n)
	}
	asd.drehenRechts(-360 / n / 2)
	asd.stiftHoch()
	asd.drehenRechts(-90)
	asd.rückwärts(d / 2)
	asd.stiftRunter()
}

function nikolaus() {
	asd.vorwärts(100)
	asd.drehenRechts(45)
	asd.vorwärts(100 / Math.SQRT2)
	asd.drehenRechts(90)
	asd.vorwärts(100 / Math.SQRT2)
	asd.drehenRechts(135)
	asd.vorwärts(100)
	asd.drehenRechts(-135)
	asd.vorwärts(100 * Math.SQRT2)
	asd.drehenRechts(135)
	asd.vorwärts(100)
	asd.drehenRechts(135)
	asd.vorwärts(100 * Math.SQRT2)
	asd.drehenRechts(135)
	asd.vorwärts(100)
	asd.drehenRechts(-45)
	asd.stiftHoch()
	asd.vorwärts(100)
	asd.drehenRechts(-90)
	asd.stiftRunter()
}

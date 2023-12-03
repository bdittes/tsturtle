import { turtle as asd, Point } from "../base/base.js";

let start = asd.jetztMillis()
let rest = 3000000
let gestartet = 300

export function main() {
  asd.verstecken(true)
  asd.click = meinClick
  asd.tick = meinTick

  //asd.rect(125, 125, 125, 125)
  asd.linie(0, 0, 0, 125)
  asd.linie(0, 0, 125, 0)
  asd.linie(125, 0, 0, 125)
  asd.linie(0, 125, 125, 0)
  asd.linie(0, 50, 125, 0)
  asd.linie(0, 75, 125, 0)
  asd.text(3, 66, 'stop', 15)
  asd.linie(35, 50, 0, 25)
  asd.text(40, 66, 'start', 15)
  asd.linie(75, 50, 0, 25)
  asd.text(80, 66, 'test', 15)

  asd.text(10, 111, '-10:00', 33)
  asd.text(10, 36, `${rest - (asd.jetztMillis() - start)}`, 26)
}

function meinTick() {
  asd.neu()
  main()
  if (rest - (asd.jetztMillis() - start) < 0) {
    entchen()
  }
}

function meinClick(p: Point) {
  if (asd.punktInRechteck(p, 75, 50, 50, 25)) {
    asd.beep(500, 1, 444)
  }
  if (asd.punktInRechteck(p, 0, 75, 125, 50)) {
    rest = rest - 600000
  }
}

let töne: { [key: string]: number } = { 'c': 264, 'd': 297, 'e': 330, 'f': 352, 'g': 396, 'a': 440, 'h': 494, 'c2': 528 }
function entchen() {
  asd.beep(100, 1, 10)
  let ente = 'cdefggaaaagaaaagffffeeggggc'
  let läng = '111122111141111411112211113'
  for (let i = 0; i < ente.length; ++i) {
    let t = ente[i]
    let l = parseInt(läng[i])
    asd.beep(l * 300 - 10, 1, töne[t])
    asd.sleep(10)
  }
}

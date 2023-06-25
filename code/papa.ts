import { turtle as asd, Point } from "../base/base.js";

export async function main() {
  asd.geschwindigkeit = 100000

  asd.dicke = 1
  asd.taste = meineTaste;
  asd.tick = meinTick;
}

let pause = true // false
let gs = 3.5
const kugel = { a: 0.0 }

function meinTick() {
  if (!pause) {
    asd.vorwärts(gs)
    kugel.a += 1;
  }
  // asd.farbe(Math.random())
  const pos = asd.pos()
  const winkel = asd.winkel()
  asd.neu()
  asd.stiftHoch()
  let x = Math.sin(kugel.a / 360 * 2 * Math.PI) * 80
  let y = -Math.cos(kugel.a / 360 * 2 * Math.PI) * 80
  asd.geheZu({ x, y })
  //asd.drehenRechts(kugel.a)
  //asd.vorwärts(80)
  asd.stiftRunter()
  asd.segment(20, 360)
  asd.stiftHoch()
  //asd.geheZu
  //asd.rückwärts(80)
  //asd.drehenLinks(kugel.a)
  asd.geheZu(pos)
  asd.drehenRechts(winkel)
  asd.stiftRunter()
  let dx = x - pos.x
  let dy = y - pos.y
  let abstand = Math.sqrt(dx * dx + dy * dy)
  if (abstand <= 15) {
    asd.neu()
  }
}

function meineTaste(c: string) {
  if (c == "s") {
    //asd.rückwärts(10)
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
    asd.neu()
    main()
    return
  } else {
    console.log(c)
  }
}

function wände() {

}

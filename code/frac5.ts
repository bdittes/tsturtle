import { turtle as asd } from "../base/base.js";

// let n = 11 /2 oder *3+1

export function main() {
  asd.geschwindigkeit = 1000000
  asd.stiftHoch()
  asd.verstecken(true)
  let e1 = asd.pos()
  asd.vorwärts(100)
  asd.drehenLinks(72)
  let e2 = asd.pos()
  asd.vorwärts(100)
  asd.drehenLinks(72)
  let e3 = asd.pos()
  asd.vorwärts(100)
  asd.drehenLinks(72)
  let e4 = asd.pos()
  asd.vorwärts(100)
  asd.drehenLinks(72)
  let e5 = asd.pos()
  asd.vorwärts(100)
  asd.drehenLinks(72)
  asd.stiftHoch()
  asd.dicke = 0.01
  for (let i = 0; i < 5000000; i++) {
    let r = Math.random()
    let e = e1
    if (r < 0.2) {
      e = e1
    } else if (r < 0.4) {
      e = e2
    } else if (r < 0.6) {
      e = e3
    } else if (r < 0.8) {
      e = e4
    } else {
      e = e5
    }
    let p = asd.pos()
    let p2 = p
    p2.x = p.x + 0.612 * (e.x - p.x)
    p2.y = p.y + 0.612 * (e.y - p.y)
    asd.geheZu(p2)
    if ((p2.x > -3 && p2.y > -3) || i % 100 == 0) {
      if (i % 100 == 0) {
        asd.dicke = 0.1
      } else {
        asd.dicke = 0.01
      }
      asd.linie(p2.x, p2.y, asd.dicke / 2, asd.dicke / 2)
    }
  }
}

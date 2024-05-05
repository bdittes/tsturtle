import { turtle as asd } from "../base/base.js";

function schnee(l: number, d: number) {
  if (l < 10) {
    return;
  }
  for (let i = 0; i < 6; i++) {
    asd.farbe(Math.random())
    asd.vorwärts(l)
    schnee(l / d, d)
    asd.rückwärts(l)
    asd.drehenRechts(30)
    asd.farbe(Math.random())
    asd.vorwärts(l / 3)
    schnee(l / d / 3, d)
    asd.rückwärts(l / 3)
    asd.drehenRechts(30)
  }
}

export function main() {
  asd.geschwindigkeit = 100000
  let p = asd.pos()

  schnee(1000, 3)

  for (let i = 0; i < 6; i++) {
    asd.drehenRechts(i * 60)
    for (let j = 0; j < 3000; j++) {
      asd.farbe(Math.random())
      asd.vorwärts(1)
      asd.drehenRechts(5 - 5 * j / 300)
    }
    asd.stiftHoch()
    asd.geheZu(p)
    asd.drehenLinks(asd.winkel())
    asd.stiftRunter()
  }

  asd.verstecken(true)
}

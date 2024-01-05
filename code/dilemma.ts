import { turtle as asd } from "../base/base.js";

function punkteRechnen(zug: [boolean, boolean]): [number, number] {
  if (zug[0] && zug[1]) {
    return [3, 3]
  }
  if (zug[0] && !zug[1]) {
    return [0, 5]
  }
  if (!zug[0] && zug[1]) {
    return [5, 0]
  }
  return [1, 1]
}

export function main() {
  let alle: { [key: string]: (gv?: boolean) => boolean } = {}
  //alle["vertrauen"] = vertrauen
  alle["verrat"] = verrat
  //alle["verrat2"] = verrat
  //alle["verrat3"] = verrat
  //alle["verrat4"] = verrat
  alle["zufall1"] = zufall1
  //alle["zufall12"] = zufall1
  //alle["zufall13"] = zufall1
  alle["zufall2"] = zufall2
  //alle["zufall22"] = zufall2
  //alle["zufall23"] = zufall2
  alle["vorher"] = vorher
  alle["vorher2"] = vorher2
  //alle["vorher3"] = vorher
  //alle["vorher4"] = vorher
  alle["vorherBöse"] = vorherBöse
  alle["gegenteil"] = gegenteil

  const namen = Object.keys(alle)
  let spiele: { [key: string]: [boolean, boolean][] } = {}
  let punkte: { [key: string]: number } = {}

  for (let i = 0; i < namen.length; ++i) {
    punkte[namen[i]] = 0
  }


  let y = 0

  for (let i = 0; i < namen.length; ++i) {
    for (let j = 0; j < namen.length; ++j) {
      let zugM1: [boolean?, boolean?] = [undefined, undefined]
      reset()
      let sp1 = namen[i]
      let sp2 = namen[j]
      let spiel: [boolean, boolean][] = []
      //if (i == 0) {
      asd.farbe('#ffffff')
      asd.text(0, y, `${sp1} ${sp2}`, 18)
      //}
      for (let a = 0; a < 10000; ++a) {
        if ((a % 200) == 0) {
          //asd.text(200 + a * 30, y, `A`, 18)
          reset()
          zugM1 = [undefined, undefined]
        }
        let zug: [boolean, boolean] = [alle[sp1](zugM1[1]), alle[sp2](zugM1[0])]
        zugM1 = zug
        let zugP = punkteRechnen(zug)
        punkte[sp1] += zugP[0]
        punkte[sp2] += zugP[1]
        if (a < 100) {
          asd.farbe(zug[0] ? "#00ff00" : "#ff0000")
          asd.text(200 + a * 30, y, `${zugP[0]}`, 18)
          asd.farbe(zug[1] ? "#00ff00" : "#ff0000")
          asd.text(200 + a * 30 + 10, y, `${zugP[1]}`, 18)
        }
        spiel.push(zug)
      }
      //if (i == 0) {
      y += 20
      //}
    }
  }

  asd.farbe('#ffffff')
  asd.verstecken(true)
  y = -namen.length * 20
  for (let i = 0; i < namen.length; ++i) {
    asd.text(0, y, `${namen[i]}: ${punkte[namen[i]]}`, 18)
    y += 20
  }
}

let vorher2böse = 0
function reset() {
  vorher2böse = 0
}

function vertrauen() {
  return true
}

function verrat() {
  return false
}

function zufall1() {
  return Math.random() > 0.3
}

function zufall2() {
  return Math.random() < 0.7
}

function vorher(gv?: boolean) {
  if (gv === false) {
    return false
  }
  return true
}

function vorher2(gv?: boolean) {
  if (gv === false) {
    vorher2böse += 1
  }
  if (gv === true) {
    vorher2böse = 0
  }
  if (vorher2böse < 0) {
    vorher2böse = 0
  }
  if (vorher2böse >= 2) {
    //vorher2böse -= 1
    return false
  }
  return true
}

function vorherBöse(gv?: boolean) {
  if (gv === undefined) {
    return false
  }
  if (gv === false) {
    return false
  }
  return true
}

function gegenteil(gv?: boolean) {
  if (gv === false) {
    return true
  }
  return false
}

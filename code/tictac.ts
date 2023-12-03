import { turtle as asd, Point } from "../base/base.js";

export async function main() {
  asd.verstecken(true)
  spieler = 1
  links = [0, 0, 0]
  mitte = [0, 0, 0]
  rechts = [0, 0, 0]

  asd.click = meinClick;

  for (let i = 0; i <= 60; i += 20) {
    asd.farbe(Math.random())
    asd.linie(0, i, 60, 0)
    asd.linie(i, 0, 0, 60)
  }
  asd.farbe('white')
  asd.text(0, -10, "Tic Tac Toe", 10)
  asd.farbe('blue')
}

let spieler = 1
let links = [0, 0, 0]
let mitte = [0, 0, 0]
let rechts = [0, 0, 0]

function spielerWechsel() {
  if (spieler == 1) {
    asd.farbe('red');
    spieler = 2;
  } else {
    asd.farbe('blue');
    spieler = 1;
  }
}

function meinClick(p: Point) {
  for (let i = 0; i <= 40; i = i + 20) {
    let a = i / 20
    if (p.x > 0 && p.x < 0 + 20 &&
      p.y > i && p.y < i + 20) {
      if (links[a] == 0) {
        asd.rechteck(0, i, 20, 20)
        links[a] = spieler
        spielerWechsel();
      }
    }
    if (p.x > 20 && p.x < 20 + 20 &&
      p.y > i && p.y < i + 20) {
      if (mitte[a] == 0) {
        asd.rechteck(20, i, 20, 20)
        mitte[a] = spieler
        spielerWechsel()
      }
    }
    if (p.x > 40 && p.x < 40 + 20 &&
      p.y > i && p.y < i + 20) {
      if (rechts[a] == 0) {
        asd.rechteck(40, i, 20, 20)
        rechts[a] = spieler
        spielerWechsel()
      }
    }
  }
  ende()
}

function ende() {
  for (let i = 0; i <= 2; i += 1) {
    if (links[i] != 0 && links[i] == mitte[i] && mitte[i] == rechts[i]) {
      asd.farbe('green')
      asd.text(0, 70, "gewonnen", 10)
      asd.sleep(10000)
      asd.neu()
      main()
      return
    }
  }

  if (links[0] != 0 && links[0] == links[1] && links[1] == links[2]) {
    asd.farbe('green')
    asd.text(0, 70, "gewonnen", 10)
    asd.sleep(10000)
    asd.neu()
    main()
    return
  }
  if (mitte[0] != 0 && mitte[0] == mitte[1] && mitte[1] == mitte[2]) {
    asd.farbe('green')
    asd.text(0, 70, "gewonnen", 10)
    asd.sleep(10000)
    asd.neu()
    main()
    return
  }
  if (rechts[0] != 0 && rechts[0] == rechts[1] && rechts[1] == rechts[2]) {
    asd.farbe('green')
    asd.text(0, 70, "gewonnen", 10)
    asd.sleep(10000)
    asd.neu()
    main()
    return
  }
  if (links[0] != 0 && links[0] == mitte[1] && mitte[1] == rechts[2]) {
    asd.farbe('green')
    asd.text(0, 70, "gewonnen", 10)
    asd.sleep(10000)

    asd.neu()
    main()
    return
  }
  if (links[2] != 0 && links[2] == mitte[1] && mitte[1] == rechts[0]) {
    asd.farbe('green')
    asd.text(0, 70, "gewonnen", 10)
    asd.sleep(10000)
    asd.neu()
    main()
    return
  }
  if (links[0] > 0 && links[1] > 0 && links[2] > 0 &&
    rechts[0] > 0 && rechts[1] > 0 && rechts[2] > 0 &&
    mitte[0] > 0 && mitte[1] > 0 && mitte[2] > 0) {
    asd.farbe('yellow')
    asd.text(0, 70, "unentschieden", 10)
    asd.sleep(10000)
    asd.neu()
    main()
  }
}

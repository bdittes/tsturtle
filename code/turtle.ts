import { turtle as asd, Point } from "../base/base.js";

export async function main() {
  asd.verstecken(true)
  asd.click = meinClick;

  //asd.farbe(0.5)
  //asd.dicke = 20
  //asd.text(0, 0, "Hallo", 20)
  for (let i = 0; i <= 60; i += 20) {
    asd.farbe(Math.random())
    asd.linie(0, i, 60, 0)
    asd.linie(i, 0, 0, 60)
  }
  asd.farbe('blue')
}

let spieler = 1
let links = [0, 0, 0]
let mitte = [0, 0, 0]
let rechts = [0, 0, 0]

function meinClick(p: Point) {
  for (let i = 0; i <= 40; i = i + 20) {
    let a = i / 20
    if (p.x > 0 && p.x < 0 + 20 &&
      p.y > i && p.y < i + 20) {
      if (links[a] == 0) {
        asd.rect(0, i, 20, 20)
        links[a] = 1
        spielerWechsel();
      }
    }
    if (p.x > 20 && p.x < 20 + 20 &&
      p.y > i && p.y < i + 20) {
      if (mitte[a] == 0) {
        asd.rect(20, i, 20, 20)
        mitte[a] = 1
        spielerWechsel()
      }
    }
    if (p.x > 40 && p.x < 40 + 20 &&
      p.y > i && p.y < i + 20) {
      if (rechts[a] == 0) {
        asd.rect(40, i, 20, 20)
        rechts[a] = 1
        spielerWechsel()
      }
    }
  }
  ende()
}

function ende() {
  if (links[0] == 1 && links[1] == 1 && links[2] == 1 &&
    rechts[0] == 1 && rechts[1] == 1 && rechts[2] == 1 &&
    mitte[0] == 1 && mitte[1] == 1 && mitte[2] == 1) {
    asd.neu()
    main()
    spieler = 1
    links = [0, 0, 0]
    mitte = [0, 0, 0]
    rechts = [0, 0, 0]
  }
}

function spielerWechsel() {
  if (spieler == 1) {
    asd.farbe('red');
    spieler = 2;
  } else {
    asd.farbe('blue');
    spieler = 1;
  }
}

import { turtle as asd, Point } from "../base/base.js";

export async function main() {
  asd.verstecken(true)
  asd.click = meinClick
}

let töne: { [key: string]: number } = { 'c': 264, 'd': 297, 'e': 330, 'f': 352, 'g': 396, 'a': 440, 'h': 494, 'c2': 528 }

async function meinClick(p: Point) {
  asd.beep(100, 1, 10)
  let ente = 'cdefggaaaagaaaagffffeeggggc'
  let läng = '111122111141111411112211114'
  for (let i = 0; i < ente.length; ++i) {
    let t = ente[i]
    let l = parseInt(läng[i])
    asd.beep(l * 300 - 10, 1, töne[t])
    asd.sleep(10)
  }
}



































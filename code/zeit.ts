import { turtle as asd, Point } from "../base/base.js";

export async function main() {
  asd.verstecken(true)
  asd.click = meinClick
}

async function meinClick(p: Point) {
  for (let i = 0; i < 10; ++i) {
    asd.beep(200, 0.3, 1600)
    asd.sleep(200)
  }
}

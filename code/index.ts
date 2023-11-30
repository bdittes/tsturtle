import { turtle as asd, Point } from "../base/base.js";

let files: string[] = []

export async function main() {
  asd.verstecken(true)
  asd.click = meinClick
  asd.farbe('white')
  files = [];
  (await (await fetch('js/index.txt')).text()).split('\n').forEach((e: string) => {
    e = e.replace('code/', '').replace('.ts', '')
    if (e != '' && e != 'index') {
      files.push(e)
    }
  });
  for (let i = 0; i < files.length; ++i) {
    asd.text(0, i * 20, files[i], 18)
  }
}

function meinClick(p: Point) {
  let i = p.y / 20 + 1
  if (i >= 0 && i < files.length) {
    i = Math.trunc(i)
    const url = new URL(window.location.href)
    url.searchParams.set('file', files[i])
    window.location.href = url.toString()
  }
}

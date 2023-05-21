export type Color = string;
export type Point = { x: number, y: number };
export type State = { pos: Point, winkel: number, farbe: Color, malen: boolean };
export type Line = { a: Point, b: Point, c: Color, d: number };
export type Rect = { a: Point, b: Point, c: Color };
export type Text = { p: Point, text: string, c: Color, size: number, font: string };
type DrawFn = (ctx: CanvasRenderingContext2D) => void;
type MoveFn = () => Promise<void>;

function drawLine(ctx: CanvasRenderingContext2D, l: Line) {
  ctx.beginPath();
  ctx.strokeStyle = l.c;
  ctx.lineWidth = l.d;
  ctx.moveTo(l.a.x, l.a.y);
  ctx.lineTo(l.b.x, l.b.y);
  ctx.stroke();
}

function drawRect(ctx: CanvasRenderingContext2D, r: Rect) {
  ctx.fillStyle = r.c;
  ctx.fillRect(r.a.x, r.a.y, r.b.x - r.a.x, r.b.y - r.a.y);
}

function drawText(ctx: CanvasRenderingContext2D, t: Text) {
  ctx.fillStyle = t.c;
  ctx.font = `${t.size}px ${t.font}`;
  ctx.fillText(t.text, t.p.x, t.p.y);
}

const neuState: State = { pos: { x: 0, y: 0 }, winkel: 0, farbe: "#fff", malen: true };

class Turtle {
  #state = { ...neuState };
  #moveRemainder = 0;
  dicke = 1.5;
  moveSpeed = 100;
  taste?: (c: string) => void;
  tick?: () => void;

  vorwärts(d: number) {
    const waitTime = 100 * Math.abs(d) / this.moveSpeed;
    if (waitTime > 20) {
      const n = Math.max(1, Math.round(waitTime / 20));
      for (let i = 0; i < n; i++) {
        this.vorwärts(d / n);
      }
      return;
    }
    const np = newPos(this.#state.pos, this.#state.winkel, d);
    if (this.#state.malen) {
      const l: Line = { a: this.#state.pos, b: np, c: this.#state.farbe, d: this.dicke };
      world.move(async () => {
        world.draw((ctx) => drawLine(ctx, l));
      })
    }
    this.#state.pos = np;
    this.#moveState()
    world.move(async () => {
      if (waitTime + this.#moveRemainder > 10) {
        await sleep(waitTime);
        this.#moveRemainder = 0;
      } else {
        this.#moveRemainder += waitTime;
      }
    });
  }
  rückwärts(d: number) {
    this.vorwärts(-d);
  }

  pos(): Point { return this.#state.pos; }
  geheZu(p?: Point) {
    if (p === undefined) {
      return;
    }
    if (this.#state.malen) {
      const l: Line = { a: this.#state.pos, b: p, c: this.#state.farbe, d: this.dicke };
      world.move(async () => {
        world.draw((ctx) => drawLine(ctx, l));
      })
    }
    this.#state.pos = p;
    this.#moveState()
  }

  drehenRechts(a: number) {
    this.#state.winkel += a;
    this.#moveState();
  }
  drehenLinks(a: number) {
    this.drehenRechts(-a);
  }
  farbe(c: number | string) {
    if (typeof c === "number") {
      c = c < 0 ? -c : c;
      c = c - Math.floor(c);
      const rgb = HSVtoRGB(c, 1, 1);
      this.#state.farbe = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
      //console.log(c, this.#farbe);
    } else {
      this.#state.farbe = c;
    }
    this.#moveState();
  }
  stiftHoch() {
    this.#state.malen = false;
    this.#moveState();
  }
  stiftRunter() {
    this.#state.malen = true;
    this.#moveState();
  }
  for(n: number, f: (n: number) => void) {
    for (let i = 0; i < n; i++) {
      f(i);
    }
  }
  segment(durchmesser: number, winkel: number, farb?: (r: number) => string | number) {
    let n = Math.floor(Math.max(4, Math.abs(durchmesser * winkel / 360 * 0.7)));
    this.for(n, (i) => {
      if (farb) this.farbe(farb(i / n))
      this.vorwärts(Math.PI * durchmesser * winkel / 360 / n / 2)
      this.drehenLinks(winkel / n)
      if (farb) this.farbe(farb(i / n))
      this.vorwärts(Math.PI * durchmesser * winkel / 360 / n / 2)
    })
  }

  neu() {
    this.#state = { ...neuState };
    world.clear();
  }

  #moveState() {
    const rec = { ...this.#state };
    world.move(async () => {
      world.turtleState = { ...rec };
    });
  }
}

export const turtle = new Turtle();

class World {
  #drawFns: DrawFn[] = [];
  turtleState: State = { ...neuState };
  #moveFns: MoveFn[] = [];
  #moveI = 0;

  draw(f: DrawFn) {
    this.#drawFns.push(f);
  }
  move(f: MoveFn) {
    this.#moveFns.push(f);
  }
  clear() {
    this.move(async () => {
      this.turtleState = { ...neuState };
      this.#drawFns.length = 0;
    });
  }

  drawOnCanvas(ctx: CanvasRenderingContext2D) {
    this.#drawFns.forEach((f) => {
      f(ctx)
    });
    const t = this.turtleState;
    drawLine(
      ctx, {
      a: newPos(t.pos, t.winkel - 90, 5),
      b: newPos(t.pos, t.winkel - (t.malen ? 0 : 15), t.malen ? 10 : 7),
      c: t.farbe, d: 1
    });
    drawLine(
      ctx, {
      a: newPos(t.pos, t.winkel + 90, 5),
      b: newPos(t.pos, t.winkel + (t.malen ? 0 : 15), t.malen ? 10 : 7),
      c: t.farbe, d: 1
    });
  }
  async startLoop() {
    while (true) {
      const startMs = Date.now();
      for (; this.#moveI < this.#moveFns.length; this.#moveI++) {
        await this.#moveFns[this.#moveI]();
      }
      const diffMs = Date.now() - startMs;
      const tickMs = 50;
      if (diffMs < tickMs) {
        await sleep(tickMs - diffMs);
      }
      if (turtle.tick) {
        turtle.tick();
      }
    }
  }
}

export const world = new World();


function newPos(pos: Point, angle: number, d: number) {
  return {
    x: pos.x + d * Math.cos(((angle - 90) * Math.PI) / 180.0),
    y: pos.y + d * Math.sin(((angle - 90) * Math.PI) / 180.0),
  };
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Input 0..1, output 0..255.
function HSVtoRGB(h: number, s: number, v: number) {
  var r: number, g: number, b: number, i: number, f: number, p: number, q: number, t: number;
  r = g = b = 0;
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0:
      (r = v), (g = t), (b = p);
      break;
    case 1:
      (r = q), (g = v), (b = p);
      break;
    case 2:
      (r = p), (g = v), (b = t);
      break;
    case 3:
      (r = p), (g = q), (b = v);
      break;
    case 4:
      (r = t), (g = p), (b = v);
      break;
    case 5:
      (r = v), (g = p), (b = q);
      break;
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

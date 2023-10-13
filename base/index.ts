import { turtle, world, Point } from "./base.js";
// import * as t from "../code/turtle.js";

window.addEventListener("load", async (e) => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d")!;

  const url = new URL(window.location.href);
  // while (url.hash.startsWith('#%23')) {
  //   url.hash = url.hash.replace('#%23', '');
  // }
  // console.log('start hash', url.hash);
  const hashP = new URLSearchParams(url.hash.slice(1));
  // ['x', 'y', 'z'].forEach((a) => {
  //   if (hashP.has('#' + a)) {
  //     hashP.set(a, hashP.get('#' + a)!);
  //     hashP.delete('#' + a);
  //   }
  // });

  let cameraOffset = { x: Number(hashP.get('x') || window.innerWidth / 2), y: Number(hashP.get('y') || window.innerHeight / 2) };
  let cameraZoom = Number(hashP.get('z') || 1);
  updateUrl();

  const filename = url.searchParams.get('file') || 'turtle';
  console.log(filename)

  function transform(dp: Point, offset?: Point): Point {
    const o = offset || cameraOffset;
    const tx = {
      x: (dp.x - window.innerWidth / 2) / cameraZoom + window.innerWidth / 2 - o.x,
      y: (dp.y - window.innerHeight / 2) / cameraZoom + window.innerHeight / 2 - o.y,
    };
    return tx;
  }

  try {
    const t = await import(`../code/${filename}.js`);
    world.turtleMain = t.main;
    world.startLoop().then(() => { }).catch((ex2) => console.log(ex2));
  } catch (ex) {
    console.log(ex);
  }

  function updateUrl() {
    hashP.forEach((v, k, p) => { hashP.delete(k); });
    ['x', 'y', 'z'].forEach((a) => {
      if (!hashP.has(a)) {
        hashP.append(a, '0');
      }
    });
    hashP.set('x', `${cameraOffset.x}`);
    hashP.set('y', `${cameraOffset.y}`);
    hashP.set('z', `${cameraZoom}`);
    url.hash = hashP.toString();
    // console.log('hash', url.hash);
    history.replaceState('', '', url.toString());
  }


  let MAX_ZOOM = 10000000;
  let MIN_ZOOM = 0.1;
  let SCROLL_SENSITIVITY = -0.0015;

  function draw() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    // Translate to the canvas centre before zooming - so you'll always zoom on what you're looking directly at
    ctx.translate(window.innerWidth / 2, window.innerHeight / 2);
    ctx.scale(cameraZoom, cameraZoom);
    ctx.translate(
      -window.innerWidth / 2 + cameraOffset.x,
      -window.innerHeight / 2 + cameraOffset.y
    );
    world.drawOnCanvas(ctx);
    requestAnimationFrame(draw);
  }

  // Gets the relevant location from a mouse or single touch event
  function getEventLocation(e: any) {
    if (e.touches && e.touches.length == 1) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    } else if (e.clientX && e.clientY) {
      return { x: e.clientX, y: e.clientY };
    }
  }

  let isDragging = false;
  let dragStartWorld = { x: 0, y: 0 };
  let dragStartReal = { x: 0, y: 0 };

  function onPointerDown(e: MouseEvent) {
    const ep = getEventLocation(e);
    if (ep) {
      isDragging = true;
      dragStartReal = ep;
      dragStartWorld = transform(ep);
      // console.log("down", dragStartWorld)
    }
  }

  function onPointerUp(e: MouseEvent) {
    updateUrl();
    const ep = getEventLocation(e);
    if (ep && turtle.click) {
      const end = transform(ep);
      // console.log("up", end)

      if (isDragging &&
        Math.abs(dragStartReal.x - ep.x) < 3 &&
        Math.abs(dragStartReal.y - ep.y) < 3) {
        turtle.click(end)
      }
    }
    isDragging = false;
    initialPinchDistance = null;
    lastZoom = cameraZoom;
  }

  function onPointerMove(e: MouseEvent) {
    const ep = getEventLocation(e);
    if (isDragging && ep) {
      cameraOffset = transform(ep, dragStartWorld);
    }
  }

  function handleTouch(e: TouchEvent, singleTouchHandler: (e: any) => void) {
    if (e.touches.length == 1) {
      singleTouchHandler(e);
    } else if (e.type == "touchmove" && e.touches.length == 2) {
      isDragging = false;
      handlePinch(e);
    }
  }

  let initialPinchDistance: number | null = null;
  let lastZoom = cameraZoom;

  function handlePinch(e: TouchEvent) {
    e.preventDefault();

    let touch1 = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    let touch2 = { x: e.touches[1].clientX, y: e.touches[1].clientY };

    // This is distance squared, but no need for an expensive sqrt as it's only used in ratio
    let currentDistance =
      (touch1.x - touch2.x) ** 2 + (touch1.y - touch2.y) ** 2;

    if (initialPinchDistance == null) {
      initialPinchDistance = currentDistance;
    } else {
      adjustZoom(null, currentDistance / initialPinchDistance);
    }
  }

  function adjustZoom(zoomAmount: number | null, zoomFactor: number | null) {
    if (!isDragging) {
      if (zoomAmount) {
        cameraZoom += zoomAmount;
      } else if (zoomFactor) {
        //console.log(zoomFactor);
        cameraZoom = zoomFactor * lastZoom;
      }

      cameraZoom = Math.min(cameraZoom, MAX_ZOOM);
      cameraZoom = Math.max(cameraZoom, MIN_ZOOM);
      //console.log(zoomAmount);
    }
  }

  canvas.addEventListener("mousedown", onPointerDown);
  canvas.addEventListener("touchstart", (e) => handleTouch(e, onPointerDown));
  canvas.addEventListener("mouseup", onPointerUp);
  canvas.addEventListener("mouseleave", onPointerUp);
  canvas.addEventListener("touchend", (e) => {
    handleTouch(e, onPointerUp);
    updateUrl();
  });
  canvas.addEventListener("mousemove", onPointerMove);
  canvas.addEventListener("touchmove", (e) => handleTouch(e, onPointerMove));
  canvas.addEventListener("wheel", (e) => {
    adjustZoom(null, Math.pow(3, e.deltaY * SCROLL_SENSITIVITY));
    lastZoom = cameraZoom;
    updateUrl();
  });
  window.addEventListener("keyup", (e) => {
    let c = (e.ctrlKey ? "c-" : "") + e.key.toString();
    //console.log(c);
    world.keyPress(c);
  })

  // Ready, set, go
  requestAnimationFrame(draw);
});

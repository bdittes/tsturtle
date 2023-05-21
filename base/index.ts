import { world, turtle } from "./base.js";
// import * as t from "../code/turtle.js";

window.addEventListener("load", async (e) => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d")!;

  const url = new URL(window.location.href);
  const hashP = new URLSearchParams(url.hash);

  const cameraOffset = { x: Number(hashP.get('x') || window.innerWidth / 2), y: Number(hashP.get('y') || window.innerHeight / 2) };
  let cameraZoom = Number(hashP.get('z') || 1);
  const filename = url.searchParams.get('file') || 'turtle';
  console.log(filename)

  try {
    const t = await import(`../code/${filename}.js`);
    t.main();
    world.startLoop().then(() => { }).catch((ex2) => console.log(ex2));
  } catch (ex) {
    console.log(ex);
  }

  function updateUrl() {
    ['x', 'y', 'z'].forEach((a) => {
      if (!hashP.has(a)) {
        hashP.append(a, '0');
      }
    });
    hashP.set('x', `${cameraOffset.x}`);
    hashP.set('y', `${cameraOffset.y}`);
    hashP.set('z', `${cameraZoom}`);
    url.hash = hashP.toString();
    //console.log(url.toString());
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
  let dragStart = { x: 0, y: 0 };

  function onPointerDown(e: MouseEvent) {
    const ep = getEventLocation(e);
    if (ep) {
      isDragging = true;
      dragStart.x = ep.x / cameraZoom - cameraOffset.x;
      dragStart.y = ep.y / cameraZoom - cameraOffset.y;
    }
  }

  function onPointerUp(e: MouseEvent) {
    updateUrl();
    isDragging = false;
    initialPinchDistance = null;
    lastZoom = cameraZoom;
  }

  function onPointerMove(e: MouseEvent) {
    const ep = getEventLocation(e);
    if (isDragging && ep) {
      cameraOffset.x = ep.x / cameraZoom - dragStart.x;
      cameraOffset.y = ep.y / cameraZoom - dragStart.y;
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
    if (turtle.taste) {
      let c = (e.ctrlKey ? "c-" : "") + e.key.toString();
      //console.log(c);
      turtle.taste(c);
    }
  })

  // Ready, set, go
  draw();
});

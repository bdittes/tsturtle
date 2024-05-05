
window.addEventListener("load", async (e) => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  console.log('hi');
  if (!navigator.gpu) {
    throw new Error("WebGPU not supported on this browser.");
  }
});

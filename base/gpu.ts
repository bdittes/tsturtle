
window.addEventListener("load", async (e) => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  console.log('hi');
  if (!navigator.gpu) {
    throw new Error("WebGPU not supported on this browser.");
  }
  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) {
    throw new Error("No appropriate GPUAdapter found.");
  }
  const device = await adapter.requestDevice();
  const context = canvas.getContext("webgpu")!;
  const canvasFormat = navigator.gpu.getPreferredCanvasFormat();
  context.configure({
    device: device,
    format: canvasFormat,
  });

  // const vertices = new Float32Array([
  //   //   X,    Y,
  //   -0.8, -0.8, // Triangle 1 (Blue)
  //   0.8, -0.8,
  //   0.8, 0.8,

  //   -0.8, -0.8, // Triangle 2 (Red)
  //   0.8, 0.8,
  //   -0.8, 0.8,
  // ]);
  // const vertexBuffer = device.createBuffer({
  //   label: "Cell vertices",
  //   size: vertices.byteLength,
  //   usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  // });
  // device.queue.writeBuffer(vertexBuffer, /*bufferOffset=*/0, vertices);
  // const vertexBufferLayout = {
  //   arrayStride: 8,
  //   attributes: [{
  //     format: 'float32x2',
  //     offset: 0,
  //     shaderLocation: 0, // Position, see vertex shader
  //   }],
  // };
  // console.log(document.URL);
  const cellShaderModule = device.createShaderModule({
    label: "Cell shader",
    code: await (await fetch('/tsturtle/shaders/test1.wgsl')).text()
  });
  // https://webgpu.github.io/webgpu-samples/?sample=helloTriangle
  const cellPipeline = device.createRenderPipeline({
    label: "Cell pipeline",
    layout: "auto",
    vertex: {
      module: cellShaderModule,
      entryPoint: "vertex1",
      //buffers: [vertexBufferLayout]
    },
    fragment: {
      module: cellShaderModule,
      entryPoint: "fragmentMain",
      targets: [{
        format: canvasFormat
      }]
    },
    primitive: {
      topology: "triangle-list"
    }
  });

  const encoder = device.createCommandEncoder();
  const pass = encoder.beginRenderPass({
    colorAttachments: [{
      view: context.getCurrentTexture().createView(),
      loadOp: "clear",
      clearValue: { r: 0, g: 0, b: 0.4, a: 1 }, // New line
      storeOp: "store",
    }]
  });
  pass.setPipeline(cellPipeline);
  pass.draw(3);
  pass.end();
  device.queue.submit([encoder.finish()]);
});

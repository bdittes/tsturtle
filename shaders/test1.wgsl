// @vertex
// fn vertexMain(
//     @location(0) pos: vec2f
// ) -> @builtin(position) vec4f {
//     return vec4f(pos.xy, 0, 1);
// }

@vertex
fn vertex1(
    @builtin(vertex_index) VertexIndex: u32
) -> @builtin(position) vec4f {
    var pos = array<vec2f, 3>(
        vec2(0.0, 0.5),
        vec2(-0.5, -0.5),
        vec2(0.5, -0.5)
    );

    return vec4f(pos[VertexIndex], 0.0, 1.0);
}

@fragment
fn fragmentMain() -> @location(0) vec4f {
    return vec4f(1, 0, 0, 1); // (Red, Green, Blue, Alpha)
}

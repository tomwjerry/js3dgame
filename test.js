import ShaderProgram from './scripts/shaderprogram.js';

/*var vertexShaderText = 
[
'precision mediump float;',
'attribute vec3 vertPosition;',
'attribute vec3 vertColor;',
'varying vec3 fragColor;',
'uniform mat4 mWorld;',
'uniform mat4 mView;',
'uniform mat4 mProj;',
'void main()',
'{',
'fragColor = vertColor;',
'gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);',
'}'
].join('\n');

var fragmentShaderText = [
'precision mediump float;',
'varying vec3 fragColor;',
'void main()',
'{',
'gl_FragColor = vec4(fragColor, 1.0);',
'}'
].join('\n');

var canvas2 = document.getElementById('glCanvas2');
canvas2.width = 400;
canvas2.height = 400;

var gl2 = canvas2.getContext('webgl');

gl2.viewportWidth = canvas2.width;
gl2.viewportHeight = canvas2.height;
gl2.clearColor(0,0,0,1);
gl2.clear(gl2.COLOR_BUFFER_BIT | gl2.DEPTH_COLOR_BIT);
gl2.enable(gl2.DEPTH_TEST);
gl2.enable(gl2.CULL_FACE);
gl2.frontFace(gl2.CCW);
gl2.cullFace(gl2.BACK);

//Shaders
/*var vertexShader = gl2.createShader(gl2.VERTEX_SHADER);
var fragmentShader = gl2.createShader(gl2.FRAGMENT_SHADER);

gl2.shaderSource(vertexShader, vertexShaderText);
gl2.shaderSource(fragmentShader, fragmentShaderText);

gl2.compileShader(vertexShader);
if (!gl2.getShaderParameter(vertexShader, gl2.COMPILE_STATUS)) {
    console.error('ERROR compiling vertex shader!', gl2.getShaderInfoLog(vertexShader));
}
gl2.compileShader(fragmentShader);
if (!gl2.getShaderParameter(fragmentShader, gl2.COMPILE_STATUS)) {
    console.error('ERROR compiling fragment shader!', gl2.getShaderInfoLog(fragmentShader));
}

var program = gl2.createProgram();
gl2.attachShader(program, vertexShader);
gl2.attachShader(program, fragmentShader);
gl2.linkProgram(program);
if (!gl2.getProgramParameter(program, gl2.LINK_STATUS)) {
    console.error('ERROR linking program!', gl2.getProgramInfoLog(program));
}
gl2.validateProgram(program);
if (!gl2.getProgramParameter(program, gl2.VALIDATE_STATUS)) {
    console.error('ERROR validating program!', gl2.getProgramInfoLog(program));
}*/
/*
var program = ShaderProgram.compileAndCreateProgram(gl2, 'simple');

//Buffers

var boxVertices = [
//top
-1.0, 1.0, -1.0,   0.95, 0.43, 0.13,
-1.0, 1.0, 1.0,    0.95, 0.43, 0.13,
1.0, 1.0, 1.0,     0.95, 0.43, 0.13,
1.0, 1.0, -1.0,    0.95, 0.43, 0.13,
//left
-1.0, 1.0, 1.0,    0.95, 0.43, 0.13,
-1.0, -1.0, 1.0,   0.95, 0.43, 0.13,
-1.0, -1.0, -1.0,  0.95, 0.43, 0.13,
-1.0, 1.0, -1.0,   0.95, 0.43, 0.13,
//right
1.0, 1.0, 1.0,    0.95, 0.43, 0.13,
1.0, -1.0, 1.0,   0.95, 0.43, 0.13,
1.0, -1.0, -1.0,  0.95, 0.43, 0.13,
1.0, 1.0, -1.0,   0.95, 0.43, 0.13,
//front
1.0, 1.0, 1.0,    0.95, 0.43, 0.13,
1.0, -1.0, 1.0,   0.95, 0.43, 0.13,
-1.0, -1.0, 1.0,  0.95, 0.43, 0.13,
-1.0, 1.0, 1.0,   0.95, 0.43, 0.13,
//back
1.0, 1.0, -1.0,    0.95, 0.43, 0.13,
1.0, -1.0, -1.0,   0.95, 0.43, 0.13,
-1.0, -1.0, -1.0,  0.95, 0.43, 0.13,
-1.0, 1.0, -1.0,   0.95, 0.43, 0.13,
//bottom
-1.0, -1.0, -1.0,  0.95, 0.43, 0.13,
-1.0, -1.0, 1.0,   0.95, 0.43, 0.13,
1.0, -1.0, 1.0,    0.95, 0.43, 0.13,
1.0, -1.0, -1.0,   0.95, 0.43, 0.13,
];

var boxIndices = 
[
//top
0, 1, 2,
0, 2, 3,
//left
5, 4, 6,
6, 4, 7,
// right
8, 9, 10,
8, 10, 11,
//front
13, 12, 14,
15, 14, 12,
//back
16, 17, 18,
16, 18, 19,
//bottom
21, 20, 22,
22, 20, 23
];

var boxVertexBufferObject = gl2.createBuffer();
gl2.bindBuffer(gl2.ARRAY_BUFFER, boxVertexBufferObject);
gl2.bufferData(gl2.ARRAY_BUFFER, new Float32Array(boxVertices), gl2.STATIC_DRAW);

var boxIndexBufferObject = gl2.createBuffer();
gl2.bindBuffer(gl2.ELEMENT_ARRAY_BUFFER, boxIndexBufferObject);
gl2.bufferData(gl2.ELEMENT_ARRAY_BUFFER, new Uint16Array(boxIndices), gl2.STATIC_DRAW);

var positionAttribLocation = gl2.getAttribLocation(program, 'vertPosition');
var colorAttribLocation = gl2.getAttribLocation(program, 'vertColor');

gl2.vertexAttribPointer(
positionAttribLocation,
3,
gl2.FLOAT,
gl2.FALSE,
6 * Float32Array.BYTES_PER_ELEMENT,
0
);
gl2.vertexAttribPointer(
colorAttribLocation,
3,
gl2.FLOAT,
gl2.FALSE,
6 * Float32Array.BYTES_PER_ELEMENT,
3 * Float32Array.BYTES_PER_ELEMENT
);
gl2.enableVertexAttribArray(positionAttribLocation);
gl2.enableVertexAttribArray(colorAttribLocation);

//Program used
gl2.useProgram(program);

var matWorldUniformLocation = gl2.getUniformLocation(program, 'mWorld');
var matViewUniformLocation = gl2.getUniformLocation(program, 'mView');
var matProjUniformLocation = gl2.getUniformLocation(program, 'mProj');

var worldMatrix = new Float32Array(16);
var viewMatrix = new Float32Array(16);
var projMatrix = new Float32Array(16);

glMatrix.mat4.identity(worldMatrix);
glMatrix.mat4.lookAt(viewMatrix, [0,0,-8], [0,0,0], [0,1,0]);
glMatrix.mat4.perspective(projMatrix, glMatrix.glMatrix.toRadian(45), canvas2.width / canvas2.height, 0.1, 1000.0);

gl2.uniformMatrix4fv(matWorldUniformLocation, gl2.FALSE, worldMatrix);
gl2.uniformMatrix4fv(matViewUniformLocation, gl2.FALSE, viewMatrix);
gl2.uniformMatrix4fv(matProjUniformLocation, gl2.FALSE, projMatrix);

var xRotationMatrix = new Float32Array(16);
var yRotationMatrix = new Float32Array(16);

//Render loop

var identityMatrix = new Float32Array(16);
glMatrix.mat4.identity(identityMatrix);

var angle = 0;
  
fuction loop() {
angle = performance.now() / 1000 /6 * 2 * Math.PI;
glMatrix.mat4.rotate(yRotationMatrix, identityMatrix, angle, [0,1,0]);
glMatrix.mat4.rotate(xRotationMatrix, identityMatrix, angle / 4, [1,0,0]);
glMatrix.mat4.mul(worldMatrix, yRotationMatrix, xRotationMatrix);
gl2.uniformMatrix4fv(matWorldUniformLocation, gl2.FALSE, worldMatrix);

gl2.clearColor(0, 0, 0, 1.0);
gl2.clear(gl2.DEPTH_BUFFER_BIT | gl2.COLOR_BUFFER_BIT);

gl2.drawElements(gl2.TRIANGLES, boxIndices.length, gl2.UNSIGNED_SHORT, 0);

//requestAnimationFrame(loop);
};

requestAnimationFrame(loop);
*/

var canvas2 = document.getElementById('glCanvas2');
canvas2.width = 400;
canvas2.height = 400;

var gl2 = canvas2.getContext('webgl');

gl2.viewportWidth = canvas2.width;
gl2.viewportHeight = canvas2.height;
gl2.clearColor(0,0,0,1);
gl2.clear(gl2.COLOR_BUFFER_BIT | gl2.DEPTH_COLOR_BIT);
gl2.enable(gl2.DEPTH_TEST);
gl2.enable(gl2.CULL_FACE);
gl2.frontFace(gl2.CCW);
gl2.cullFace(gl2.BACK);

        const boxVertices = [
            //top
            -1.0, 1.0, -1.0,   0.95, 0.43, 0.13,
            -1.0, 1.0, 1.0,    0.95, 0.43, 0.13,
            1.0, 1.0, 1.0,     0.95, 0.43, 0.13,
            1.0, 1.0, -1.0,    0.95, 0.43, 0.13,
            //left
            -1.0, 1.0, 1.0,    0.95, 0.43, 0.13,
            -1.0, -1.0, 1.0,   0.95, 0.43, 0.13,
            -1.0, -1.0, -1.0,  0.95, 0.43, 0.13,
            -1.0, 1.0, -1.0,   0.95, 0.43, 0.13,
            //right
            1.0, 1.0, 1.0,    0.95, 0.43, 0.13,
            1.0, -1.0, 1.0,   0.95, 0.43, 0.13,
            1.0, -1.0, -1.0,  0.95, 0.43, 0.13,
            1.0, 1.0, -1.0,   0.95, 0.43, 0.13,
            //front
            1.0, 1.0, 1.0,    0.95, 0.43, 0.13,
            1.0, -1.0, 1.0,   0.95, 0.43, 0.13,
            -1.0, -1.0, 1.0,  0.95, 0.43, 0.13,
            -1.0, 1.0, 1.0,   0.95, 0.43, 0.13,
            //back
            1.0, 1.0, -1.0,    0.95, 0.43, 0.13,
            1.0, -1.0, -1.0,   0.95, 0.43, 0.13,
            -1.0, -1.0, -1.0,  0.95, 0.43, 0.13,
            -1.0, 1.0, -1.0,   0.95, 0.43, 0.13,
            //bottom
            -1.0, -1.0, -1.0,  0.95, 0.43, 0.13,
            -1.0, -1.0, 1.0,   0.95, 0.43, 0.13,
            1.0, -1.0, 1.0,    0.95, 0.43, 0.13,
            1.0, -1.0, -1.0,   0.95, 0.43, 0.13,
        ];
            
        const boxIndices = [
            //top
            0, 1, 2,
            0, 2, 3,
            //left
            5, 4, 6,
            6, 4, 7,
            // right
            8, 9, 10,
            8, 10, 11,
            //front
            13, 12, 14,
            15, 14, 12,
            //back
            16, 17, 18,
            16, 18, 19,
            //bottom
            21, 20, 22,
            22, 20, 23
        ];
            
        const boxVertexBufferObject = gl2.createBuffer();
        gl2.bindBuffer(gl2.ARRAY_BUFFER, boxVertexBufferObject);
        gl2.bufferData(gl2.ARRAY_BUFFER, new Float32Array(boxVertices), gl2.STATIC_DRAW);
        
        const boxIndexBufferObject = gl2.createBuffer();
        gl2.bindBuffer(gl2.ELEMENT_ARRAY_BUFFER, boxIndexBufferObject);
        gl2.bufferData(gl2.ELEMENT_ARRAY_BUFFER, new Uint16Array(boxIndices), gl2.STATIC_DRAW);

        const program = ShaderProgram.compileAndCreateProgram(gl2, 'simple');
        
        const positionAttribLocation = gl2.getAttribLocation(program, 'vertPosition');
        const colorAttribLocation = gl2.getAttribLocation(program, 'vertColor');
        
        gl2.vertexAttribPointer(
            positionAttribLocation,
            3,
            gl2.FLOAT,
            gl2.FALSE,
            6 * Float32Array.BYTES_PER_ELEMENT,
            0
        );
        gl2.vertexAttribPointer(
            colorAttribLocation,
            3,
            gl2.FLOAT,
            gl2.FALSE,
            6 * Float32Array.BYTES_PER_ELEMENT,
            3 * Float32Array.BYTES_PER_ELEMENT
        );
        gl2.enableVertexAttribArray(positionAttribLocation);
        gl2.enableVertexAttribArray(colorAttribLocation);
        
        gl2.useProgram(program);
        
        const matWorldUniformLocation = gl2.getUniformLocation(program, 'mWorld');
        const matViewUniformLocation = gl2.getUniformLocation(program, 'mView');
        const matProjUniformLocation = gl2.getUniformLocation(program, 'mProj');
        
        let worldMatrix = glMatrix.mat4.create();
        let viewMatrix = glMatrix.mat4.create();
        let projMatrix = glMatrix.mat4.create();
        
        glMatrix.mat4.identity(worldMatrix);
        glMatrix.mat4.lookAt(viewMatrix, [0,0,-8], [0,0,0], [0,1,0]);
        glMatrix.mat4.perspective(
            projMatrix, glMatrix.glMatrix.toRadian(45), canvas2.width / canvas2.height, 0.1, 1000.0);
        
        gl2.uniformMatrix4fv(matWorldUniformLocation, gl2.FALSE, worldMatrix);
        gl2.uniformMatrix4fv(matViewUniformLocation, gl2.FALSE, viewMatrix);
        gl2.uniformMatrix4fv(matProjUniformLocation, gl2.FALSE, projMatrix);
        
        let xRotationMatrix = glMatrix.mat4.create();
        let yRotationMatrix = glMatrix.mat4.create();
        
        let identityMatrix = glMatrix.mat4.create();
        glMatrix.mat4.identity(identityMatrix);
        
        let angle = 0;

function loop() {
    angle = performance.now() / 1000 /6 * 2 * Math.PI;
    glMatrix.mat4.rotate(yRotationMatrix, identityMatrix, angle, [0,1,0]);
    glMatrix.mat4.rotate(xRotationMatrix, identityMatrix, angle / 4, [1,0,0]);
    glMatrix.mat4.mul(worldMatrix, yRotationMatrix, xRotationMatrix);
    gl2.uniformMatrix4fv(matWorldUniformLocation, gl2.FALSE, worldMatrix);
    
    gl2.clearColor(0, 0, 0, 1.0);
    gl2.clear(gl2.DEPTH_BUFFER_BIT | gl2.COLOR_BUFFER_BIT);
    
    gl2.drawElements(
        gl2.TRIANGLES, boxIndices.length, gl2.UNSIGNED_SHORT, 0);

    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

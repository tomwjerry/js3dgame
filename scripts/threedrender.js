'use strict';

import ShaderProgram from './shaderprogram.js';

export default {
    gl: null,
    init: function(gl, width, height) {
        this.gl = gl;

        gl.viewportWidth = width;
        gl.viewportHeight = height;

        gl.clearColor(0,0,0,1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_COLOR_BIT);
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
        gl.frontFace(gl.CCW);
        gl.cullFace(gl.BACK);

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
            
        this.boxIndices = [
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
            
        const boxVertexBufferObject = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, boxVertexBufferObject);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(boxVertices), gl.STATIC_DRAW);
        
        const boxIndexBufferObject = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, boxIndexBufferObject);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.boxIndices), gl.STATIC_DRAW);

        const program = ShaderProgram.compileAndCreateProgram(gl, 'simple');
        
        const positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
        const colorAttribLocation = gl.getAttribLocation(program, 'vertColor');
        
        gl.vertexAttribPointer(
            positionAttribLocation,
            3,
            gl.FLOAT,
            gl.FALSE,
            6 * Float32Array.BYTES_PER_ELEMENT,
            0
        );
        gl.vertexAttribPointer(
            colorAttribLocation,
            3,
            gl.FLOAT,
            gl.FALSE,
            6 * Float32Array.BYTES_PER_ELEMENT,
            3 * Float32Array.BYTES_PER_ELEMENT
        );
        gl.enableVertexAttribArray(positionAttribLocation);
        gl.enableVertexAttribArray(colorAttribLocation);
        
        gl.useProgram(program);
        
        this.matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
        let matViewUniformLocation = gl.getUniformLocation(program, 'mView');
        let matProjUniformLocation = gl.getUniformLocation(program, 'mProj');
        
        this.worldMatrix = glMatrix.mat4.create();
        let viewMatrix = glMatrix.mat4.create();
        let projMatrix = glMatrix.mat4.create();
        
        glMatrix.mat4.identity(this.worldMatrix);
        glMatrix.mat4.lookAt(viewMatrix, [0,0,-8], [0,0,0], [0,1,0]);
        glMatrix.mat4.perspective(
            projMatrix, glMatrix.glMatrix.toRadian(45), width / height, 0.1, 1000.0);
        
        gl.uniformMatrix4fv(this.matWorldUniformLocation, gl.FALSE, this.worldMatrix);
        gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
        gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);
        
        this.xRotationMatrix = glMatrix.mat4.create();
        this.yRotationMatrix = glMatrix.mat4.create();
        
        this.identityMatrix = glMatrix.mat4.create();
        glMatrix.mat4.identity(this.identityMatrix);
        
        this.angle = 0;
    },
    render: function() {
        this.angle = performance.now() / 1000 /6 * 2 * Math.PI;
        glMatrix.mat4.rotate(this.yRotationMatrix, this.identityMatrix, this.angle, [0,1,0]);
        glMatrix.mat4.rotate(this.xRotationMatrix, this.identityMatrix, this.angle / 4, [1,0,0]);
        glMatrix.mat4.mul(this.worldMatrix, this.yRotationMatrix, this.xRotationMatrix);
        this.gl.uniformMatrix4fv(this.matWorldUniformLocation, this.gl.FALSE, this.worldMatrix);
        
        this.gl.clearColor(0, 0, 0, 1.0);
        this.gl.clear(this.gl.DEPTH_BUFFER_BIT | this.gl.COLOR_BUFFER_BIT);
        
        this.gl.drawElements(
            this.gl.TRIANGLES, this.boxIndices.length, this.gl.UNSIGNED_SHORT, 0);
    }
};

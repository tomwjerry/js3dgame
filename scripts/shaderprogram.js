'use strict';

import SimpleShaderFragment from "./shaders/simple_shader/simple_shader_fragment.js";
import SimpleShaderVertex from "./shaders/simple_shader/simple_shader_vertex.js";

export default {
    compileShader: function(gl, shaderSource, shaderType) {
        let shader = gl.createShader(shaderType);
        gl.shaderSource(shader, shaderSource);
        gl.compileShader(shader);

        let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!success) {
            throw "could not compile shader:" + gl.getShaderInfoLog(shader);
        }

        return shader;
    },
    createProgram: function (gl, vertexShader, fragmentShader) {
        let program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
       
        let success = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!success) {
            // something went wrong with the link
            throw ("program failed to link:" + gl.getProgramInfoLog (program));
        }
       
        return program;
    },
    compileAndCreateProgram: function(gl, type) {
        if (type == 'simple') {
            const fragmentShader =
                this.compileShader(gl, SimpleShaderFragment, gl.FRAGMENT_SHADER);
            const vertexShader =
                this.compileShader(gl, SimpleShaderVertex, gl.VERTEX_SHADER);
            
            return this.createProgram(gl, fragmentShader, vertexShader);
        }
    }
}; 

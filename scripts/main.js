import ThreeDRender from './threedrender.js';

'use strict';

const canvas = document.getElementById("glCanvas");
const gl = canvas.getContext("webgl");

canvas.width = 400;//document.body.clientWidth;
canvas.height = 400;//document.body.clientHeight;

ThreeDRender.init(gl, canvas.width, canvas.height);

function gameLoop() {
    ThreeDRender.render();

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

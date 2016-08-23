/*
	TOYCARS - JavaScript simulation
	Author: Marco Faustinelli (contacts@faustinelli.net)
	Web: http://faustinelli.net/
	     http://faustinelli.wordpress.com/
	Version: 0.1 - Requires Geieslists 1.1 and Geiesvectors 0.1

	The Apache 2.0 License - Copyright (c) 2016 Toycars Project
*/

var instructions = document.getElementById("instructions");

var canv = document.getElementById("myCanvas");
var ctx = canv.getContext("2d");

var canvasWidth = ctx.canvas.clientWidth;
var canvasHeight = ctx.canvas.clientHeight;

var car = document.getElementById("toycar");

function formSubmit(event) {
  try {
    process_trajectory(TC.trajectory(TC.preprocess(instructions.value)));
  } catch (e) {
    alert('wrong syntax');
  }
  //instructions.value = '';
}

function process_trajectory(trajectory) {
  if (L.isEmpty(trajectory)) return;
  ctx.resetTransform();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canv.width, canv.height);
  var currentFrame = L.head(trajectory);
  var translationMatrix = V.translation_matrix(map_x(V.xcor_vect(currentFrame.origin)), map_y(V.ycor_vect(currentFrame.origin)));
  var rotationMatrix = V.rotation_matrix(V.angle_vect(V.sub_vect(currentFrame.heading, currentFrame.origin)));
  P.transform_ctx(ctx, V.mult_matrix(translationMatrix, rotationMatrix));
  // draw reference rectangle + dot in origin
  ctx.drawImage(car, -30, -30);
  setTimeout(() => {
    process_trajectory(L.tail(trajectory));
  }, 1200);
}

function map_x(x_coord) {
 return {
    1: 30,
    2: 60,
    3: 90,
    4: 120,
    5: 150,
    6: 180,
    7: 210,
    8: 240,
    9: 270,
    10: 300,
    11: 330,
    12: 360,
    13: 390,
    14: 420,
    15: 450
  }[x_coord];
}
function map_y(y_coord) {
 return {
    15: 30,
    14: 60,
    13: 90,
    12: 120,
    11: 150,
    10: 180,
    9: 210,
    8: 240,
    7: 270,
    6: 300,
    5: 330,
    4: 360,
    3: 390,
    2: 420,
    1: 450
  }[y_coord];
}

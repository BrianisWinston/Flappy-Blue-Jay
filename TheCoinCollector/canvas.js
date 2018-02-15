var canvas = document.querySelector('canvas');
// let canvas = document.createElement("canvas"),

canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;
let c = canvas.getContext('2d');

let pipeSpeed = 6;

let rectangle = {
  x: 100,
  y: window.innerHeight - 50,
  xVel: 0,
  yVel: 0,
  jumping: true,
};

let controller = {
  left: false,
  right: false,
  up: false,
  keyListener: function(event) {
    let key_state = (event.type == "keydown") ? true : false;

    switch(event.keyCode) {
      case 37:
        controller.left = key_state;
      break;
      case 39:
        controller.right = key_state;
      break;
      case 32:
        controller.up = key_state;
      break;
    }
  }
};

let loop = function() {
  if (controller.up && rectangle.jumping == false ) {
    rectangle.yVel -= 10;
    rectangle.jumping = true;
  }

  if (controller.up && rectangle.jumping == true) {
    rectangle.yVel -= 10;
    rectangle.yVel *= 0.8;
  }

  if (controller.left) {
    rectangle.xVel -= 2;
  }

  if (controller.right) {
    rectangle.xVel += 2;
  }

  rectangle.yVel += 3;
  rectangle.x += rectangle.xVel;
  rectangle.y += rectangle.yVel;
  rectangle.xVel *= 0.9;
  rectangle.yVel *= 0.9;

  if (rectangle.y > window.innerHeight - 100) {
    rectangle.jumping = false;
    rectangle.y = window.innerHeight - 100;
    rectangle.yVel = 0;
  }

  if (rectangle.x < -50) {

    rectangle.x = window.innerWidth;

  } else if (rectangle.x > window.innerWidth + 30) {

    rectangle.x = -49;

  }

  c.fillStyle = "white";
  c.fillRect(0, 0, window.innerWidth, window.innerHeight);
  c.fillStyle = "#ff0000";
  c.fillRect(rectangle.x, rectangle.y, 50, 50);
  // c.beginPath();
  c.strokeStyle = "black";
  c.lineWidth = 4;
  // c.beginPath();
  c.moveTo(0, window.innerHeight - 50);
  c.lineTo(window.innerWidth, window.innerHeight - 50);
  c.stroke();
  window.requestAnimationFrame(loop);
};


window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);


function Pipe() {
  this.top = Math.floor(Math.random() * window.innerHeight/2);
  this.bottom = Math.floor(Math.random() * window.innerHeight/2);
  this.x = window.innerWidth;
  this.w = 20;
  this.speed = pipeSpeed;

  this.highlight = false;

  this.hits = function(rectangle) {
    if (rectangle.y < this.top || rectangle.y > window.innerHeight - this.bottom) {
      if (rectangle.x > this.x && rectangle.x < this.x + this.w) {
        this.highlight = true;
        return true;
        console.log("HIT");
      }
    }
    this.highlight = false;
    return false;
  }

  this.show = function() {
    c.fillStyle = "red"
    if (this.highlight) {
      c.fillStyle = "red";
    }
    c.fillStyle = "black";
    c.fillRect(this.x, 0, 100, this.top);
    c.fillRect(this.x, window.innerHeight - this.bottom, 100, this.bottom);
    console.log(window.innerHeight);
  }

  this.update = function() {
    this.x -= this.speed;
  }

  this.offscreen = function() {
    if (this.x < -this.w - 80) {
      return true;
    } else {
      return false;
    }
  }
}

let pipes = [];
let frameCount = 0;
let times = 0;
pipes.push(new Pipe());
function draw() {
  for (var i = pipes.length-1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].hits(rectangle)) {
      // alert("YOU SUCK");
      console.log("you suck");
    }


    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }


  }

  ++frameCount;
  if (frameCount % 60 == 0) {
    pipes.push(new Pipe());
    frameCount = 0;
    ++times;
    if (times === 10) {
      pipeSpeed *= 1.2
      console.log(times);
      times = 0;
      for (var i = pipes.length-1; i >= 0; i--) {
        pipes[i].speed = pipeSpeed;
      }
      console.log(times);
    }
  }


  window.requestAnimationFrame(draw);
}
window.requestAnimationFrame(draw);

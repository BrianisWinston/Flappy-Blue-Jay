var canvas = document.getElementById('game');
// let canvas = document.createElement("canvas"),

canvas.width = 1000;
canvas.height = 600;
let c = canvas.getContext('2d');
let devil = document.getElementById('img');

let pipeSpeed = 6;
let rectLeftPull = 4;

let rectangle = {
  width: 50,
  height: 50,
  x: canvas.width - 200,
  y: canvas.height - 50,
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

  // console.log(Math.floor(rectangle.x));
  rectangle.yVel += 3;
  rectangle.x += rectangle.xVel;
  rectangle.y += rectangle.yVel;
  rectangle.xVel *= 0.9;
  rectangle.yVel *= 0.9;

  if (controller.left == false && controller.right == false && controller.up == false) {
    rectangle.x -= rectLeftPull;
  }

  if (rectangle.y > canvas.height - 50 - rectangle.height) {
    rectangle.jumping = false;
    rectangle.y = canvas.height - 50 - rectangle.height;
    rectangle.yVel = 0;
  }

  // if (rectangle.x < 0) {
  //
  //   rectangle.x = 0;
  //
  // } else
  if (rectangle.x > canvas.width - 55) {

    rectangle.x = canvas.width - 55;

  }

  if (rectangle.y < 0) {
    rectangle.y = 0
  }

  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = "#ff0000";
  c.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  // c.beginPath();
  c.strokeStyle = "black";
  c.lineWidth = 4;
  // c.beginPath();
  c.moveTo(0, canvas.height - 50);
  c.lineTo(canvas.width, canvas.height - 50);
  c.stroke();
  c.drawImage(devil, 250, 150, 300, 200, rectangle.x, rectangle.y, rectangle.width, rectangle.height);

  window.requestAnimationFrame(loop);
};


window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);


function Pipe() {
  this.top = 150 + (Math.floor(Math.random() * ((canvas.height/2) - 250)));
  // if (this.top < 150) {
  //   this.top = 150;
  // }
  this.bottom = 150 + (Math.floor(Math.random() * ((canvas.height/2) - 250)));
  // if (this.bottom < 150) {
  //   this.bottom = 150;
  // }
  this.x = canvas.width;
  this.w = 80;
  this.speed = pipeSpeed;

  this.highlight = false;

  this.hits = function(rectangle) {
    // LEFT SIDE OF PIPE LEFT SIDE OF RECT
    if (rectangle.y + 10 < this.top || rectangle.y + rectangle.height - 10 > canvas.height - this.bottom) {
      if (rectangle.x > this.x && rectangle.x < this.x + this.w) {
        this.highlight = true;
        return true;
      }
    }
    // LEFT SIDE OF PIPE RIGHT SIDE OF RECT
    if (rectangle.y + 10 < this.top || rectangle.y + rectangle.height - 10 > canvas.height - this.bottom) {
      if (rectangle.x + rectangle.width - 6 > this.x && rectangle.x + rectangle.height < this.x + this.w) {
        this.highlight = true;
        return true;
      }
    }

    if (rectangle.x < -25) {
      this.highlight = true;
      return true;
    }

    // RIGHT SIDE OF PIPE LEFT SIDE OF RECT
    // if (rectangle.y < this.top || rectangle.y + rectangle.height > canvas.height - this.bottom) {
    //   if (rectangle.x < this.x + this.w && rectangle.x > this.x) {
    //     this.highlight = true;
    //     return true;
    //     console.log("HIT");
    //   }
    // }

    // TOP AND BOTTOM SIDES OF PIPES
    // if (rectangle.x + rectangle.width > this.x && rectangle.x + rectangle.height < this.x + this.w) {
    //   if (rectangle.y < this.top || rectangle.y > canvas.height - this.bottom) {
    //     this.highlight = true;
    //     return true;
    //   }
    // }
    //
    // if (rectangle.x > this.x && rectangle.x < this.x + this.w) {
    //   if (rectangle.y < this.top || rectangle.y + rectangle.height > canvas.height - this.bottom) {
    //     this.highlight = true;
    //     return true;
    //     console.log("HIT");
    //   }
    // }



    this.highlight = false;
    return false;
  }

  this.show = function() {
    c.fillStyle = "red"
    if (this.highlight) {
      c.fillStyle = "red";
      c.fillRect(this.x, canvas.height - this.bottom, this.w, this.bottom);
      c.fillRect(this.x, 0, this.w, this.top);
    } else {
    c.fillStyle = "black";
    c.fillRect(this.x, 0, this.w, this.top);
    c.fillRect(this.x, canvas.height - this.bottom, this.w, this.bottom);
    }
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

  this.gameOver = function(rectangle) {
    pipeSpeed = 0;
    rectangle.xVel = 0;
    rectangle.yVel *= 0.9;
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
      // console.log("you suck");
      pipes[i].gameOver;
    }


    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }


  }
// Increase game speed/difficulty
  ++frameCount;
  if (frameCount % 60 == 0) {
    pipes.push(new Pipe());
    frameCount = 0;
    ++times;
    if (times === 5) {
      pipeSpeed *= 1.2;
      rectLeftPull *= 1.2;
      // console.log(times);
      times = 0;
      for (var i = pipes.length-1; i >= 0; i--) {
        pipes[i].speed = pipeSpeed;
      }
      // console.log(times);
    }
  }


  window.requestAnimationFrame(draw);
}
window.requestAnimationFrame(draw);

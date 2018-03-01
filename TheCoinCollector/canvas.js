var canvas = document.getElementById('game');

canvas.width = 1000;
canvas.height = 600;
let c = canvas.getContext('2d');
let bird = document.getElementById('img');
let bg = document.getElementById('BG');
let bod = document.getElementById('BOD');
let bgSpeed = 1;
let pipeSpeed = 6;
let rectLeftPull = 2;
let lost;

let rectangle = {
  width: 100,
  height: 70,
  x: canvas.width - 500,
  y: canvas.height - 50,
  xVel: 0,
  yVel: 0,
  jumping: true,
};

function Background() {
  this.x = 0,
  this.y = 0,
  this.w = canvas.width,
  this.h = canvas.height,
  this.render = function() {
    c.drawImage(bg, this.x -= bgSpeed, 0);
    if (this.x <= -1896) {
      this.x = 0;
    }
  }
}

let background = new Background();

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
  if (controller.up && rectangle.jumping == false && lost != true) {
    rectangle.yVel -= 6;
    rectangle.jumping = true;
  }

  if (controller.up && rectangle.jumping == true && lost != true) {
    rectangle.yVel -= 6;
    rectangle.yVel *= 0.5;
  }

  if (controller.left && lost != true) {
    rectangle.xVel -= 2;
  }

  if (controller.right && lost != true) {
    rectangle.xVel += 2;
  }

  rectangle.yVel += 0.5;
  rectangle.x += rectangle.xVel;
  rectangle.y += rectangle.yVel;
  rectangle.xVel *= 0.9;
  rectangle.yVel *= 0.9;

  if (controller.left == false && controller.right == false && controller.up == false) {
    rectangle.x -= rectLeftPull;
  }

  if (rectangle.y > canvas.height - rectangle.height) {
    rectangle.jumping = false;
    rectangle.y = canvas.height - rectangle.height;
    rectangle.yVel = 0;
  }

  if (rectangle.x < -rectangle.width) {

    rectangle.x = 0;

  }
  if (rectangle.x > canvas.width - 55) {

    rectangle.x = canvas.width - 55;

  }

  if (rectangle.y < 0) {
    rectangle.y = 0
  }

  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);
  // c.fillStyle = "#ff00";
  // -------------------------------------------------------------------------------------------------------------------------------------
  c.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  background.render();
  if (controller.up) {
    c.drawImage(bird, 1200, 458, 590, 350, rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  } else {
    c.drawImage(bird, 00, 50, 580, 350, rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  };


  window.requestAnimationFrame(loop);
};


window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);


function Pipe() {
  this.top = 150 + (Math.floor(Math.random() * ((canvas.height/2) - 250)));
  this.bottom = 150 + (Math.floor(Math.random() * ((canvas.height/2) - 250)));
  this.x = canvas.width;
  this.w = 80;
  this.speed = pipeSpeed;

  // this.highlight = false;

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

    this.highlight = false;
    return false;
  }

  this.show = function() {
    c.fillStyle = "red"
    // if (this.highlight) {
    //   c.fillStyle = "red";
    //   c.fillRect(this.x, canvas.height - this.bottom, this.w, this.bottom);
    //   c.fillRect(this.x, 0, this.w, this.top);
    // } else {
    c.fillStyle = "transparent";
    c.fillRect(this.x, 0, this.w, this.top);
    c.drawImage(bod, 1, 1, 200, 650, this.x - 30, 0, this.w + 100, this.top + 20);
    c.fillRect(this.x, canvas.height - this.bottom, this.w, this.bottom);
    c.save();
    c.drawImage(bod, 1, 1, 200, 700, this.x - 30, canvas.height - this.bottom, this.w + 100, this.bottom + 20);
    c.save();
    // c.rotate(Math.PI);
    // c.restore();
    // }
  }

  this.update = function() {
    this.x -= this.speed;
  }

  this.offscreen = function() {
    if (lost == true) {
      return false;
    }
    if (this.x < -this.w - 80) {
      return true;
    } else {
      return false;
    }
  }

  this.gameOver = function(rectangle) {
    window.removeEventListener("keydown", controller.keyListener);
    window.addEventListener("keyup", controller.keyListener);
    rectangle.xVel = 0;
    rectangle.yVel = 9;
    rectLeftPull = 0;
    bgSpeed = 0;
    pipeSpeed = 0;
    this.show();
  }
}

let pipes = [];
let frameCount = 0;
let times = 0;
var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];


pipes.push(new Pipe());
function draw() {
  if (lost == true) {
    times = -1;
    for (var i = 0; i <= pipes.length-1; i++) {
      frameCount = 0;
      pipeSpeed = 0;
      rectLeftPull *= 0;
      bgSpeed *= 0;
      pipes[i].speed = pipeSpeed;
      pipes[i].show();
    }
  }
  for (var i = pipes.length-1; i >= 0; i--) {
    pipes[i].show();
    if (lost != true) {
      pipes[i].update();
    }

    if (pipes[i].hits(rectangle)) {
      // alert("YOU SUCK");
      // console.log("you suck");
      lost = true;
      pipes[i].gameOver(rectangle);
      for (var i = pipes.length-1; i >= 0; i--) {
        pipes[i].speed = 0;
        pipeSpeed = 0;
      }
      modal.style.display = "block";
      // span.onclick = function() {
      //     modal.style.display = "none";
      // };

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
          if (event.target == modal) {
              modal.style.display = "none";
          }
      }
    } else { if (pipes[i].offscreen() == true && lost != true) {
        pipes.splice(i, 1);
      }
    }

  }
// Increase game speed/difficulty
  if (lost != true) {
    ++frameCount;
  }
  if (frameCount % 60 == 0 && lost != true) {
    pipes.push(new Pipe());
    // console.log(pipes);
    frameCount = 0;
    ++times;
    if (times === 5 && lost != true) {
      pipeSpeed *= 1.2;
      rectLeftPull *= 1.05;
      bgSpeed *= 1.2;
      times = 0;
      for (var i = pipes.length-1; i >= 0; i--) {
        pipes[i].speed = pipeSpeed;
      }
    }
  }

  // if (lost != true) {

    window.requestAnimationFrame(draw);
  // }
}
window.requestAnimationFrame(draw);

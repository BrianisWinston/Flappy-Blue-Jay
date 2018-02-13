// var canvas = document.querySelector('canvas');

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
// let c = canvas.getContext('2d');
// c.fillRect(0, 500, 200, 200);
// c.fillRect(360, 200, 100, 400);
// c.fillRect(700, 500, 300, 200);
// c.fillRect(500, 300, 50, 50);

var myGamePiece;

function startGame() {
    myGameArea.start();
    myGamePiece = new component(300, 100, "blue", 40, 600);
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = window.innerWidth - 10;
        this.canvas.height = window.innerHeight - 40;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
    },
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y) {
    this.gamearea = myGameArea;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -10; }
    if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 10; }
    if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -10; }
    if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 10; }
    myGamePiece.newPos();
    myGamePiece.update();
}

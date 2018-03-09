# Flappy Blue Jay

---



Live Site: https://brianiswinston.github.io/

Flappy Blue Jay is a Flappy Bird clone, one of the most popular and influential mobile games in 2014. Fly through the pipes without crashing! You must react quickly to glide through each set of branches. Time each move perfectly to continue flying and set a high score!


---

## Technology

Built with ...

* HTML, CSS, JavaScript and Canvas.js on the frontend

  <img src="https://user-images.githubusercontent.com/26920351/36052477-a6e7e416-0da2-11e8-813a-1ee556d4d8b0.png" width="30">  <img src="https://user-images.githubusercontent.com/26920351/36052488-b2fb00b2-0da2-11e8-995b-aeac3b9e68bb.png" height="30">  <img src="https://user-images.githubusercontent.com/26920351/37221576-557650d4-237f-11e8-88bb-1f9ba7de681a.png" height="30">  <img src="https://user-images.githubusercontent.com/26920351/37221652-892af8ee-237f-11e8-9e7d-be2cac0b1999.jpg" height="25">    

---
## Features & Implementation

### User Input and Character movement
A user can control the character to avoid the branches. The user can either move left, right, or up to dictate where to go. Furthermore, the user can take advantage of gravity to let the character move down.

<img src="https://user-images.githubusercontent.com/26920351/37222140-f4c38c28-2380-11e8-80fb-b0bd59f78257.jpg" width="400">

### Score Keeper
As the Blue Jay passes a branch, the counter will increase signifying the user's score. Although, it is not possible for the bird to pass through the same branch multiple times to increase their score.

IMAGE

### Branch hit boxes and Restart Screen

If the character were to touch a branch, their is a game over screen with the option to start over.

<img src="https://user-images.githubusercontent.com/26920351/37222224-31733150-2381-11e8-8655-6131d6b81450.jpg" width="400">

---

## Code Examples and Challenges

One of the challenges I spent too much time on was being confused on how to keep the branches showing after the game over screen pops up. I was unsure where the problem was so I started implementing my branches' show function
```javascript
// canvas.js
this.show = function() {
  c.fillStyle = "red"
  c.fillStyle = "transparent";
  c.fillRect(this.x, 0, this.w, this.top);
  c.save();
  c.drawImage(bod, 1, 1, 200, 650, this.x - 90, -70, this.w + 200, this.top + 80);
  c.fillRect(this.x, canvas.height - this.bottom, this.w, this.bottom);
  c.restore();
  c.save();
  c.drawImage(bod, 1, 1, 200, 700, this.x - 60, canvas.height - this.bottom, this.w + 150, this.bottom + 80);
  c.save();
}
```
 in multiple places. I tried to implement the show function inside each branches gameover function. Which did not work.
 ```javascript
 // canvas.js
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
 ```
Eventually, I found the right area to put the function, in my line of code when, if the game is over, grab each individual branch and call the show function.
 ```javascript
 // canvas.js
 if (lost == true) {
   times = -1;
   for (var i = 0; i <= pipes.length-1; i++) {
     frameCount = 0;
     pipeSpeed = 0;
     rectLeftPull *= 0;
     bgSpeed *= 0;
     pipes[i].speed = pipeSpeed;
     // WHERE PIPES GO AWAY AT GAME OVER SCREEN --------------------------------------------------------------
     pipes[i].show();
   }
 }
 ```
---

## Ideas for Future Work

### High Score Leaderboard

I cannot create a game with scores without including one of its' most important aspects - keeping the high scores. This is key for creating competitiveness within users. This seems challenging, because I will need to implement a back end that keeps track of the top scores. I am excited to take on that challenge.

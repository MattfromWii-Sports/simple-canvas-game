const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;

//
let bgReady = false;
let bgImage = new Image();
bgImage.onload = function() {
    bgReady = true;
};
bgImage.src = "images/background.png";

let hrReady = false;
let hrImage = new Image();
hrImage.onload = function() {
    hrReady = true;
};
hrImage.src = "images/hero.png";

let mnReady = false;
let mnImage = new Image();
mnImage.onload = function() {
    mnReady = true;
};
mnImage.src = "images/monster.png";

//
let hero = {
    speed: 256,
    x: 0,
    y: 0
};
let monster = {
    x: 0,
    y: 0
}
let monstersCaught = 0;

//
let keysDown = {};
addEventListener("keydown", function(e) {
    keysDown[e.key] = true;
}, false);
addEventListener("keyup", function(e) {
    delete keysDown[e.key];
}, false);

//
const reset = function() {
    hero.x = canvas.width / 2;
    hero.y = canvas.width / 2;
    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.height - 64));
};

//
const update = function(modifier) {
    if("ArrowDown" in keysDown && hero.y + hero.speed * modifier < canvas.height - 32) {
        hero.y += hero.speed * modifier;
    }
    if("ArrowUp" in keysDown && hero.y > 0) {
        hero.y -= hero.speed * modifier;
    }
    if("ArrowLeft" in keysDown && hero.x > 0) {
        hero.x -= hero.speed * modifier;
    }
    if("ArrowRight" in keysDown && hero.x + hero.speed * modifier < canvas.width - 32) {
        hero.x += hero.speed * modifier;
    }
    if(hero.x <= monster.x + 32 && hero.y <= monster.y + 32 &&
        monster.x <= hero.x + 32 && monster.y <= hero.y + 32) {
        monstersCaught++;
        reset();
    }
};

//
const render = function() {
    if(bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }
    if(hrReady) {
        ctx.drawImage(hrImage, hero.x, hero.y);
    }
    if(mnReady) {
        ctx.drawImage(mnImage, monster.x, monster.y);
    }
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Monsters caught: " + monstersCaught, 32, 32);
}


let then = Date.now();
const main = function() {
    let now = Date.now();
    let delta = now - then;
    update(delta/1000);
    render();
    then = now;
    requestAnimationFrame(main);
}

//
reset();
main();
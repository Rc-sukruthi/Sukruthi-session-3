var bg_img 
var playbutton, aboutbutton
var gameState = 'wait'
var background1 
var player
var player_img
var enemy, enemy1_img, enemy2_img, enemyGroup

function preload(){
    bg_img = loadImage("assets/Splashscreen.gif");
    background1 = loadImage("assets/Background 1.jpg")
    player_img = loadImage("assets/Diver.png")
    enemy1_img = loadImage("assets/fish1.png")
    enemy2_img = loadImage("assets/octopus2.png")
}

function setup(){
    createCanvas(windowWidth, windowHeight)

    playbutton = createImg("assets/play_button.png");
    playbutton.position(600, 400);
    playbutton.size(300, 300);
    playbutton.hide();

    aboutbutton = createImg("assets/about_button.png");
    aboutbutton.position(750, 400);
    aboutbutton.size(300, 300);
    aboutbutton.hide();

    player = createSprite(400, 600);
    player.addImage("main", player_img);
    player.visible=false;

    enemyGroup = new Group();
}

function draw(){
    

    if(gameState === "wait"){
        background(bg_img)
        playbutton.show()
        aboutbutton.show()
    }
        aboutbutton.mousePressed(() => {
            playbutton.hide();
            aboutbutton.hide();
            gameState = "about";
    
        })
    
        if (gameState == "about") {
            aboutgame();
        }

        playbutton.mousePressed(() => {
            playbutton.hide();
            aboutbutton.hide();
            gameState = "play";
        })

        if (gameState == "play"){
            background(background1)
            player.visible = true
            spawnEnemies()
            movement()
        }
    

    drawSprites()

}

function aboutgame() {

    swal({
        title: "About Game === How to Play!!",
        text: "Dive into the ocean as scuba divers for a fishing scavenger - come explore the underwater world.",
        textAlign: "center",
        imageUrl: "assets/Splashscreen.gif",
        imageSize: "200x200",
        confirmButtonText: "Let's swim!",
        confirmButtonColor: "blue",
    },
        function () {
            gameState = "wait"
        }

    )


}

function spawnEnemies() {
    if (frameCount % 100 == 0) {
        var randy = Math.round(random(50, 600))
        enemy = createSprite(width, randy);
        enemy.scale = 0.25
        enemy.velocityX = -4;
        //enemy.debug = true;

        //var randy1 = Math.round(random(0, 30))
        //var randx1 = Math.round(random(400, width))

        var randimg = Math.round(random(1, 2))
        switch (randimg) {

            case 1:
                //enemy.x = randx1;
                //enemy.y = randy1;
                enemy.addImage(enemy1_img)
                //enemy.debug=true;
               // enemy.velocityY = 4;
                enemy.setCollider("rectangle", 0, 0, 250, 300)
                break;

            case 2:
                enemy.addImage(enemy2_img)
                //enemy.setCollider("rectangle", 0, 0, 100, 100)
                enemy.setCollider("rectangle",0,0,enemy.width,enemy.height)
                break;

            default: break;

        }

        enemy.depth = player.depth;
        player.depth = player.depth + 1;

        enemyGroup.add(enemy);



    }
}

function movement() {

    if (player.y <= 10) {
        player.y = 10
    }

    if (player.y >= 550) {
        player.y = 550
    }

    // if (jet.x >= 800) {
    //     jet.x = 800
    // }

    // if (jet.x <= 30) {
    //     jet.x = 30
    // }

    if (keyDown("UP_ARROW")) {
        player.y = player.y - 5;
    }

    if (keyDown("DOWN_ARROW")) {
        player.y = player.y + 5;
    }

    // if (keyDown("LEFT_ARROW")) {
    //     jet.x = jet.x - 5;
    //     jet.changeImage("leftjet", jet_img_left);
    //     jet_position = "left";

    // }

    // if (keyDown("RIGHT_ARROW")) {
    //     jet.x = jet.x + 5;
    //     jet.changeImage("main", jet_img);
    //     jet_position = "right";
    // }

    // if (keyDown("space")) {
    //     spawnBullets();
    // }



}
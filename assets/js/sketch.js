/** Carrega os assets do projeto. */
function preload() {
    p5.disableFriendlyErrors = true;

    jogo = new Jogo();
    jogo.preload();
    frameRate(jogo.configuracoes.frameRate);
}

/** Configura o jogo */
function setup() {
    createCanvas(windowWidth, windowHeight);
    jogo.setup();
}

/** Desenha, a cada loop, o jogo */
function draw() {
    jogo.draw();
}

/** Captura os movimentos do mouse ou do teclado */
function keyPressed() {
    jogo.keyPressed(key);
}

// function mousePressed() {
//     jogo.mousePressed(mouseX, mouseY);
// }

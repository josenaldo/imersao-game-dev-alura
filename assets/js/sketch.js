/** Carrega os assets do projeto. */
function preload() {
    p5.disableFriendlyErrors = true;

    jogo = new Jogo();

    loadJSON('assets/data/mapa.json', preloadJogo);

    frameRate(jogo.configuracoes.frameRate);
}

/** Configura o jogo */
function setup() {
    createCanvas(windowWidth, windowHeight);

    jogo.setup();
}

function preloadJogo(configMapa) {
    jogo.preload(configMapa);
}

/** Desenha, a cada loop, o jogo */
function draw() {
    jogo.draw();
}

/** Captura os movimentos do mouse ou do teclado */
function keyPressed() {
    jogo.keyPressed(key);
}

function mousePressed() {
    jogo.mousePressed(mouseX, mouseY);
}

// TODO: Ajustar todos os draw para levar em consideração as dimensões atuais do cnvas
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
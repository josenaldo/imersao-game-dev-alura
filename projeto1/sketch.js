let imagemCenario;
let imagemPersonagem;
let cenario;
let personagem;
let somDoJogo;

function preload() {
    imagemCenario = loadImage('imagens/cenario/floresta.png')
    imagemPersonagem = loadImage('imagens/personagem/correndo.png')
    somDoJogo = loadSound('sons/trilha_jogo.mp3')
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    cenario = new Cenario(imagemCenario, 16);
    personagem = new Personagem(imagemPersonagem);
    frameRate(24);
    somDoJogo.loop();
}

function draw() {
    cenario.move();
    cenario.exibe();

    personagem.anima();
    personagem.exibe();
}

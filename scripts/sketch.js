let imagemCenario;
let imagemPersonagem;
let imagemInimigo;

let cenario;
let personagem;
let iniimgo;
let somDoJogo;

function preload() {
    imagemCenario = loadImage('imagens/cenario/cenario-piroto.png');
    imagemPersonagem = loadImage('imagens/personagem/piroto.png');
    imagemInimigo = loadImage('imagens/inimigos/gotinha.png');
    somDoJogo = loadSound('sons/trilha_jogo.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    cenario = new Cenario(imagemCenario, 10);
    personagem = new Personagem(imagemPersonagem);
    inimigo = new Inimigo(imagemInimigo, width - 100, height - 120 - 100, 104, 100, 104, 100, 4, 7);
    frameRate(30);
    somDoJogo.loop();
}

function draw() {
    cenario.move();
    cenario.exibe();

    personagem.exibe();

    inimigo.exibe();
    inimigo.move();
}

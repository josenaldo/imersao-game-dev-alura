let imagemCenario;
let imagemPersonagem;
let cenario;
let personagem;
let somDoJogo;

function preload() {
    imagemCenario = loadImage('imagens/cenario/cenario-piroto.png')
    imagemPersonagem = loadImage('imagens/personagem/piroto.png')
    somDoJogo = loadSound('sons/trilha_jogo.mp3')
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    cenario = new Cenario(imagemCenario, 3);
    personagem = new Personagem(imagemPersonagem);
    frameRate(30);
    somDoJogo.loop();
}

function draw() {
    cenario.move();
    cenario.exibe();

    personagem.anima();
    personagem.exibe();
}

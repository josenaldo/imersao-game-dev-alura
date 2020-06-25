let imagemCenario;
let imagemPersonagem;
let imagemInimigo;

let cenario;
let personagem;
let iniimgo;
let somDoJogo;

const ALTURA_D0_CHAO = 120;

/** Captura os movimentos do mouse ou do teclado */
function keyPressed() {
    if(key === 'ArrowUp'){
        personagem.pula();
    }
}

/** Carrega os assets do projeto. */
function preload() {
    imagemCenario = loadImage('imagens/cenario/cenario-piroto.png');
    imagemPersonagem = loadImage('imagens/personagem/piroto.png');
    imagemInimigo = loadImage('imagens/inimigos/gotinha.png');
    somDoJogo = loadSound('sons/trilha_jogo.mp3');
}

/** Configura o jogo */
function setup() {
    createCanvas(windowWidth, windowHeight);
    cenario = new Cenario(imagemCenario, 10);
    personagem = new Personagem(
        imagemPersonagem,
        50,
        ALTURA_D0_CHAO,
        210, 252,
        420, 504,
        4, 4);
    inimigo = new Inimigo(
        imagemInimigo,
        width - 100,
        height - ALTURA_D0_CHAO- 104,
        104,
        100,
        104,
        100,
        4, 7);
    frameRate(30);
    somDoJogo.loop();
}

/** Desenha o jogo, a cada iteração do game loop */
function draw() {
    cenario.move();
    cenario.exibe();

    personagem.exibe();

    inimigo.exibe();
    inimigo.move();
}

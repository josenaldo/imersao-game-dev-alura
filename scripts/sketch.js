let imagemCenarioCeu;
let imagemCenarioMontanhas;
let imagemCenarioArvores;
let imagemCenarioChao;

let cenarioCeu;
let cenarioMontanhas;
let cenarioArvores;
let cenarioChao;

let imagemPersonagem;
let imagemInimigo;

let personagem;
let iniimgo;
let somDoJogo;

const ALTURA_D0_CHAO = 120;

/** Captura os movimentos do mouse ou do teclado */
function keyPressed() {
    if (key === 'ArrowUp') {
        personagem.pula();
        somDoPulo.play();
    }
}

/** Carrega os assets do projeto. */
function preload() {
    imagemCenarioCeu = loadImage('imagens/cenario/cenario-ceu.png');
    imagemCenarioMontanhas = loadImage('imagens/cenario/cenario-montanhas.png');
    imagemCenarioArvores = loadImage('imagens/cenario/cenario-arvores.png');
    imagemCenarioChao = loadImage('imagens/cenario/cenario-chao.png');

    imagemPersonagem = loadImage('imagens/personagem/piroto.png');
    imagemInimigo = loadImage('imagens/inimigos/chifrus.png');
    somDoJogo = loadSound('sons/trilha_jogo.mp3');
    somDoPulo = loadSound('sons/pulo.wav');
}

/** Configura o jogo */
function setup() {
    createCanvas(windowWidth, windowHeight);

    cenarioCeu = new Cenario(imagemCenarioCeu, 4);
    cenarioMontanhas = new Cenario(imagemCenarioMontanhas, 6);
    cenarioArvores = new Cenario(imagemCenarioArvores, 8);
    cenarioChao = new Cenario(imagemCenarioChao, 10, height-150);

    inimigo = new Inimigo(imagemInimigo,
        width, height - ALTURA_D0_CHAO-109, 105, 109, 315, 329, 4, 7);

    personagem = new Personagem(imagemPersonagem, 50, ALTURA_D0_CHAO, 210, 252, 420, 504, 4, 4);

    frameRate(48);
    somDoJogo.loop();
}

/** Desenha o jogo, a cada iteração do game loop */
function draw() {
    cenarioCeu.move();
    cenarioCeu.exibe();
    cenarioMontanhas.move();
    cenarioMontanhas.exibe();
    cenarioArvores.move();
    cenarioArvores.exibe();
    cenarioChao.move();
    cenarioChao.exibe();

    personagem.exibe();

    inimigo.exibe();
    inimigo.move();

    if(personagem.estaColidindo(inimigo)){
        console.log("Colidiu")
        noLoop()
        somDoJogo.stop();
    }
}

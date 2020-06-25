let imagemCenarioCeu;
let imagemCenarioMontanhas;
let imagemCenarioArvores;
let imagemCenarioChao;

let cenarioCeu;
let cenarioMontanhas;
let cenarioArvores;
let cenarioChao;

let imagemPersonagem;
let personagem;

let imagemInimigoChifrus;
let inimgoChifrus;

let imagemInimigoBatus;
let inimgoBatus;

let somDoJogo;
let somDoPulo;

let imagemGameOver;
let gameOver = false;

const ALTURA_D0_CHAO = 120;
p5.disableFriendlyErrors = true;

/** Captura os movimentos do mouse ou do teclado */
function keyPressed() {
    if (key === 'ArrowUp') {
        personagem.pula();
       
    }

    if(key === ' ' && gameOver) {
        gameOver = false;
        clear();
        reset();
        loop();
    }
}

/** Carrega os assets do projeto. */
function preload() {
    imagemCenarioCeu = loadImage('imagens/cenario/cenario-ceu.png');
    imagemCenarioMontanhas = loadImage('imagens/cenario/cenario-montanhas.png');
    imagemCenarioArvores = loadImage('imagens/cenario/cenario-arvores.png');
    imagemCenarioChao = loadImage('imagens/cenario/cenario-chao.png');

    imagemPersonagem = loadImage('imagens/personagem/piroto.png');
    imagemInimigoChifrus = loadImage('imagens/inimigos/chifrus.png');
    imagemInimigoBatus = loadImage('imagens/inimigos/batus.png');

    imagemGameOver = loadImage('imagens/assets/game-over.png');

    somDoJogo = loadSound('sons/trilha_jogo.mp3');
    somDoPulo = loadSound('sons/pulo.wav');
}

/** Configura o jogo */
function setup() {
    createCanvas(windowWidth, windowHeight);
    reset();
}

function reset() {
    cenarioCeu = new Cenario(imagemCenarioCeu, 4);
    cenarioMontanhas = new Cenario(imagemCenarioMontanhas, 6);
    cenarioArvores = new Cenario(imagemCenarioArvores, 8);
    cenarioChao = new Cenario(imagemCenarioChao, 10, height-150);

    inimigoChifrus = new Inimigo(imagemInimigoChifrus, width, height - ALTURA_D0_CHAO-109, 105, 109, 315, 329, 4, 7);

    inimigoBatus = new Inimigo(imagemInimigoBatus, width + width/2 , height/1.8, 200, 125, 401, 249, 3, 2);

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

    inimigoChifrus.exibe();
    inimigoChifrus.move();

    inimigoBatus.exibe();
    inimigoBatus.move();

    if(personagem.estaColidindo(inimigoChifrus) || personagem.estaColidindo(inimigoBatus)){
        gameOver = true;
        somDoJogo.stop();
        noLoop()
        image(imagemGameOver, 0, 0);
    }
}

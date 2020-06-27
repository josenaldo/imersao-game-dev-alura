const GameState = {
    STARTED: 'started',
    CONFIG: 'config',
    RUNNING: 'running',
    PAUSED: 'paused',
    GAMEOVER: 'gameover',
}

class Game {
    constructor() {

        // Cenario jogo iniciado
        this.imagemGameStart = null;
        this.cenarioInicio = null;

        // Cenário jogo rodando
        this.imagemCenarioCeu = null;
        this.imagemCenarioMontanhas = null;
        this.imagemCenarioArvores = null;
        this.imagemCenarioChao = null;
        this.cenarioCeu = null;
        this.cenarioMontanhas = null;
        this.cenarioArvores = null;
        this.cenarioChao = null;

        // Cenário pause
        this.imagemPause = null;
        this.pause = false;

        // Cenário game over
        this.imagemGameOver = null;
        this.gameOver = false;

        // Personagem
        this.imagemPersonagem = null;
        this.personagem = null;

        //Inimigos
        this.geradorDeInimigos = null;
        this.geradorDeMoedas = null;

        //Sons
        this.somDoJogo = null;
        this.somDoGameOver = null;
        this.somDoPulo = null;

        this.pontuacao = null;

        this.alturaDoChao = 120;

        this.velocidadeBase = 1;
        this.aceleracao = 0.01;

        this.gameState = GameState.STARTED;
        this.previousGameState = GameState.STARTED;

    }

    preload() {

        this.imagemGameStart = loadImage('assets/images/telas/tela-inicio.png');

        this.imagemCenarioCeu = loadImage('assets/images/cenario/cenario-ceu.png');
        this.imagemCenarioMontanhas = loadImage('assets/images/cenario/cenario-montanhas.png');
        this.imagemCenarioArvores = loadImage('assets/images/cenario/cenario-arvores.png');
        this.imagemCenarioChao = loadImage('assets/images/cenario/cenario-chao.png');

        this.imagemPause = loadImage('assets/images/telas/tela-pause.png');
        this.imagemGameOver = loadImage('assets/images/telas/tela-game-over.png');

        this.somDoJogo = loadSound('assets/sounds/running-1.mp3');
        this.somDoInicio = loadSound('assets/sounds/start-game.mp3');
        this.somDoGameOver = loadSound('assets/sounds/game-over.mp3');
        this.somDoPulo = loadSound('assets/sounds/pulo.wav');

        this.imagemPersonagem = loadImage('assets/images/personagem/piroto.png');

        this.geradorDeInimigos = new GeradorDeInimigos();
        this.geradorDeInimigos.preload();

        this.geradorDeMoedas = new GeradorDeMoedas();
        this.geradorDeMoedas.preload();
    }

    reset() {
        this.velocidadeBase = 1;
        this.pontuacao = new Pontuacao();
        this.cenarioCeu = new Cenario(this.imagemCenarioCeu, 4);
        this.cenarioMontanhas = new Cenario(this.imagemCenarioMontanhas, 6);
        this.cenarioArvores = new Cenario(this.imagemCenarioArvores, 8);
        this.cenarioChao = new Cenario(this.imagemCenarioChao, 10);

        this.personagem = new Personagem(this.imagemPersonagem, this.somDoPulo, 50, this.alturaDoChao, 210, 252, 420, 504, 4, 4);

        this.geradorDeMoedas.setup();
        this.geradorDeInimigos.setup();
    }

    /** Desenha o jogo, a cada iteração do game loop */
    draw() {

        switch (this.gameState) {
            case GameState.STARTED:
                this.showGameStarted();
                break;
            case GameState.CONFIG:
                this.showGameStarted();
                break;
            case GameState.RUNNING:
                this.showGameRunning();
                break;
            case GameState.PAUSED:
                this.showGamePaused();
                break;
            case GameState.GAMEOVER:
                this.showGameOver();
                break;
        }

    }

    keyPressed(key) {
        switch (this.gameState) {
            case GameState.STARTED:
                this.setStateGameRunning();
                break;
            case GameState.CONFIG:
                this.setStateGameStarted();
                break;
            case GameState.RUNNING:
                if (key === 'ArrowUp') {
                    this.personagem.pula();
                }
                if (key === 'p' || key === 'P') {
                    this.setStateGamePause();
                }
                break;
            case GameState.PAUSED:
                if (key === 'p' || key === 'P') {
                    this.setStateGameRunning();
                }
                break;
            case GameState.GAMEOVER:
                if (key === ' ') {
                    this.setStateGameRunning();
                }

                if(key === 'Enter') {
                    this.setStateGameStarted();
                }
                break;
        }

    }

    getAlturaDoChao() {
        return this.alturaDoChao;
    }

    getVelocidadeBase() {
        return this.velocidadeBase;
    }

    setStateGameStarted() {
        this.previousGameState = this.gameState;

        if(this.previousGameState === GameState.GAMEOVER){
            this.somDoGameOver.stop();
        }

        this.somDoInicio.loop();
        console.log("INICIANDO SOM")
        image(this.imagemGameStart, 0, 0);
        noLoop();
        this.gameState = GameState.STARTED;
    }

    setStateGameConfig() {
        this.previousGameState = this.gameState;
        this.gameState = GameState.CONFIG;
    }

    setStateGameRunning() {
        this.previousGameState = this.gameState;

        if(this.previousGameState === GameState.STARTED || this.previousGameState === GameState.GAMEOVER){
            this.somDoInicio.stop();
            this.somDoGameOver.stop();
            this.somDoJogo.loop();
            clear();
            this.reset();
            loop();
        }else if(this.previousGameState === GameState.PAUSED) {
            loop();
            this.somDoJogo.loop();
        }

        this.gameState = GameState.RUNNING;
    }

    setStateGamePause() {
        this.somDoJogo.pause();
        this.previousGameState = this.gameState;
        this.gameState = GameState.PAUSED;

        image(this.imagemPause, 0, 0);
        noLoop();
    }

    setStateGameOver() {
        this.previousGameState = this.gameState;
        this.gameState = GameState.GAMEOVER;

        this.somDoJogo.stop();
        this.somDoGameOver.loop();

        image(this.imagemGameOver, 0, 0);
        noLoop();
    }

    showGameStarted() {

    }

    showGameConfig() {

    }

    showGameRunning() {

        this.cenarioCeu.move();
        this.cenarioCeu.exibe();
        this.cenarioMontanhas.move();
        this.cenarioMontanhas.exibe();
        this.cenarioArvores.move();
        this.cenarioArvores.exibe();
        this.cenarioChao.move();
        this.cenarioChao.exibe();
        this.geradorDeMoedas.exibe();
        this.geradorDeMoedas.estaColidindo(this.personagem);
        this.personagem.exibe();
        this.pontuacao.pontuarPorDistancia();
        this.pontuacao.exibe();
        this.geradorDeInimigos.exibe();
        this.geradorDeInimigos.estaColidindo(this.personagem);
    }

    showGamePaused() {

    }

    showGameOver() {

    }

    pegouMoeda() {
        this.pontuacao.pegouMoeda();
    }

    aumentaDificuldade() {
        console.log("Aumentou a dificuldade: " + this.pontuacao.getPontos())
        this.geradorDeInimigos.aumentaDificuldade();
        this.velocidadeBase = this.velocidadeBase + this.aceleracao;
    }

}


/** Carrega os assets do projeto. */
function preload() {
    p5.disableFriendlyErrors = true;
    frameRate(48);
    game = new Game();
    game.preload();
}

/** Configura o jogo */
function setup() {
    createCanvas(windowWidth, windowHeight);
    game.setStateGameStarted();
}


function draw() {
    game.draw();
}

/** Captura os movimentos do mouse ou do teclado */
function keyPressed() {
    game.keyPressed(key);
}

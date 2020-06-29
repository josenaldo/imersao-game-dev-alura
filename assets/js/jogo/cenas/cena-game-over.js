class CenaGameOver {

    constructor() {
        //console.log("CenaGameOver: construtor");

        this.imagemGameOver = null;
        this.gameOver = false;
        this.somDoGameOver = null;
        this.netx = null;
    }

    preload() {
        //console.log("CenaGameOver: preload");
        this.imagemGameOver = loadImage('assets/images/telas/tela-game-over.png');
        this.somDoGameOver = loadSound('assets/sounds/game-over.mp3');
    }

    setup() {
        //console.log("CenaGameOver: setup");
    }

    reset() {

    }

    draw() {
        //console.log("CenaGameOver: draw");
        this.somDoGameOver.loop();
        image(this.imagemGameOver, 0, 0);
        noLoop();
    }

    sceneEnd() {
        //console.log("CenaGameOver: sceneEnd");
        this.somDoGameOver.stop();
        return this.next;
    }

    keyPressed(key) {
        //console.log("CenaGameOver: keyPressed");

        if(key === ' ') {
            this.next = "cenaFase"
            jogo.gerenciadorDeEventos.publicar("cena-terminada", this);
        }

        if(key === 'Enter') {
            this.next = "cenaInicial"
            jogo.gerenciadorDeEventos.publicar("cena-terminada", this);
        }
    }
}
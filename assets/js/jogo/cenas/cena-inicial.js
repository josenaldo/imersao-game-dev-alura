class CenaInicial {

    constructor() {
        //console.log("CenaInicial: construtor")

        this.imagemGameStart = null;
        this.cenarioInicio = null;
        this.somDoInicio = null;
    }

    preload() {
        //console.log("CenaInicial: preload")
        this.somDoInicio = loadSound('assets/sounds/start-game.mp3');
        this.imagemGameStart = loadImage('assets/images/telas/tela-inicio.png');
    }

    setup() {
        //console.log("CenaInicial: setup")
    }

    reset() {
        this.somDoInicio.loop();
        loop();
    }

    draw() {
        //console.log("CenaInicial: draw");
        image(this.imagemGameStart, 0, 0);
        noLoop();
    }

    sceneEnd() {
        //console.log("CenaInicial: sceneEnd")
        this.somDoInicio.stop();
        return "cenaFase";
    }

    keyPressed() {
        //console.log("CenaInicial: keyPressed")
        jogo.gerenciadorDeEventos.publicar("cena-terminada", this);
    }
}
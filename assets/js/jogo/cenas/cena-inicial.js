class CenaInicial {

    constructor() {
        //console.log("CenaInicial: construtor")

        this.imagemGameStart = null;
        this.somDoInicio = null;
        this.font = null;
    }

    preload() {
        //console.log("CenaInicial: preload")
        this.somDoInicio = loadSound('assets/sounds/start-game.mp3');
        this.imagemGameStart = loadImage('assets/images/cenas/cena-inicio.png');
        this.font =jogo.configuracoes.font;
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
        this._exibeImagemDeFundo();
        this._exibeTexto();
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

    mousePressed(mouseX, mouseY) {
        //console.log("CenaInicial: mousePressed")
        jogo.gerenciadorDeEventos.publicar("cena-terminada", this);
    }

    _exibeImagemDeFundo() {
        image(this.imagemGameStart, 0, 0, width, height);
    }

    _exibeTexto() {
        textFont(this.font);

        let c = color('#bfa5c3');
        fill(c);

        textAlign(CENTER, CENTER);
        textSize(250);
        text("Se pica, Piroto!", width / 2, height / 2);

        textAlign(CENTER, TOP);
        textSize(50);
        text("Aperte qualquer botão para continuar", width / 2, height / 4);
    }
}
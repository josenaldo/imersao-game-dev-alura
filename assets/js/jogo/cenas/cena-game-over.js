class CenaGameOver {

    constructor() {
        //console.log("CenaGameOver: construtor");

        this.imagemGameOver = null;
        this.somDoGameOver = null;
        this.netx = null;
    }

    preload() {
        //console.log("CenaGameOver: preload");
        this.font =jogo.configuracoes.font;
        this.imagemGameOver = loadImage('assets/images/cenas/pause-overlay.png');
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
        this._exibeImagemDeFundo();
        this._exibeTexto();

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
            this.next = "cenaFase";
            jogo.gerenciadorDeEventos.publicar("cena-terminada", this);
        }

        if(key === 'Enter') {
            this.next = "cenaInicial";
            jogo.gerenciadorDeEventos.publicar("cena-terminada", this);
        }
    }

    mousePressed(mouseX, mouseY) {
        //console.log("CenaInicial: mousePressed")
        this.next = "cenaInicial";
        jogo.gerenciadorDeEventos.publicar("cena-terminada", this);
    }

    _exibeImagemDeFundo() {
        imageMode(CENTER)
        image(this.imagemGameOver,  width / 2, height / 2, width, height);
        imageMode(CORNER)
    }

    _exibeTexto() {
        textFont(this.font);

        let c = color('#1d091f');
        fill(c);

        textAlign(CENTER, CENTER);
        textSize(250);
        text("GAME OVER", width / 2, height / 2);

        textAlign(CENTER, TOP);
        textSize(50);
        text("Aperte P para voltar ao jogo ou Enter para voltar à tela inicial", width / 2, height / 4);
    }
}
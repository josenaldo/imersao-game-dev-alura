class CenaGameOver {

    constructor() {
        this.imagemGameOver = null;
        this.musica = null;
        this.netx = null;
    }

    preload() {
        this.font =jogo.configuracoes.font;
        this.imagemGameOver = loadImage('assets/images/cenas/pause-overlay-min.png');
        this.musica = loadSound('assets/sounds/game-over.mp3');
        this.musica.setVolume(jogo.configuracoes.volumeMusica);
    }

    setup() {
    }

    reset() {

    }

    draw() {
        this.musica.loop();
        this._exibeImagemDeFundo();
        this._exibeTexto();

        noLoop();
    }

    sceneEnd() {
        this.musica.stop();
        return this.next;
    }

    keyPressed(key) {
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
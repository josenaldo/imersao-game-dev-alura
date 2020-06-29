class CenaPause {

    constructor() {
        //console.log("CenaPause: construtor");

        this.imagemPause = null;
        this.netx = null;
    }

    preload() {
        //console.log("CenaPause: preload");
        this.font =jogo.configuracoes.font;
        this.imagemPause = loadImage('assets/images/cenas/pause-overlay.png');
    }

    setup() {
        //console.log("CenaPause: setup");
    }

    reset() {

    }

    draw() {
        //console.log("CenaPause: draw");
        this._exibeImagemDeFundo();
        this._exibeTexto();

        noLoop();
    }

    sceneEnd() {
        return this.next;
    }

    keyPressed(key) {
        //console.log("CenaPause: keyPressed");

        if(key === 'p') {
            this.next = "cenaFase";
            jogo.gerenciadorDeEventos.publicar("cena-terminada", this);
        }
    }

    mousePressed(mouseX, mouseY) {
        //console.log("CenaInicial: mousePressed")
        this.next = "cenaFase";
        jogo.gerenciadorDeEventos.publicar("cena-terminada", this);
    }

    _exibeImagemDeFundo() {
        imageMode(CENTER)
        image(this.imagemPause,  width / 2, height / 2, width, height);
        imageMode(CORNER)
    }

    _exibeTexto() {
        textFont(this.font);

        let c = color('#1d091f');
        fill(c);

        textAlign(CENTER, CENTER);
        textSize(250);
        text("PAUSE", width / 2, height / 2);

        textAlign(CENTER, TOP);
        textSize(50);
        text("Aperte P para voltar ao jogo", width / 2, height / 4);
    }
}
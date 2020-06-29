class CenaPause {

    constructor() {
        //console.log("CenaPause: construtor");

        this.imagemPause = null;
        this.netx = null;
    }

    preload() {
        //console.log("CenaPause: preload");
        this.imagemPause = loadImage('assets/images/telas/tela-pause.png');
    }

    setup() {
        //console.log("CenaPause: setup");
    }

    reset() {

    }

    draw() {
        //console.log("CenaPause: draw");
        image(this.imagemPause, 0, 0, width, height);
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
}
class GerenciadorDeCenas {

    constructor() {

        let cenaInicial = new CenaInicial();
        let cenaHistoria = new CenaHistoria();
        let cenaConfiguracao = new CenaConfiguracao();
        let cenaFase = new CenaFase();
        let cenaGameOver = new CenaGameOver();

        this.cenas = {
            cenaInicial: cenaInicial,
            cenaHistoria: cenaHistoria,
            cenaConfiguracao: cenaConfiguracao,
            cenaFase: cenaFase,
            cenaGameOver: cenaGameOver,
        }

        this.cenaAtual = 'cenaInicial';

    }

    preload() {
        //let sceneEndFunction = this.sceneEnd.bind(this);
        jogo.gerenciadorDeEventos.assinar("cena-terminada", this, "sceneEnd");

        Object.keys(this.cenas).forEach(key => {
            this.cenas[key].preload();
        });
    }

    setup() {
        Object.keys(this.cenas).forEach(key => {
            this.cenas[key].setup();
        });
    }

    draw() {
        this.cenas[this.cenaAtual].draw();
    }

    sceneEnd() {
        this.cenaAtual = this.cenas[this.cenaAtual].sceneEnd();
        this.cenas[this.cenaAtual].reset();
    }

    keyPressed(key) {
        this.cenas[this.cenaAtual].keyPressed(key);
    }

    mousePressed(mouseX, mouseY) {
        this.cenas[this.cenaAtual].mousePressed(mouseX, mouseY);
    }
}
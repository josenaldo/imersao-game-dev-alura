class Configuracoes {
    constructor() {

        this.debug = false;

        this.alturaDoChao = 120;
        this.velocidadeBase = 1;
        this.aceleracao = 0.01;

        this.frameRate = 48;

        this.chancesDeMoedas = 200;
        this.maximoDeMoedasNaTela = 1;
    }

    toggleDebug() {
        this.debug = !this.debug;
    }
}
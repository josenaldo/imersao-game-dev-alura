class Configuracoes {
    constructor() {

        this.debug = false;

        this.alturaDoChao = 150;
        this.velocidadeBase = 1;
        this.aceleracao = 0.01;

        this.frameRate = 48;

        this.chancesDeMoedas = 100;
        this.maximoDeMoedasNaTela = 1;

        this.fontePrincipal = 'assets/fonts/monsteramabold.ttf';
    }

    toggleDebug() {
        this.debug = !this.debug;
    }
}
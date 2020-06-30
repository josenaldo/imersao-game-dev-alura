class Configuracoes {
    constructor() {

        this.debug = false;

        this.alturaDoChao = 120;
        this.velocidadeBase = 1;
        this.aceleracao = 0.01;

        this.frameRate = 48;

        this.chancesDeMoedas = 100;
        this.maximoDeMoedasNaTela = 1;

        this.fontePrincipal = 'assets/fonts/monsteramabold.ttf';
        this.font = null;

        this.colisaoInimigoLigada = true;
        this.maximoDeVidas = 9;
        this.vidasIniciais = 3;
        this.tempoDeInvencibilidade = 3000;
    }

    preload() {
        this.font = loadFont(this.fontePrincipal);

    }
    toggleDebug() {
        this.debug = !this.debug;
    }

    toggleColisaoInimigo() {
        this.colisaoInimigoLigada = !this.colisaoInimigoLigada;
    }
}
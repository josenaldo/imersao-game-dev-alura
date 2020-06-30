class Configuracoes {
    constructor() {

        this.debug = false;
        this.colisaoInimigoLigada = true;


        this.alturaDoChao = 120;
        this.velocidadeBase = 1;
        this.aceleracao = 0.01;

        this.frameRate = 48;

        this.fontePrincipal = 'assets/fonts/monsteramabold.ttf';
        this.font = null;

        this.maximoDeVidas = 9;
        this.vidasIniciais = 3;
        this.tempoDeInvencibilidade = 3000;

        this.creuMaximo = 5;

        this.volumeMusica = 0.2;
        this.volumeEfeitos = 1;
        this.moedas = {
            tempoDeInvencibilidade: 5000,
            tempoDoPuloTriplo: 5000,
            sorte: 1,
            tempoParaProxima: 200,
            chanceTotal: 100,
            chanceNormal: 80,
            chancePuloTriplo: 5,
            chanceInvencibilidade: 10,
            chanceVida: 5,
            maximoDeMoedasNaTela: 1,

        }
    }

    preload(configMapa) {
        this.font = loadFont(this.fontePrincipal);
        this.configuracoesDeFases = configMapa.fases;
    }

    setup() {

    }

    toggleDebug() {
        this.debug = !this.debug;
    }

    toggleColisaoInimigo() {
        this.colisaoInimigoLigada = !this.colisaoInimigoLigada;
    }
}
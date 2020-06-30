class GerenciadorDeMoedas {
    constructor() {
        this.moedas = null;
        this.filaDeMoedas = null;
    }

    preload() {
        this.imagemMoeda = loadImage('assets/images/moedas/moeda.png');
        this.imagemMoedaVida = loadImage('assets/images/moedas/moeda-vida.png');
        this.imagemMoedaInvencibilidade = loadImage('assets/images/moedas/moeda-invencibilidade.png');
        this.imagemMoedaPuloTriplo = loadImage('assets/images/moedas/moeda-pulo-triplo.png');
        this.somDaMoeda = loadSound('assets/sounds/moeda.mp3');
    }

    setup() {

        this.velocidadeMaxima = 15;
        this.velocidadeMinima = 10;
        this.alturaMaxima = 700;
        this.alturaMinima = 100;
        this.delayMinimo = 0;
        this.delayMaximo = 500;
        this.aceleracao = 0;
        this.moedas = [];
        this.cronometroDeMoeda = jogo.configuracoes.moedas.tempoParaProxima;

        this.filaDeMoedas = [];

        this.moedaNormal = new Moeda(this.imagemMoeda, this.somDaMoeda,
            width, 0, 100, 100, 100, 100, 14,1,
            0,
            0,'normal'
        );
        this.moedaNormal = this.resetMoeda(this.moedaNormal)
        for(let i = 0; i < jogo.configuracoes.moedas.chanceNormal; i++) {
            this.moedas.push(this.moedaNormal)
        }

        this.moedaVida = new Moeda(this.imagemMoedaVida, this.somDaMoeda,
            width, 0, 100, 100, 100, 100, 14,1,
            0,
            0,'moeda-vida'
        );
        this.moedaVida = this.resetMoeda(this.moedaVida)
        for(let i = 0; i < jogo.configuracoes.moedas.chanceVida; i++) {
            this.moedas.push(this.moedaVida)
        }

        this.moedaPuloTriplo = new Moeda(this.imagemMoedaPuloTriplo, this.somDaMoeda,
            width, 0, 100, 100, 100, 100, 14,1,
            0,
            0,'moeda-pulo-triplo'
        );
        this.moedaPuloTriplo = this.resetMoeda(this.moedaPuloTriplo)
        for(let i = 0; i < jogo.configuracoes.moedas.chancePuloTriplo; i++) {
            this.moedas.push(this.moedaPuloTriplo)
        }

        this.moedaInvencibilidade = new Moeda(this.imagemMoedaInvencibilidade, this.somDaMoeda,
            width, 0, 100, 100, 100, 100, 14,1,
            0,
            0,'moeda-invencibilidade'
        );
        this.moedaInvencibilidade = this.resetMoeda(this.moedaInvencibilidade)
        for(let i = 0; i < jogo.configuracoes.moedas.chanceInvencibilidade; i++) {
            this.moedas.push(this.moedaInvencibilidade)
        }

    }

    getMoeda(altura, velocidade, delay) {
        return new Moeda(
            this.imagemMoeda,
            this.somDaMoeda,
            width,
            altura,
            100,
            100,
            100,
            100,
            14,
            1,
            velocidade * jogo.configuracoes.velocidadeBase,
            delay
        );
    }

    resetMoeda(moeda) {
        moeda.randomizeY(this.alturaMinima, this.alturaMaxima);
        moeda.randomizeVelocidade(this.velocidadeMinima, this.velocidadeMaxima);
        moeda.randomizeDelay(this.delayMinimo, this.delayMaximo);

        return moeda;
    }

    getMoedaAleatorio() {


        let chances = jogo.configuracoes.moedas.chanceTotal / jogo.configuracoes.moedas.sorte;

        let sorteio = parseInt(Math.floor(Math.random() * Math.floor(chances)));

        let num = sorteio % chances;

        if ( num < jogo.configuracoes.moedas.chanceTotal ) {

            let moeda = this.moedas[num];

            moeda.x = width;
            moeda.randomizeY(this.alturaMinima, this.alturaMaxima);
            moeda.randomizeVelocidade(this.velocidadeMinima, this.velocidadeMaxima);
            moeda.randomizeDelay(this.delayMinimo, this.delayMaximo);

            return moeda;
        } else {
            return null;
        }
    }

    // TODO: mudar esse metodo exibe para draw
    draw() {

        this.cronometroDeMoeda--;

        // se inimigos em tela < 2
        if (this.cronometroDeMoeda <= 0 && this.filaDeMoedas.length < jogo.configuracoes.moedas.maximoDeMoedasNaTela) {
            this.cronometroDeMoeda = jogo.configuracoes.moedas.tempoParaProxima;
            let moeda = this.getMoedaAleatorio();
            if (moeda) {
                this.filaDeMoedas.push(moeda);
            }
        }

        // exibe e move os inimigos
        let moedaEmJogo;

        for (let i = 0, n = this.filaDeMoedas.length; i < n; ++i) {
            moedaEmJogo = this.filaDeMoedas[i];
            moedaEmJogo.draw();
            moedaEmJogo.move();
        }

        for (let i = this.filaDeMoedas.length - 1; i >= 0; i--) {
            moedaEmJogo = this.filaDeMoedas[i];

            if (moedaEmJogo.estaForaDaTela() || moedaEmJogo.isColetada()) {
                this.filaDeMoedas.splice(i, 1);
                moedaEmJogo.libera();
            }
        }
    }

    estaColidindo(personagem) {
        let estaProximo;

        for (let i = 0, n = this.filaDeMoedas.length; i < n; ++i) {
            var moeda = this.filaDeMoedas[i];

            //TODO: Fazer algum efeito quando o piroto completar uma palavra.
            estaProximo = moeda.x < (personagem.x + personagem.largura/2 + 20);

            if (estaProximo && personagem.estaColidindo(moeda)) {
                jogo.gerenciadorDeEventos.publicar("colidiu-com-moeda", this);
                moeda.pegou(personagem);
                break;
            }
        }
    }

}
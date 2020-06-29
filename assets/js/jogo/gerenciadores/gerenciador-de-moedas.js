class GerenciadorDeMoedas {
    constructor() {
        this.moedas = null;
        this.filaDeMoedas = null;
    }

    preload() {
        this.imagemMoeda = loadImage('assets/images/items/moeda.png');
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
        this.filaDeMoedas = [];
        this.sorte = 1;

        let moeda;
        for (let i = 0; i < jogo.configuracoes.maximoDeMoedasNaTela; i++) {
            moeda = this.getMoeda(0 , 0, 0);
            moeda = this.resetMoeda(moeda)
            this.moedas.push(moeda);
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
        console.log("Gerando moeda aleatoria");

        let chances = jogo.configuracoes.chancesDeMoedas / this.sorte;

        let sorteio = parseInt(Math.floor(Math.random() * Math.floor(chances)));

        if (sorteio % chances == 0) {

            let moeda = this.moedas.pop();

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

        // se inimigos em tela < 2
        if (this.filaDeMoedas.length < jogo.configuracoes.maximoDeMoedasNaTela) {
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
                this.moedas.push(moedaEmJogo);
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
                moeda.pegou();
                break;
            }
        }
    }

}
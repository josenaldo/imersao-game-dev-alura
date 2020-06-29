class GerenciadorDeInimigos {

    constructor() {

        this.inimigos = Array();

        this.imagemInimigoChifrus = null;
        this.inimgoChifrus = null;

        this.imagemInimigoChifrusDark = null;
        this.inimgoChifrusDark = null;

        this.imagemInimigoBatus = null;
        this.inimgoBatus = null;

        this.inimigos = null;

        this.filaDeInimigos = null;

    }

    preload() {
        this.imagemInimigoChifrus = loadImage('assets/images/inimigos/chifrus.png');
        this.imagemInimigoChifrusDark = loadImage('assets/images/inimigos/chifrus-dark.png');
        this.imagemInimigoBatus = loadImage('assets/images/inimigos/batus.png');
    }

    setup() {

        this.maximoDeInimigosNaTela = 1;
        this.velocidadeMaxima = 15;
        this.velocidadeMinima = 10;

        this.alturaMaxima = 600;
        this.alturaMinima = 100;

        this.delayMinimo = 0;
        this.delayMaximo = 500;
        this.aceleracao = 1.5;

        this.alturaDoChao = jogo.configuracoes.alturaDoChao;

        this.inimigos = [];

        this.inimigos.push(this.getChifrus(0, 0))
        this.inimigos.push(this.getChifrusDark(0,0))
        this.inimigos.push(this.getBatus(0,0,0))
        this.filaDeInimigos = [];
    }

    aumentaDificuldade() {
        this.maximoDeInimigosNaTela++;
        this.delayMaximo = this.delayMaximo + 500;
        this.velocidadeMaxima = this.velocidadeMaxima + this.aceleracao;
    }

    getChifrus(velocidade, delay) {
        return new Inimigo(
            this.imagemInimigoChifrus,
            width,
            height - this.alturaDoChao - 109,
            105,
            109,
            315,
            329,
            4,
            7,
            velocidade * jogo.configuracoes.velocidadeBase,
            delay
        );
    }

    getChifrusDark(velocidade, delay) {
        return new Inimigo(
            this.imagemInimigoChifrusDark,
            width,
            height - this.alturaDoChao - 157,
            157,
            163,
            315,
            329,
            4,
            7,
            velocidade * jogo.configuracoes.velocidadeBase,
            delay);
    }

    getBatus(velocidade, delay, altura) {

        return new Inimigo(this.imagemInimigoBatus,
            width,
            altura,
            200,
            125,
            401,
            249,
            3,
            2,
            velocidade * jogo.configuracoes.velocidadeBase,
            delay,
            true);
    }

    getInimigoAleatorio() {
        console.log("Gerando novo inimigo aleatorio");

        let numeroInimigo = Math.floor(Math.random() * Math.floor(3));

        let inimigo = this.inimigos[numeroInimigo];

        inimigo.x = width;
        inimigo.randomizeY(this.alturaMinima, this.alturaMaxima);
        inimigo.randomizeVelocidade(this.velocidadeMinima, this.velocidadeMaxima);
        inimigo.randomizeDelay(this.delayMinimo, this.delayMaximo);

        return inimigo;
    }

    draw() {

        // se inimigos em tela < 2
        if (this.filaDeInimigos.length < this.maximoDeInimigosNaTela) {
            let inimigo = this.getInimigoAleatorio();
            this.filaDeInimigos.push(inimigo);
        }

        // exibe e move os inimigos
        let inimigoEmJogo;
        for (let i = 0, n = this.filaDeInimigos.length; i < n; ++i) {
            inimigoEmJogo = this.filaDeInimigos[i];
            inimigoEmJogo.draw();
            inimigoEmJogo.move();
        }

        for (let i = this.filaDeInimigos.length - 1 ; i >= 0 ; i--) {
            inimigoEmJogo = this.filaDeInimigos[i];
            if(inimigoEmJogo.estaForaDaTela()) {
                this.filaDeInimigos.splice(i,1);
            }
        }
    }

    estaColidindo(personagem) {
        for (let i = 0, n = this.inimigos.length; i < n; ++i) {
            var inimigo = this.inimigos[i];

            // TODO: Fazer o piroto piscar se acontecer uma colisão
            // TODO: Tocar um som de porrada na hora da colisão
            // TODO: Diminuir a vida do Piroto e só dar game over quando a vida chegar ao fim
            // TODO: Tocar musica de game over
            if (personagem.estaColidindo(inimigo)) {
                jogo.gerenciadorDeEventos.publicar("colidiu-com-inimigo", this);
                break;
            }
        }
    }
}
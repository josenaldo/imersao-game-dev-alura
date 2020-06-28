class GeradorDeInimigos{

    constructor() {
        this.inimigos = Array();

        this.imagemInimigoChifrus = null;
        this.inimgoChifrus = null;

        this.imagemInimigoChifrusDark = null;
        this.inimgoChifrusDark = null;

        this.imagemInimigoBatus = null;
        this.inimgoBatus = null;

        this.inimigos = null;

    }

    preload(){
        this.imagemInimigoChifrus = loadImage('assets/images/inimigos/chifrus.png');
        this.imagemInimigoChifrusDark = loadImage('assets/images/inimigos/chifrus-dark.png');
        this.imagemInimigoBatus = loadImage('assets/images/inimigos/batus.png');
    }

    setup() {
        this.inimigos = Array();
        this.maximoDeInimigosNaTela = 1;
        this.velocidadeMaxima = 15;
        this.velocidadeMinima = 10;

        this.alturaMaxima = 600;
        this.alturaMinima = 100;

        this.delayMaximo = 500;
        this.aceleracao = 1.5;

        this.alturaDoChao = game.getAlturaDoChao();
    }

    aumentaDificuldade() {
        this.maximoDeInimigosNaTela++;
        this.delayMaximo = this.delayMaximo + 500;
        this.velocidadeMaxima = this.velocidadeMaxima + this.aceleracao;
        console.log("Aumentando inimigos na tela para: " + this.maximoDeInimigosNaTela);
        console.log("Velocidade máxima aumentando para: " + this.velocidadeMaxima);
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
            velocidade * game.getVelocidadeBase(),
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
            velocidade * game.getVelocidadeBase(),
            delay);
    }

    getBatus(velocidade, delay) {
        let altura = Math.random() * (this.alturaMaxima - this.alturaMinima) + this.alturaMinima;

        return new Inimigo(this.imagemInimigoBatus,
            width,
            altura,
            200,
            125,
            401,
            249,
            3,
            2,
            velocidade * game.getVelocidadeBase(),
            delay);
    }

    getInimigoAleatorio() {
        let numeroInimigo = Math.floor(Math.random() * Math.floor(3));
        let velocidade = Math.random() * (this.velocidadeMaxima - this.velocidadeMinima) + this.velocidadeMinima;
        let delay = Math.floor(Math.random() * Math.floor(this.delayMaximo));
        switch(numeroInimigo){
            case 0:
                return this.getChifrus(velocidade, delay);
            case 1:
                return this.getChifrusDark(velocidade, delay);
            case 2:
                return this.getBatus(velocidade, delay);
            default:
                return this.getChifrus(velocidade, delay);
        }
    }

    exibe(){

        // se inimigos em tela < 2
        if(this.inimigos.length < this.maximoDeInimigosNaTela) {
            let inimigo = this.getInimigoAleatorio();
            this.inimigos.push(inimigo);
        }

        // exibe e move os inimigos
        let inimigoEmJogo;
        for (let i = 0; i < this.inimigos.length; ++i) {
            inimigoEmJogo = this.inimigos[i];
            inimigoEmJogo.exibe();
            inimigoEmJogo.move();
        }

        this.inimigos = this.inimigos.filter(function(inimigo, index, arr){ return !inimigo.estaForaDaTela();});

    }

    estaColidindo(personagem) {
        for (var i = 0; i < this.inimigos.length; ++i) {
            var inimigo = this.inimigos[i];
    
            // TODO: Fazer o piroto piscar se acontecer uma colisão
            // TODO: Tocar um som de porrada na hora da colisão
            // TODO: Diminuir a vida do Piroto e só dar game over quando a vida chegar ao fim
            // TODO: Tocar musica de game over
            if (personagem.estaColidindo(inimigo)) {
                game.setStateGameOver();
                break;
            }
        }
    }
}
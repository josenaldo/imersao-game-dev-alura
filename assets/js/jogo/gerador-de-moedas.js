class GeradorDeMoedas {
    constructor() {
        this.moedas = null;
    }

    preload(){
        this.imagemMoeda = loadImage('assets/images/items/moeda.png');
    }

    setup() {

        this.moedas = [];
        this.maximoDeMoedasNaTela = 2;
        this.velocidadeMaxima = 15;
        this.velocidadeMinima = 10;
        this.alturaMaxima = 700;
        this.alturaMinima = 100;
        this.delayMaximo = 500;
        this.aceleracao = 0;
        this.chances = 50;
    }


    getMoeda(altura, velocidade, delay) {
        return new Moeda(
            this.imagemMoeda,
            width,
            altura,
            100,
            100,
            100,
            100,
            14,
            1,
            velocidade * game.getVelocidadeBase(),
            delay
        );
    }

    getMoedaAleatorio() {
        let numero = Math.floor(Math.random() * Math.floor(this.chances));


        if(numero % this.chances == 0){
            let velocidade = Math.random() * (this.velocidadeMaxima - this.velocidadeMinima) + this.velocidadeMinima;
            let delay = Math.floor(Math.random() * Math.floor(this.delayMaximo));
            let altura = Math.random() * (this.alturaMaxima - this.alturaMinima) + this.alturaMinima;

            return this.getMoeda(altura, velocidade, delay);
        }else {
            return null;
        }
    }

    exibe(){

        // se inimigos em tela < 2
        if(this.moedas.length < this.maximoDeMoedasNaTela) {
            let moeda = this.getMoedaAleatorio();
            if(moeda) {
                this.moedas.push(moeda);
            }
        }

        // exibe e move os inimigos
        let moedaEmJogo;

        for (let i = 0; i < this.moedas.length; ++i) {
            moedaEmJogo = this.moedas[i];
            moedaEmJogo.exibe();
            moedaEmJogo.move();
        }


        this.moedas = this.moedas.filter(function(moeda, index, arr){ return !moeda.estaForaDaTela() && !moeda.isColetada();});

    }

    estaColidindo(personagem) {
        for (var i = 0; i < this.moedas.length; ++i) {
            var moeda = this.moedas[i];
    
            // TODO: Fazer o piroto piscar se acontecer uma colisão
            // TODO: Tocar um som de porrada na hora da colisão
            // TODO: Diminuir a vida do Piroto e só dar game over quando a vida chegar ao fim
            // TODO: Tocar musica de game over
            if (personagem.estaColidindo(moeda)) {
                console.log("Pegou moeda")
                game.pegouMoeda();
                moeda.pegou();
                break;
            }
        }
    }

}
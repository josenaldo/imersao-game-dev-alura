// TODO: Colocar a pontuacao no HuD
// TODO: Adicionar pontuação das letras
class Pontuacao {
    constructor() {
        this.palavra = null;
        this.wordDashes = null;
        this.setup();
    }

    getNomeAleatorio (){
        let item = NOMES_DO_CAPETA[Math.floor(Math.random() * NOMES_DO_CAPETA.length)];
        return item;
    };

    getWordDashes () {
        return this.wordDashes.join("");
    }

    setup() {
        this.resetNomeDoCapeta();
        this.pontos = 0;
        this.creu = 1;
        this.marcos = [200, 400, 600, 800];
    }

    resetNomeDoCapeta() {
        this.palavra = this.getNomeAleatorio();
        this.wordDashes = [];
        this.wordDashes = "_".repeat(this.palavra.length).split("")
        this.contadorDeMoedas = 0;
    }


    exibe(){
        fill("#a078a5");
        textAlign(RIGHT);
        textStyle(BOLD);
        textFont("Roboto")
        textSize(50);

        text("Pontos: " + parseInt(this.pontos), width-10, 50);
        text("Créu: " + this.creu, width-10, 100);
        text("Nome do capeta: " + this.getWordDashes(), width-10, 150);
    }

    adicionarPontos(pontuacao){
        this.pontos = this.pontos + pontuacao;
        this.verificaMarco();
    }

    pontuarPorDistancia(){
        this.pontos = this.pontos + 0.2;
        this.verificaMarco();
    }

    pegouMoeda() {
        this.wordDashes[this.contadorDeMoedas] = this.palavra[this.contadorDeMoedas];
        this.contadorDeMoedas++;

        if(this.getWordDashes() === this.palavra) {
            this.pontos += this.palavra.length * 100;
            console.log("CONSEGUIU: " + this.palavra);
            this.resetNomeDoCapeta();
        }

    }

    verificaMarco(){
        let novoMarco;

        if(this.pontos >= this.marcos[0]){
            game.aumentaDificuldade();
            this.marcos.shift();
            this.creu++;
            novoMarco = this.marcos[this.marcos.length -1] * 2;
        }
    }

    getPontos() {
        return parseInt(this.pontos);
    }
}
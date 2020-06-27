// TODO: Colocar a pontuacao no HuD
// TODO: Adicionar pontuação das letras
class Pontuacao {
    constructor() {
        this.reset();
    }

    reset() {
        this.pontos = 0;
        this.creu = 1;
        this.marcos = [200, 400, 600, 800];
    }

    exibe(){
        fill("#a078a5");
        textAlign(RIGHT);
        textStyle(BOLD);
        textFont("Roboto")
        textSize(50);

        text("Pontos: " + parseInt(this.pontos), width-10, 50);
        text("Créu: " + this.creu, width-10, 100);
    }

    adicionarPontos(pontuacao){
        this.pontos = this.pontos + pontuacao;
        this.verificaMarco();
    }

    pontuarPorDistancia(){
        this.pontos = this.pontos + 0.2;
        this.verificaMarco();
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
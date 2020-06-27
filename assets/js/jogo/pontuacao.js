// TODO: Colocar a pontuacao no HuD
// TODO: Adicionar pontuação das letras
class Pontuacao {
    constructor() {
        this.pontos = 0;
    }

    exibe(){
        fill("#a078a5");
        textAlign(RIGHT);
        textStyle(BOLD);
        textFont("Roboto")
        textSize(50);

        text(parseInt(this.pontos), width-10, 50);
    }

    adicionarPontos(pontuacao){
        this.pontos = this.pontos + pontuacao;
    }

    pontuarPorDistancia(){
        this.pontos = this.pontos + 0.2;
    }

    getPontos() {
        return parseInt(this.pontos);
    }
}
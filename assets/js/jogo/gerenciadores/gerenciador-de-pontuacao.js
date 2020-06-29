// TODO: Colocar a pontuacao no HuD
// TODO: Adicionar pontuação das letras
// TODO: Adicionar barulho da moeda
// TODO: A cada moeda, liberar uma letra aleatoria do nome capeta
// TODO: Ao pegar uma moeda, aumentar pontuação
// TODO: Ao pegar todas as moedas, encerrar a fase e começar outra
// TODO: Tocar um som ao pegar um nome completo
// TODO: Animar o nome completo
// TODO: Mostrar lista de palavras recuperadas no gameover
// TODO: Salvar lista de palavras recuperadas entre cada partida
// TODO: Eliminar palavras recuperadas da lista de palavras
// TODO: Mostrar pontuação total do usuário
class GerenciadorDePontuacao {
    constructor() {

        this.palavra = null;
        this.wordDashes = null;
        this.pontuacaoPorDistanciaInicial = 0.25;
    }

    preload() {
        jogo.gerenciadorDeEventos.assinar("colidiu-com-moeda", this, "pegouMoeda");
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
        this.pontuacaoPorPalavra = 100;
        this.pontuacaoPorDistancia = this.pontuacaoPorDistanciaInicial;

    }

    resetNomeDoCapeta() {
        this.palavra = this.getNomeAleatorio();
        this.wordDashes = [];
        this.wordDashes = "_".repeat(this.palavra.length).split("")
        this.contadorDeMoedas = 0;
    }


    draw(){
        fill("#a078a5");
        textAlign(RIGHT);
        textStyle(BOLD);
        textFont("Roboto")
        textSize(50);

        text("Pontos: " + parseInt(this.pontos), width-10, 50);
        text("Créu: " + this.creu, width-10, 100);
        text(this.getWordDashes(), width-10, 150);
    }

    adicionarPontos(pontuacao){
        this.pontos = this.pontos + pontuacao;
        this.verificaMarco();
    }

    // TODO Adicionar powerUp que dá mais pontuacao por distancia
    pontuarPorDistancia(){
        this.pontos = this.pontos + this.pontuacaoPorDistancia;
        this.verificaMarco();
    }

    pegouMoeda() {
        this.wordDashes[this.contadorDeMoedas] = this.palavra[this.contadorDeMoedas];
        this.contadorDeMoedas++;

        if(this.getWordDashes() === this.palavra) {
            this.pontos += this.palavra.length * this.pontuacaoPorPalavra;
            this.resetNomeDoCapeta();
        }

    }

    verificaMarco(){
        let novoMarco;

        if(this.pontos >= this.marcos[0]){
            //TODO Avisa que chegou em marco
            this.marcos.shift();
            this.creu++;
            novoMarco = this.marcos[this.marcos.length -1] * 2;
            this.pontuacaoPorPalavra = this.pontuacaoPorPalavra * 2;
            jogo.gerenciadorDeEventos.publicar("atingiu-marco-de-pontuacao", this);
        }
    }

    getPontos() {
        return parseInt(this.pontos);
    }
}
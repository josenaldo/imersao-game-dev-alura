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
        this.font = null;
        this.nomesCompletados = 0;
    }

    preload() {
        this.font = loadFont(jogo.configuracoes.fontePrincipal);

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
        this.marcos = [10, 25, 50, 100, 200, 500];
        this.pontuacaoPorPalavra = 100;
        this.pontuacaoPorDistancia = this.pontuacaoPorDistanciaInicial;
        this.nomesCompletados = 0;
    }

    resetNomeDoCapeta() {
        this.palavra = this.getNomeAleatorio();
        this.wordDashes = [];
        this.wordDashes = "_".repeat(this.palavra.length).split("")
        this.contadorDeMoedas = 0;
    }


    draw(){
        fill("#a078a5");
        textFont(this.font);

        textSize(40);

        textAlign(LEFT);
        text("Créu: " + this.creu, 10, 50);
        text("Invocados: " + this.nomesCompletados, 10, 100);


        textAlign(CENTER);
        text(this.getWordDashes(), width/2, 50);

        textAlign(RIGHT);
        text("Score: " + parseInt(this.pontos), width-10, 50);

    }

    adicionarPontos(pontuacao){
        this.pontos = this.pontos + pontuacao;
        this.verificaMarco();
    }

    // TODO Adicionar powerUp que dá mais pontuacao por distancia
    pontuarPorDistancia(){
        this.pontos = this.pontos + this.pontuacaoPorDistancia;

    }

    pegouMoeda() {
        this.wordDashes[this.contadorDeMoedas] = this.palavra[this.contadorDeMoedas];
        this.contadorDeMoedas++;

        if(this.getWordDashes() === this.palavra) {
            this.pontos += this.palavra.length * this.pontuacaoPorPalavra;
            this.nomesCompletados++;
            this.resetNomeDoCapeta();
            this.verificaMarco();
        }

    }

    verificaMarco(){
        let novoMarco;

        if(this.nomesCompletados >= this.marcos[0]){
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
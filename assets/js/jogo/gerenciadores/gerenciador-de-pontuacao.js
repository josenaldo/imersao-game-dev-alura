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
        this.listaNomesCompletados = [];
        this.ultimoEncontrado = null;
        this.exibePuloTriplo = false;
        this.exibeInvencibilidade = false;
    }

    preload() {
        this.font = loadFont(jogo.configuracoes.fontePrincipal);
        this.imagemMoedaInvencibilidade = loadImage('assets/images/moedas/hud-invencibilidade.png');
        this.imagemMoedaPuloTriplo = loadImage('assets/images/moedas/hud-pulo-triplo.png');

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
        this.resetPalavra();
        this.pontuacaoPorPalavra = 100;
        this.pontuacaoPorDistancia = this.pontuacaoPorDistanciaInicial;
        this.pontos = 0;
        this.creu = 1;
        this.ultimoInvocado = "";

    }

    novaFase(fase) {

        this.marcos = fase.getMarcos();
        this.contadorDeMarcos = 0;
        this.nomesCompletados = 0;
    }

    resetPalavra() {
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
        text("Invocados: " + this.listaNomesCompletados.length, 10, 100);
        text("Último Invocado: " + this.ultimoInvocado, 10, 150);


        textAlign(CENTER);
        text(this.getWordDashes(), width/2, 50);

        textAlign(RIGHT);
        text("Score: " + parseInt(this.pontos), width-10, 50);

        if(this.exibeInvencibilidade){
            image(
                this.imagemMoedaInvencibilidade,
                width - 100,
                height - 100,
                60,
                70
            );
        }

        if(this.exibePuloTriplo){
            image(
                this.imagemMoedaPuloTriplo,
                width - 180,
                height - 100,
                60,
                70
            );
        }

    }

    adicionarPontos(pontuacao){
        this.pontos = this.pontos + pontuacao;
        this.verificaMarco();
    }

    // TODO Adicionar powerUp que dá mais pontuacao por distancia
    pontuarPorDistancia(){
        this.pontos = this.pontos + this.pontuacaoPorDistancia;
    }

    pegouMoeda(moeda) {
        this.wordDashes[this.contadorDeMoedas] = this.palavra[this.contadorDeMoedas];
        this.contadorDeMoedas++;

        if(moeda.ePowerup()){
            if(moeda.tipo === "moeda-invencibilidade"){
                this.exibeInvencibilidade = true;
                setTimeout(() => {
                    this.exibeInvencibilidade = false;
                }, jogo.configuracoes.moedas.tempoDeInvencibilidade);
            }else if(moeda.tipo === "moeda-pulo-triplo"){
                this.exibePuloTriplo = true;
                setTimeout(() => {
                    this.exibePuloTriplo = false;
                }, jogo.configuracoes.moedas.tempoDoPuloTriplo);
            }
        };

        if(this.getWordDashes() === this.palavra) {
            this.pontos += this.palavra.length * this.pontuacaoPorPalavra;
            this.nomesCompletados++;
            this.ultimoInvocado = this.palavra;
            this.listaNomesCompletados.push(this.palavra);

            this.resetPalavra();
            this.verificaMarco();
        }
    }

    verificaMarco(){
        let novoMarco;

        if(this.nomesCompletados >= this.marcos[this.contadorDeMarcos]){
            //TODO Avisa que chegou em marco
            this.contadorDeMarcos++;
            this.creu++;

            if(this.creu > jogo.configuracoes.creuMaximo){
                this.creu = jogo.configuracoes.creuMaximo;
            }else{
                this.pontuacaoPorPalavra = this.pontuacaoPorPalavra * 2;
                jogo.gerenciadorDeEventos.publicar("aumentou-creu", this);
            }

            if(this.contadorDeMarcos >= this.marcos.length) {
                jogo.gerenciadorDeEventos.publicar("acabou-a-fase", this);
            }
        }
    }

    getPontos() {
        return parseInt(this.pontos);
    }
}
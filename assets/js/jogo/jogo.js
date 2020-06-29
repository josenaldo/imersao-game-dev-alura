class Jogo {
    constructor() {

        this.gerenciadorDeCenas = new GerenciadorDeCenas();
        this.gerenciadorDeEventos = new GerenciadorDeEventos();
        this.gerenciadorDePontuacao = new GerenciadorDePontuacao();

        this.configuracoes = new Configuracoes();
    }

    preload() {
        this.gerenciadorDeCenas.preload();
        this.gerenciadorDePontuacao.preload();
    }

    setup() {
        this.gerenciadorDeCenas.setup();
    }

    /** Desenha o jogo, a cada iteração do game loop */
    draw() {
        this.gerenciadorDeCenas.draw();
    }

    keyPressed(key) {

        if(key == 'd') {
            this.configuracoes.toggleDebug();
        }

        this.gerenciadorDeCenas.keyPressed(key);
    }

    mousePressed(mouseX, mouseY) {
        this.gerenciadorDeCenas.mousePressed(mouseX, mouseY);
    }

    pegouMoeda() {
        this.pontuacao.pegouMoeda();
    }

    aumentaDificuldade() {
        //console.log("Aumentou a dificuldade: " + this.pontuacao.getPontos())
        this.geradorDeInimigos.aumentaDificuldade();
        this.velocidadeBase = this.velocidadeBase + this.aceleracao;
    }

}
class Jogo {
    constructor() {

        this.gerenciadorDeCenas = new GerenciadorDeCenas();
        this.gerenciadorDeEventos = new GerenciadorDeEventos();
        this.gerenciadorDePontuacao = new GerenciadorDePontuacao();
        this.configuracoes = new Configuracoes();
    }

    preload(configMapa) {
        this.configuracoes.preload(configMapa);
        this.gerenciadorDeCenas.preload();
        this.gerenciadorDePontuacao.preload();
    }

    setup() {
        this.configuracoes.setup();
        this.gerenciadorDeCenas.setup();
    }

    /** Desenha o jogo, a cada iteração do game loop */
    draw() {
        this.gerenciadorDeCenas.draw();
    }

    keyPressed(key) {

        if(key == 'd') {
            this.configuracoes.toggleDebug();
        }else if(key == 'c') {
            this.configuracoes.toggleColisaoInimigo();
        }

        this.gerenciadorDeCenas.keyPressed(key);
    }

    mousePressed(mouseX, mouseY) {
        this.gerenciadorDeCenas.mousePressed(mouseX, mouseY);
    }

}
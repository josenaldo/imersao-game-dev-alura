class CenaFase {

    constructor() {
        //console.log("CenaFase: construtor");

        this.gerenciadorDePontuacao = null;

        // Cenário jogo rodando
        this.imagemCenarioCeu = null;
        this.imagemCenarioMontanhas = null;
        this.imagemCenarioArvores = null;
        this.imagemCenarioChao = null;
        this.cenarioCeu = null;
        this.cenarioMontanhas = null;
        this.cenarioArvores = null;
        this.cenarioChao = null;

        // Cenário pause
        this.imagemPause = null;
        this.pause = false;

        // Personagem
        this.imagemPersonagem = null;
        this.personagem = null;

        //Inimigos
        this.gerenciadorDeInimigos = null;
        this.gerenciadorDeMoedas = null;

        //Sons
        this.somDoJogo = null;

        // TODO colocar o som do pulo no personagem
        this.somDoPulo = null;

        this.pausado = false;
    }

    preload() {
        //console.log("CenaFase: preload");

        this.imagemCenarioCeu = loadImage('assets/images/cenario/cenario-ceu.png');
        this.imagemCenarioMontanhas = loadImage('assets/images/cenario/cenario-montanhas.png');
        this.imagemCenarioArvores = loadImage('assets/images/cenario/cenario-arvores.png');
        this.imagemCenarioChao = loadImage('assets/images/cenario/cenario-chao.png');

        this.somDoJogo = loadSound('assets/sounds/running-1.mp3');
        this.somDoPulo = loadSound('assets/sounds/pulo.wav');

        this.imagemPersonagem = loadImage('assets/images/personagem/piroto.png');

        this.gerenciadorDeInimigos = new GerenciadorDeInimigos();
        this.gerenciadorDeInimigos.preload();

        this.gerenciadorDeMoedas = new GerenciadorDeMoedas();
        this.gerenciadorDeMoedas.preload();

        this.gerenciadorDePontuacao = jogo.gerenciadorDePontuacao;

    }

    setup() {
        //console.log("CenaFase: setup")
        this.cenarioCeu = new Cenario(this.imagemCenarioCeu, 4);
        this.cenarioMontanhas = new Cenario(this.imagemCenarioMontanhas, 6);
        this.cenarioArvores = new Cenario(this.imagemCenarioArvores, 8);
        this.cenarioChao = new Cenario(this.imagemCenarioChao, 10);

        this.personagem = new Personagem(
            this.imagemPersonagem, this.somDoPulo, 50,
            jogo.configuracoes.alturaDoChao,
            210, 252, 420, 504, 4, 4);

        jogo.gerenciadorDeEventos.assinar("colidiu-com-inimigo", this, "colidiuComInimigo");

        this.gerenciadorDeMoedas.setup();
        this.gerenciadorDeInimigos.setup();
        this.gerenciadorDePontuacao.setup();
    }

    reset() {

        if (!this.pause) {
            clear();

            this.cenarioCeu.reset();
            this.cenarioMontanhas.reset();
            this.cenarioArvores.reset();
            this.cenarioChao.reset();

            this.personagem.reset();

            this.gerenciadorDeMoedas.setup();
            this.gerenciadorDeInimigos.setup();
            this.gerenciadorDePontuacao.setup();
            this.pause = false;

        }
        this.somDoJogo.loop();
        loop();

    }

    draw() {
        //console.log("CenaFase: draw")
        this.cenarioCeu.move();
        this.cenarioCeu.draw();
        this.cenarioMontanhas.move();
        this.cenarioMontanhas.draw();
        this.cenarioArvores.move();
        this.cenarioArvores.draw();
        this.cenarioChao.move();
        this.cenarioChao.draw();

        this.gerenciadorDeMoedas.estaColidindo(this.personagem);
        this.gerenciadorDeMoedas.draw();

        this.personagem.draw();

        this.gerenciadorDePontuacao.pontuarPorDistancia();
        this.gerenciadorDePontuacao.draw();

        this.gerenciadorDeInimigos.estaColidindo(this.personagem);
        this.gerenciadorDeInimigos.draw();

    }

    sceneEnd() {
        //console.log("CenaFase: sceneEnd");
        this.somDoJogo.stop();
        if (this.pause) {
            return "cenaPause";
        }

        return "cenaGameOver";
    }

    colidiuComInimigo() {
        //console.log("COLIDIU")
        this.pause = false;
        jogo.gerenciadorDeEventos.publicar("cena-terminada", this);
    }

    keyPressed(key) {

        //console.log("CenaFase: keyPressed");
        if (key === 'ArrowUp') {
            this.personagem.pula();
        }
        if (key === 'p' || key === 'P') {
            this.pause = true;
            jogo.gerenciadorDeEventos.publicar("cena-terminada", this);
        }

    }

    mousePressed(mouseX, mouseY) {
        if (mouseButton === LEFT) {
            this.personagem.pula();
        }
        if (mouseButton === RIGHT) {
            this.togglePause();
        }

    }

}
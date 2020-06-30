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
        this.imagemVida = null;
        this.vidaPersonagem = null;

        //Inimigos
        this.gerenciadorDeInimigos = null;
        this.gerenciadorDeMoedas = null;

        //Sons
        // TODO colocar o som do pulo no personagem
        this.somDoPulo = null;
        this.pausado = false;

        this.faseAtual = 0;
        this.faseAnterior = 0;
    }

    preload() {
        //console.log("CenaFase: preload");
        let configuracoesDeFases = jogo.configuracoes.configuracoesDeFases;
        this.fases = [];
        let fase;
        for(let i = 0, n = configuracoesDeFases.length;i < n; i++) {
            fase = new Fase(configuracoesDeFases[i])
            fase.preload();
            this.fases.push(fase);
        }

        this.somDoPulo = loadSound('assets/sounds/pulo.wav');
        this.sonsDeColisao =[
            loadSound('assets/sounds/piroto/porrada1.mp3'),
            loadSound('assets/sounds/piroto/porrada2.mp3'),
            loadSound('assets/sounds/piroto/porrada3.mp3'),
            loadSound('assets/sounds/piroto/porrada4.mp3'),
            loadSound('assets/sounds/piroto/porrada5.mp3'),
            loadSound('assets/sounds/piroto/porrada6.mp3'),
            loadSound('assets/sounds/piroto/porrada7.mp3'),
        ];

        this.imagemPersonagem = loadImage('assets/images/personagem/piroto.png');
        this.imagemVida = loadImage('assets/images/personagem/vida.png');

        this.gerenciadorDeInimigos = new GerenciadorDeInimigos();
        this.gerenciadorDeInimigos.preload();

        this.gerenciadorDeMoedas = new GerenciadorDeMoedas();
        this.gerenciadorDeMoedas.preload();

        this.gerenciadorDePontuacao = jogo.gerenciadorDePontuacao;

    }

    setup() {
        let fase;
        for(let i = 0, n = this.fases.length;i < n; i++) {
            fase = this.fases[i];
            fase.setup();
        }

        this.personagem = new Personagem(
            this.imagemPersonagem, this.somDoPulo, 50,
            jogo.configuracoes.alturaDoChao,
            210, 252, 420, 504, 4, 4);
        this.personagem.setSonsDeColisao(this.sonsDeColisao);

        this.vidaPersonagem = new Vida(this.imagemVida, jogo.configuracoes.maximoDeVidas, jogo.configuracoes.vidasIniciais);

        this.gerenciadorDeMoedas.setup();
        this.gerenciadorDeInimigos.setup();
        this.gerenciadorDePontuacao.setup();
        this.gerenciadorDePontuacao.novaFase(this.fases[this.faseAtual]);

        jogo.gerenciadorDeEventos.assinar("colidiu-com-inimigo", this, "colidiuComInimigo");
        jogo.gerenciadorDeEventos.assinar("vida-acabou", this, "gameOver");
        jogo.gerenciadorDeEventos.assinar("aumentou-creu", this, "aumentouCreu");
        jogo.gerenciadorDeEventos.assinar("acabou-a-fase", this, "passouDeFase");
    }

    passouDeFase() {

        this.faseAnterior = this.faseAtual;
        this.faseAtual++;

        if(this.faseAtual == this.fases.length) {
            this.faseAtual = 0;
        }

        this.fases[this.faseAnterior].saindoDeCena();
        this.fases[this.faseAtual].reset();
        this.fases[this.faseAtual].entrandoEmCena();

        this.gerenciadorDePontuacao.novaFase(this.fases[this.faseAtual]);
    }

    aumentouCreu() {
        console.log("Aumentou creu!");
    }

    reset() {

        if (!this.pause) {
            clear();

            this.fases[this.faseAtual].reset();

            this.personagem.reset();
            this.personagem.tornaInvencivel();
            this.vidaPersonagem.reset();

            this.gerenciadorDeMoedas.setup();
            this.gerenciadorDeInimigos.setup();
            this.gerenciadorDePontuacao.setup(this.fases[this.faseAtual]);
            this.pause = false;

        } else{
            this.fases[this.faseAtual].resume();
        }
        loop();
    }

    draw() {

        if(this.faseAtual != this.faseAnterior && !this.fases[this.faseAtual].transicao.acabou()) {
            this.fases[this.faseAnterior].draw();
        }

        this.fases[this.faseAtual].draw();

        this.gerenciadorDeMoedas.estaColidindo(this.personagem);
        this.gerenciadorDeMoedas.draw();

        this.personagem.draw();
        this.vidaPersonagem.draw();

        this.gerenciadorDePontuacao.pontuarPorDistancia();
        this.gerenciadorDePontuacao.draw();

        if(jogo.configuracoes.colisaoInimigoLigada && !this.personagem.estaInvencivel()) {
            this.gerenciadorDeInimigos.estaColidindo(this.personagem);
        }
        this.gerenciadorDeInimigos.draw();

    }

    sceneEnd() {
        if (this.pause) {
            this.fases[this.faseAtual].pause();
            return "cenaPause";
        }

        return "cenaGameOver";
    }

    colidiuComInimigo() {
        this.vidaPersonagem.perdeVida();
        this.personagem.foiAtingido();
        //TODO Verificar se isso ainda é necessario
        this.pause = false;
    }

    gameOver() {
        jogo.gerenciadorDeEventos.publicar("cena-terminada", this);
    }

    keyPressed(key) {
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
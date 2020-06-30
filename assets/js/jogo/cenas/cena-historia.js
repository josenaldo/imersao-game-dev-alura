class CenaHistoria{

    constructor() {
        this.imagemFundo = null;
        this.musica = null;
        this.font = null;
        this.botaoProxima = null;
        this.botaoPular = null;
        this.divHistoria = null;
        this.divHistoriaHolder = null;
        this.paragrafoAtual = 0;
        
    }

    preload() {
        this.musica = loadSound('assets/sounds/historia.mp3');
        this.musica.setVolume(jogo.configuracoes.volumeMusica);
        this.imagemFundo = loadImage('assets/images/cenas/cena-historia.jpg');
        this.font =jogo.configuracoes.font;
        this.historia = HISTORIA;
    }

    setup() {

    }

    reset() {
        this.divBotoes = createDiv();
        this.divBotoes.addClass("historia-botoes");

        this.botaoPular = createButton("Pular");
        this.botaoPular.mousePressed(() => jogo.gerenciadorDeEventos.publicar("cena-terminada", this));
        this.botaoPular.addClass('botao-inicial');
        this.botaoPular.parent(this.divBotoes);

        this.botaoProxima = createButton("Próxima");
        this.botaoProxima.mousePressed(() => this._mostraProximoParagrafo());
        this.botaoProxima.addClass('botao-inicial');
        this.botaoProxima.parent(this.divBotoes);

        this.paragrafoAtual = 0;
        this.divHistoriaHolder = createDiv('');
        this.divHistoriaHolder.addClass('historia-holder');
        this.divBotoes.parent(this.divHistoriaHolder);

        this.divHistoria = createDiv('');
        this.divHistoria.addClass('historia');
        this.divHistoria.addClass('animate__animated animate__zoomIn');
        this.divInstrucoes = createDiv("Tecle 'p' para próxima ou 'Enter' para pular.");
        this.divInstrucoes.addClass("historia-instrucoes");
        this.divInstrucoes.parent(this.divHistoriaHolder);

        this.musica.loop();
        loop();
    }

    draw() {
        this._exibeImagemDeFundo();
        this._exibeTexto();
        this._exibeBotao();
        noLoop();
    }

    sceneEnd() {
        this.divHistoriaHolder.remove();
        this.divHistoria.remove();
        this.botaoProxima.remove();
        this.botaoPular.remove();
        this.musica.stop();
        return "cenaFase";
    }

    keyPressed(key) {
        if (key === 'p' || key === 'P') {
            this._mostraProximoParagrafo();
        }else if (key === 'Enter') {
            jogo.gerenciadorDeEventos.publicar("cena-terminada", this);
        }

    }

    mousePressed(mouseX, mouseY) {
        // this._mostraProximoParagrafo();
    }

    _mostraProximoParagrafo() {
        if(this.paragrafoAtual < this.historia.length - 1) {
            this.paragrafoAtual++;
            this.divHistoria.remove();

            this.divHistoria = createDiv('');
            this.divHistoria.addClass('historia');
            this.divHistoria.addClass('animate__animated animate__zoomIn');
            // this.divHistoria.addClass("animate__delay-1s");

            loop();
        }else {
            jogo.gerenciadorDeEventos.publicar("cena-terminada", this);
        }
    }

    _exibeImagemDeFundo() {
        image(this.imagemFundo, 0, 0, width, height);
    }

    _exibeTexto() {

        this.divHistoriaHolder.position(0,0);
        this.divInstrucoes.position();

        this.divHistoria.html(this.historia[this.paragrafoAtual])
        this.divHistoria.parent(this.divHistoriaHolder);
        this.divHistoria.position();

        //this.divHistoria.center();
    }

    _exibeBotao() {
        this.botaoProxima.position();
        this.botaoPular.position();

    }
}
class CenaInicial {

    constructor() {
        this.imagemFundo = null;
        this.musica = null;
        this.font = null;
        this.botao = null;
    }

    preload() {
        this.musica = loadSound('assets/sounds/start-game.mp3');
        // this.musica.setVolume(jogo.configuracoes.volumeMusica);
        this.imagemFundo = loadImage('assets/images/cenas/cena-inicio.jpg');
        this.font = jogo.configuracoes.font;
    }

    setup() {
        this.botao = createButton("Iniciar");
        this.botao.mousePressed(() => jogo.gerenciadorDeEventos.publicar("cena-terminada", this));
        this.botao.addClass('botao-inicial');
        this.musica.loop();
    }

    reset() {
        this.botao = createButton("Iniciar");
        this.botao.mousePressed(() => jogo.gerenciadorDeEventos.publicar("cena-terminada", this));
        this.botao.addClass('botao-inicial');
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
        //console.log("CenaInicial: sceneEnd")
        this.botao.remove();
        this.musica.stop();
        return "cenaHistoria";
    }

    keyPressed(key) {
        if (key === "Enter") {
            jogo.gerenciadorDeEventos.publicar("cena-terminada", this);
        }
    }

    mousePressed(mouseX, mouseY) {

    }

    _exibeImagemDeFundo() {
        image(this.imagemFundo, 0, 0, width, height);
    }

    _exibeTexto() {
        textFont(this.font);

        let c = color('#bfa5c3');
        fill(c);

        textAlign(CENTER, CENTER);
        textSize(height / 5);
        text("Se pica, Piroto!", width / 2, height / 7 * 2);

        textAlign(CENTER, TOP);
        textSize(height / 10);
        text("Aperte qualquer botão para continuar", width / 2, height / 7 * 4);
    }

    _exibeBotao() {
        this.botao.position(width / 2 + 150, height / 7 * 5);
        this.botao.center("horizontal");
    }
}
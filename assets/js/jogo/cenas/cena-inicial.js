class CenaInicial {

    constructor() {
        this.imagemGameStart = null;
        this.somDoInicio = null;
        this.font = null;
        this.botao = null;
    }

    preload() {
        this.somDoInicio = loadSound('assets/sounds/start-game.mp3');
        this.imagemGameStart = loadImage('assets/images/cenas/cena-inicio.png');
        this.font =jogo.configuracoes.font;
    }

    setup() {
        this.botao = createButton("Iniciar");
        this.botao.mousePressed(() => jogo.gerenciadorDeEventos.publicar("cena-terminada", this));
        this.botao.addClass('botao-inicial');
    }

    reset() {
        this.botao = createButton("Iniciar");
        this.botao.mousePressed(() => jogo.gerenciadorDeEventos.publicar("cena-terminada", this));
        this.botao.addClass('botao-inicial');

        this.somDoInicio.loop();
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
        this.somDoInicio.stop();
        return "cenaFase";
    }

    keyPressed(key) {
        if(key === "Enter") {
            jogo.gerenciadorDeEventos.publicar("cena-terminada", this);
        }
    }

    mousePressed(mouseX, mouseY) {
        //console.log("CenaInicial: mousePressed")
        jogo.gerenciadorDeEventos.publicar("cena-terminada", this);
    }

    _exibeImagemDeFundo() {
        image(this.imagemGameStart, 0, 0, width, height);
    }

    _exibeTexto() {
        textFont(this.font);

        let c = color('#bfa5c3');
        fill(c);

        textAlign(CENTER, CENTER);
        textSize(250);
        text("Se pica, Piroto!", width / 2, height / 2);

        textAlign(CENTER, TOP);
        textSize(50);
        text("Aperte qualquer botão para continuar", width / 2, height / 4);
    }

    _exibeBotao() {
        this.botao.style("width","200px");
        this.botao.position(width - this.botao.width >> 1, 200 + height / 2);
    }
}
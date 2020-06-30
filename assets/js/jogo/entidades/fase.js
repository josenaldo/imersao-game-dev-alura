class Fase {
    constructor(configuracoesDaFase) {
        this.configuracoesDaFase = configuracoesDaFase;
        this.isIntro = false;
    }

    preload() {
        this.primeira = this.configuracoesDaFase['primeira'];
        this.titulo = this.configuracoesDaFase['titulo'];
        this.subtitulo = this.configuracoesDaFase['subtitulo'];
        this.imagemLayer1 = loadImage(this.configuracoesDaFase['layer1']);
        this.imagemLayer2 = loadImage(this.configuracoesDaFase['layer2']);
        this.imagemLayer3 = loadImage(this.configuracoesDaFase['layer3']);
        this.imagemLayer4 = loadImage(this.configuracoesDaFase['layer4']);

        this.musica = loadSound(this.configuracoesDaFase['musica']);
        this.musica.setVolume(jogo.configuracoes.volumeMusica);

        this.marcos = this.configuracoesDaFase.marcos;

        this.introImage = loadImage(this.configuracoesDaFase['intro']);
    }

    setup() {
        // TODO: Poder configurar a velocidade de cada layer
        this.cenarioLayer1 = new Cenario(this.imagemLayer1, 4, this.primeira);
        this.cenarioLayer2 = new Cenario(this.imagemLayer2, 6, this.primeira);
        this.cenarioLayer3 = new Cenario(this.imagemLayer3, 8, this.primeira);
        this.cenarioLayer4 = new Cenario(this.imagemLayer4, 10, this.primeira);

        this.transicao = new Transicao(this.introImage, 10, this.titulo, this.subtitulo, this.primeira);
    }

    reset() {
        // this.musica.loop();
        this.cenarioLayer1.reset();
        this.cenarioLayer2.reset();
        this.cenarioLayer3.reset();
        this.cenarioLayer4.reset();
        this.transicao.reset();

    }

    draw() {

        this.cenarioLayer1.move();
        this.cenarioLayer1.draw();
        this.cenarioLayer2.move();
        this.cenarioLayer2.draw();
        this.cenarioLayer3.move();
        this.cenarioLayer3.draw();

        if (!this.transicao.acabou()) {
            this.transicao.move();
            this.transicao.draw();
        }

        this.cenarioLayer4.move();
        this.cenarioLayer4.draw();
    }

    pause() {
        this.musica.pause();
    }

    resume() {
        this.musica.loop();
    }

    entrandoEmCena() {
        this.resume();
        this.musica.setVolume(jogo.configuracoes.volumeMusica, 2);
    }

    saindoDeCena(){
        this.musica.setVolume(0, 2);
        this.musica.stop(2);
    }

    getMarcos() {
        return this.marcos;
    }

}
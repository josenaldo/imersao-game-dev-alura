class Vida {
    constructor(imagem, maximo, inicial) {
        this.imagem = imagem;
        this.maximo = maximo;
        this.inicial = inicial;
        this.vidas = inicial;

        this.y = height - 80;
        this.x = 20;
        this.largura = 60;
        this.altura = 70;
    }

    setup() {

    }

    reset() {
        this.vidas = this.inicial;
    }

    draw() {

        for (let i = 0; i < this.vidas; i++) {
            image(
                this.imagem,
                this.x + (70 * i),
                this.y,
                this.largura,
                this.altura
            );
        }
    }

    ganhaVida() {
        if (this.vidas <= this.maximo) {
            this.vidas++;
        }
    }

    perdeVida() {
        this.vidas--;

        if (this.vidas <= 0) {
            jogo.gerenciadorDeEventos.publicar("vida-acabou", this);
        }
    }
}
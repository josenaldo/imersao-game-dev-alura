class Cenario {

    constructor(imagem, velocidade, y = 0) {
        this.imagem = imagem;
        this.velocidade = velocidade;
        this.x1 = 0
        this.x2 = width;
        this.y = y

    }

    exibe() {
        image(this.imagem, this.x1, this.y, width, height);
        image(this.imagem, this.x2, this.y, width, height);
    }

    move() {
        this.x1 = this.x1 - this.velocidade
        this.x2 = this.x2 - this.velocidade

        if (this.x1 <= -width) {
            this.x1 = width;
        }

        if (this.x2 <= -width) {
            this.x2 = width;
        }
    }
}
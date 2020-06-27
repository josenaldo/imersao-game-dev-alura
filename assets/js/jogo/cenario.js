class Cenario {

    constructor(imagem, velocidade) {
        this.imagem = imagem;
        this.velocidade = velocidade;
        this.x1 = 0
        this.x2 = width;
        this.y = 0

    }

    exibe() {
        image(this.imagem, this.x1, this.y, width, height);
        image(this.imagem, this.x2, this.y, width, height);
    }

    move() {
        this.x1 = this.x1 - (this.velocidade * game.getVelocidadeBase());
        this.x2 = this.x2 - (this.velocidade * game.getVelocidadeBase());

        // TODO Verificar se isso aqui é uma POG. O simples fato de eu não ter essa certeza é um forte indício de que é POG. 
        if (this.x1 <= -width) {
            this.x1 = width - this.velocidade * game.getVelocidadeBase();
        }

        if (this.x2 <= -width) {
            this.x2 = width - this.velocidade * game.getVelocidadeBase();
        }
    }
}
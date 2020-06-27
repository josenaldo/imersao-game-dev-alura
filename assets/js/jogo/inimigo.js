class Inimigo extends Animacao {
    constructor(imagem, x, y, largura, altura,
        larguraSprite, alturaSprite, colunasDoSprite = 4, linhasDoSprite = 4, velocidade = 10, delay = 0)  {
            super(imagem, x, y, largura, altura, larguraSprite, alturaSprite, colunasDoSprite, linhasDoSprite);

        this.velocidade = velocidade;
        this.delay = delay;
    }

    move() {
        this.x = this.x - (this.velocidade * game.getVelocidadeBase());
    }

    estaForaDaTela() {
        return this.x < -this.largura - this.delay
    }
}
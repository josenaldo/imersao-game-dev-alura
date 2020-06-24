class Inimigo extends Animacao {
    constructor(imagem, x, y, largura, altura,
        larguraSprite, alturaSprite, colunasDoSprite = 4, linhasDoSprite = 4)  {
            super(imagem, x, y, largura, altura, larguraSprite, alturaSprite, colunasDoSprite, linhasDoSprite);

        this.velocidade = 10;
    }

    move() {
        this.x = this.x - this.velocidade;

        if(this.x < -this.largura) {
            this.x = width;
        }
    }
}
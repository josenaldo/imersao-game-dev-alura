class Personagem extends Animacao {

    constructor(imagem, x, yDaBase, largura, altura,
        larguraSprite, alturaSprite, colunasDoSprite = 4, linhasDoSprite = 4)  {

            let yInicial = height - altura - yDaBase;

            super(imagem, x, yInicial, largura, altura, larguraSprite, alturaSprite, colunasDoSprite, linhasDoSprite);

            this.yInicial = yInicial;
            this.y = yInicial;

            this.velocidadeDoPulo = 0;
            this.gravidade = 3;
    }

    pula() {
        this.velocidadeDoPulo =  -30;
    }

    aplicaGravidade() {
        this.y = this.y + this.velocidadeDoPulo;

        this.velocidadeDoPulo = this.velocidadeDoPulo + this.gravidade;

        if(this.y > this.yInicial){
            this.y = this.yInicial;
        }

    }

    anima() {
        super.anima();
        this.aplicaGravidade();
    }

    estaColidindo(inimigo) {
        let precisao = 0.6;

        let colidiu = collideRectRect(
            this.x,
            this.y,
            this.largura * precisao,
            this.altura * precisao,
            inimigo.x,
            inimigo.y,
            inimigo.altura * precisao,
            inimigo.largura * precisao,
        );

        return colidiu;
    }
}
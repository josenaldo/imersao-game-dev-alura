class Personagem extends Animacao {

    constructor(imagem, x, yDaBase, largura, altura,
        larguraSprite, alturaSprite, colunasDoSprite = 4, linhasDoSprite = 4)  {

            let yInicial = height - altura - yDaBase;

            super(imagem, x, yInicial, largura, altura, larguraSprite, alturaSprite, colunasDoSprite, linhasDoSprite);

            this.yInicial = yInicial;
            this.y = yInicial;

            this.velocidadeDoPulo = 0;
            this.gravidade = 4;

            this.contadorDePulo = 0;
    }

    pula() {

        if(this.contadorDePulo < 2){
            this.contadorDePulo++;
            this.velocidadeDoPulo =  -50;
            somDoPulo.play();
        }

    }

    aplicaGravidade() {
        this.y = this.y + this.velocidadeDoPulo;

        this.velocidadeDoPulo = this.velocidadeDoPulo + this.gravidade;

        if(this.y > this.yInicial){
            this.y = this.yInicial;
            this.contadorDePulo = 0;
            this.velocidadeDoPulo = 0;
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
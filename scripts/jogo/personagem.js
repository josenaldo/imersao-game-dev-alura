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

        console.log(this.velocidadeDoPulo)
    }

    anima() {
        super.anima();
        this.aplicaGravidade();
    }
}
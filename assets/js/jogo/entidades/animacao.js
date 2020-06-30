class Animacao {
    constructor(imagem, x, y, largura, altura,
        larguraSprite, alturaSprite, colunasDoSprite = 4, linhasDoSprite = 4) {

        this.imagem = imagem;
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
        this.larguraSprite = larguraSprite;
        this.alturaSprite = alturaSprite;
        this.frameAtual = 0;
        this.colunasDoSprite = colunasDoSprite;
        this.linhasDoSprite = linhasDoSprite;

        this.xInicial = x;
        this.yInicial = y;

        this.pisca = false;
        this.contatorPisca = 0;

        this.calculaMatrizSprites();
    }

    reset() {
        this.frameAtual = 0;
        this.contatorPisca = 0;
        this.x = this.xInicial;
        this.y = this.yInicial;
    }

    calculaMatrizSprites() {
        let indice = 0;
        let x;
        let y;

        this.matrizSprites = Array();

        for (let i = 0; i < this.linhasDoSprite; i++) {
            for (let j = 0; j < this.colunasDoSprite; j++) {
                indice = this.colunasDoSprite * i + j;

                x = this.larguraSprite * j;
                y = this.alturaSprite * i;

                this.matrizSprites[indice] = [x, y];
            }
        }
    }

    draw() {

        let xNoSprite = this.matrizSprites[this.frameAtual][0];
        let yNoSprite = this.matrizSprites[this.frameAtual][1];

        this.contatorPisca = this.contatorPisca + 1

        // every 10th time, the condition is true


        if (this.pisca) {
            if (this.contatorPisca % 10 >= 0 && this.contatorPisca % 10 <= 5) {

                image( 
                    this.imagem,
                    this.x,
                    this.y,
                    this.largura,
                    this.altura,
                    xNoSprite,
                    yNoSprite,
                    this.larguraSprite,
                    this.alturaSprite
                );
            } else {
    
            }
        } else {
            image(
                this.imagem,
                this.x,
                this.y,
                this.largura,
                this.altura,
                xNoSprite,
                yNoSprite,
                this.larguraSprite,
                this.alturaSprite
            );
        }


        this.anima();
    }

    ligaPisca() {
        this.pisca = true;
    }

    desligaPisca() {
        this.pisca = false;
    }

    anima() {
        this.frameAtual++;

        if (this.frameAtual >= this.matrizSprites.length - 1) {
            this.frameAtual = 0;
        }
    }
}
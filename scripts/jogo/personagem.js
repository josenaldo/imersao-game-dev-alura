class Personagem {

    constructor(imagem) {
        this.imagem = imagem;
        this.colunasDoSprite = 4;
        this.linhasDoSprite = 4;
        this.larguraDaImagem = 220;
        this.alturaDaImagem = 270;
        this.matrizSprites = Array();
        this.frameAtual = 0;

        var indice = 0;
        for (var i = 0;i < this.colunasDoSprite; i++) {
            for (var j = 0;j < this.linhasDoSprite; j++) {
                indice = this.colunasDoSprite * i + j;
                this.matrizSprites[indice] = [this.larguraDaImagem * i, this.alturaDaImagem * j];
            }
        }

    }

    exibe() {

        // image(img, dx, dy, dWidth, dHeight, sx, sy, [sWidth], [sHeight])

        var sx = this.matrizSprites[this.frameAtual][0];
        var sy = this.matrizSprites[this.frameAtual][1];

        console.log("SX = " + sx + " | SY = " + sy)
        image(this.imagem, 0, height - 135, 110, 135, sx, sy, 220, 270)
    }

    anima() {
        this.frameAtual = this.frameAtual + 1;

        if(this.frameAtual > this.matrizSprites.length -1){
            this.frameAtual = 0;
        }

        console.log("frame = " + this.frameAtual + " | " + this.matrizSprites[this.frameAtual])
    }
}
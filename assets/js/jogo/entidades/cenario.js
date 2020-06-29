class Cenario {

    constructor(imagem, velocidade) {

        this.imagem = imagem;
        this.velocidade = velocidade;
        this.x1 = 0
        this.x2 = width;
        this.y = 0

        this.velocidadeInicial = velocidade;
        this.x1Inicial = 0
        this.x2Inicial = width;
        this.yInicial = 0
    }

    draw() {
        image(this.imagem, this.x1, this.y, width, height);
        image(this.imagem, this.x2, this.y, width, height);
    }

    reset() {
        console.log("Reset cenario")
        this.velocidade = this.velocidadeInicial;
        this.x1 = this.x1Inicial;
        this.x2 = this.x2Inicial;
        this.y = this.yInicial;
    }

    move() {
        this.x1 = this.x1 - (this.velocidade * jogo.configuracoes.velocidadeBase);
        this.x2 = this.x2 - (this.velocidade * jogo.configuracoes.velocidadeBase);

        // TODO Verificar se isso aqui é uma POG. O simples fato de eu não ter essa certeza é um forte indício de que é POG.
        if (this.x1 <= -width) {
            this.x1 = width - this.velocidade * jogo.configuracoes.velocidadeBase;
        }

        if (this.x2 <= -width) {
            this.x2 = width - this.velocidade * jogo.configuracoes.velocidadeBase;
        }
    }
}
class Cenario {

    constructor(imagem, velocidade, primeira = false) {

        this.imagem = imagem;
        this.velocidade = velocidade;
        this.y = 0

        this.velocidadeInicial = velocidade;
        this.yInicial = 0

        this.x1Inicial = width;
        this.x2Inicial = width * 2;

        this.x1InicialPrimeira = 0;
        this.x2InicialPrimeira = width;

        this.primeira = primeira;

        if (primeira) {
            this.x1 = 0;
            this.x2 = width;
        } else {
            this.x1 = width;
            this.x2 = width * 2;
        }

        this.acabouCenario = false;
        this.emTransicao = false;
    }

    draw() {
        image(this.imagem, this.x1, this.y, width, height);
        image(this.imagem, this.x2, this.y, width, height);
    }

    reset() {
        this.emTransicao = false;
        this.cenarioAcabou =false;
        this.velocidade = this.velocidadeInicial;
        this.y = this.yInicial;
        if(this.primeira){
            this.x1 = this.x1InicialPrimeira;
            this.x2 = this.x2InicialPrimeira;
            this.primeira = !this.primeira;
        }else {
            this.x1 = this.x1Inicial;
            this.x2 = this.x2Inicial;
        }
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

    iniciarTransicao() {
        this.emTransicao = true;
    }

    getUltimoX() {
        return this.x1 > this.x2 ? x1 : x2;
    }

    acabou() {
        return this.cenarioAcabou;
    }

    setPrimeira() {
        this.primeira = true;
    }
}
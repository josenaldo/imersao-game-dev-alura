class Moeda extends Animacao{
    constructor(imagem, x, y, largura, altura,
        larguraSprite, alturaSprite, colunasDoSprite = 14, linhasDoSprite = 1, velocidade = 10, delay = 0)  {
            super(imagem, x, y, largura, altura, larguraSprite, alturaSprite, colunasDoSprite, linhasDoSprite);

        this.velocidade = velocidade;
        this.delay = delay;
        this.coletada = false;
    }

    move() {
        this.x = this.x - (this.velocidade * game.getVelocidadeBase());
    }

    pegou() {
        this.coletada = true;
    }

    estaForaDaTela() {
        return this.x < -this.largura - this.delay;
    }

    isColetada() {
        return this.coletada;
    }

    exibe() {
        if(!this.coletada) {
            super.exibe();
        }else{
            return;
        }

    }
}
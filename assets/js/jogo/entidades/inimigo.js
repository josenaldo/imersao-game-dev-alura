class Inimigo extends Animacao {
    constructor(imagem, x, y, largura, altura,
        larguraSprite, alturaSprite, colunasDoSprite = 4, linhasDoSprite = 4, velocidade = 10, delay = 0, podeVoar = false)  {
            super(imagem, x, y, largura, altura, larguraSprite, alturaSprite, colunasDoSprite, linhasDoSprite);

        this.velocidade = velocidade;
        this.delay = delay;
        this.podeVoar = podeVoar;
    }

    move() {
        this.x = this.x - (this.velocidade * jogo.configuracoes.velocidadeBase);
    }

    podeVoar() {
        return this.podeVoar;
    }

    estaForaDaTela() {
        return this.x < -this.largura - this.delay
    }

    randomizeY(minima, maxima)  {
        if(this.podeVoar) {
            this.y = Math.random() * (maxima - minima) + minima;
        }
    }

    randomizeVelocidade(minima, maxima){
        this.velocidade = Math.random() * (maxima - minima) + minima;
    }

    randomizeDelay(minima, maxima){
        this.delay = Math.random() * (maxima - minima) + minima;
    }
}
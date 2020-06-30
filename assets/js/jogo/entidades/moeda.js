class Moeda extends Animacao {
    constructor(imagem, somDaMoeda, x, y, largura, altura,
        larguraSprite, alturaSprite, colunasDoSprite = 14, linhasDoSprite = 1, velocidade = 10, delay = 0, tipo = 'normal') {

        super(imagem, x, y, largura, altura, larguraSprite, alturaSprite, colunasDoSprite, linhasDoSprite);

        this.velocidade = velocidade;
        this.delay = delay;
        this.coletada = false;
        this.somDaMoeda = somDaMoeda;
        this.tipo = tipo;
    }

    randomizeY(minima, maxima) {
        this.y = Math.random() * (maxima - minima) + minima;
    }

    randomizeVelocidade(minima, maxima) {
        this.velocidade = Math.random() * (maxima - minima) + minima;
    }

    randomizeDelay(minima, maxima) {
        this.delay = Math.random() * (maxima - minima) + minima;
    }

    move() {
        this.x = this.x - (this.velocidade * jogo.configuracoes.velocidadeBase);
    }

    pegou(personagem) {
        this.coletada = true;
        this.somDaMoeda.play();

        switch(this.tipo){
            case 'moeda-invencibilidade':
                personagem.tornaInvencivel(jogo.configuracoes.moedas.tempoDeInvencibilidade);
                break;
            case 'moeda-vida':
                jogo.gerenciadorDeEventos.publicar("ganhou-vida", this);
                break;
            case 'moeda-pulo-triplo':
                personagem.ganhaPuloTriplo(jogo.configuracoes.moedas.tempoDoPuloTriplo)
                break;
            case 'normal':
            default:
        }
    }

    ePowerup(){
        return this.tipo === 'moeda-invencibilidade' || this.tipo === "moeda-pulo-triplo"
    }

    libera() {
        this.coletada = false;
    }

    estaForaDaTela() {
        return this.x < -this.largura - this.delay;
    }

    isColetada() {
        return this.coletada;
    }

    draw() {
        if (!this.coletada) {
            super.draw();
        } else {
            return;
        }
    }

}
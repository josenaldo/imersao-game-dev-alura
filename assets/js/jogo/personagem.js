//TODO Adicionar o movimento de deslisar (dash)
//TODO Adicionar animação de pulo
class Personagem extends Animacao {

    /**
     * Cria o personagem.
     * @constructor
     * @param {Image} imagem - imagem contendo os sprites do personagem
     * @param {number} x - posição x do canto superior esquerdo do
     *  personagem na tela
     * @param {number} variacaoY - altura a partir da qual o personagem deve ser
     *  adicionado. Pode ser a altura do chão, para personagem que anda no chão,
     *  ou altura do vôo, para personagens que voam.
     * @param {number} largura - largura do personagem na tela
     * @param {number} altura - altura do personagem na tela
     * @param {number} larguraSprite - largura do personagem no sprite
     * @param {number} alturaSprite - altura do personagem no sprite
     * @param {number} colunasDoSprite - número de colunas, na folha de sprite.
     *  O padrão é 4.
     * @param {number} linhasDoSprite - número de linhas do personagem no
     *  sprite.
     *
     * TODO: Melhorar esse construtor para usar uma classe SpriteMap, com
     * dos dados do sprite.
    */
    constructor(imagem, somDoPulo, x, variacaoY, largura, altura,
        larguraSprite, alturaSprite, colunasDoSprite = 4, linhasDoSprite = 4, alturaDoPulo = 30)  {

            let yInicial = height - altura - variacaoY;

            super(imagem, x, yInicial, largura, altura, larguraSprite, alturaSprite, colunasDoSprite, linhasDoSprite);

            this.yInicial = yInicial;
            this.y = yInicial;

            this.velocidadeDoPulo = 0;
            this.gravidade = 1.2;

            // TODO Adicionar powerup de altura do pulo
            this.alturaDoPulo = alturaDoPulo;

            // TODO Adicionar powerup máximo de pulos
            this.maximoDePulos = 2;

            this.contadorDePulo = 0;
            this.somDoPulo = somDoPulo;
    }

    pula() {

        if(this.contadorDePulo < this.maximoDePulos){
            this.contadorDePulo++;
            this.velocidadeDoPulo = -this.alturaDoPulo;
            this.somDoPulo.play();
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

    // TODO Melhorar sistema de colisão
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
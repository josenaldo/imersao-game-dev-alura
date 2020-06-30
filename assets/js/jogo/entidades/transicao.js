class Transicao {

    constructor(imagem, velocidade, titulo, subtitulo,  primeira = false) {

        this.imagem = imagem;
        this.velocidade = velocidade;
        this.y = 0

        this.velocidadeInicial = velocidade;
        this.yInicial = 0

        this.titulo = titulo;
        this.subtitulo = subtitulo;

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

        this.transicaoAcabou = false;

    }

    draw() {
        image(this.imagem, this.x1, this.y, width, height);
        image(this.imagem, this.x2, this.y, width, height);
        let x = this.x1 > 0 ? this.x1 : (this.x2 > 0 ? 0 : this.x2);

        this.divTransicao.position(x,0);
        this.divTitulo.position();
        this.divSubtitulo.position();
    }

    reset() {
        this.velocidade = this.velocidadeInicial;
        this.y = this.yInicial;
        this.transicaoAcabou = false;

        if(this.primeira){
            this.x1 = this.x1InicialPrimeira;
            this.x2 = this.x2InicialPrimeira;
            this.primeira = !this.primeira;
        }else {
            this.x1 = this.x1Inicial;
            this.x2 = this.x2Inicial;
        }

        this.divTransicao = createDiv();
        this.divTransicao.addClass('transicao');

        this.divTitulo = createDiv(this.titulo);
        this.divTitulo.addClass("titulo");
        this.divSubtitulo = createDiv(this.subtitulo);
        this.divSubtitulo.addClass("subtitulo");

        this.divTitulo.parent(this.divTransicao);
        this.divSubtitulo.parent(this.divTransicao);
    }

    move() {
        this.x1 = this.x1 - (this.velocidade * jogo.configuracoes.velocidadeBase);
        this.x2 = this.x2 - (this.velocidade * jogo.configuracoes.velocidadeBase);

        // TODO Verificar se isso aqui é uma POG. O simples fato de eu não ter essa certeza é um forte indício de que é POG.
        if (this.x2 <= -width) {
            this.transicaoAcabou = true;
        }
    }

    acabou() {
        return this.transicaoAcabou;
    }

    setPrimeira() {
        this.primeira = true;
    }
}

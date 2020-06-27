class GeradorDeInimigos{

    constructor() {
        this.inimigos = Array();
        this.maximoDeInimigos = 2;

        this.imagemInimigoChifrus = null;
        this.inimgoChifrus = null;

        this.imagemInimigoChifrusDark = null;
        this.inimgoChifrusDark = null;

        this.imagemInimigoBatus = null;
        this.inimgoBatus = null;

        this.inimigos = null;
    }

    preload(){
        this.imagemInimigoChifrus = loadImage('assets/images/inimigos/chifrus.png');
        this.imagemInimigoChifrusDark = loadImage('assets/images/inimigos/chifrus-dark.png');
        this.imagemInimigoBatus = loadImage('assets/images/inimigos/batus.png');
    }

    setup() {
        this.inimigos = Array();
        let alturaDoChao = game.getAlturaDoChao();

        this.inimigoChifrus = new Inimigo(this.imagemInimigoChifrus, width + 200, height - alturaDoChao - 109, 105, 109, 315, 329, 4, 7, 10 * game.getVelocidadeBase());
        this.inimigoChifrusDark = new Inimigo(this.imagemInimigoChifrusDark, width, height - alturaDoChao - 157, 157, 163, 315, 329, 4, 7, 10 * game.getVelocidadeBase(), 1000);
        this.inimigoBatus = new Inimigo(this.imagemInimigoBatus, width + width / 2, height / 1.8, 200, 125, 401, 249, 3, 2, 10 * game.getVelocidadeBase());

        this.inimigos.push(this.inimigoChifrus);
        this.inimigos.push(this.inimigoChifrusDark);
        this.inimigos.push(this.inimigoBatus);
    }

    exibe(){
        for (var i = 0; i < this.inimigos.length; ++i) {
            var inimigo = this.inimigos[i];
            inimigo.exibe();
            inimigo.move();
    
        }
    }

    estaColidindo(personagem) {
        for (var i = 0; i < this.inimigos.length; ++i) {
            var inimigo = this.inimigos[i];
    
            // TODO: Fazer o piroto piscar se acontecer uma colisão
            // TODO: Tocar um som de porrada na hora da colisão
            // TODO: Diminuir a vida do Piroto e só dar game over quando a vida chegar ao fim
            // TODO: Tocar musica de game over
            if (personagem.estaColidindo(inimigo)) {
                game.setStateGameOver();
                break;
            }
        }
    }
}
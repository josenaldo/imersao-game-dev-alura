class CenaHistoria{

    constructor() {
        //console.log("CenaHistoria: construtor")
        
    }

    preload() {
        //console.log("CenaHistoria: preload")
    }

    setup() {
        //console.log("CenaHistoria: setup")
    }

    reset() {

    }

    draw() {
        //console.log("CenaHistoria: draw")
    }

    sceneEnd() {
        //console.log("CenaHistoria: sceneEnd")
    }

    keyPressed(key) {
        //console.log("CenaHistoria: keyPressed")
    }

    mousePressed(mouseX, mouseY) {
        //console.log("CenaInicial: mousePressed")
        jogo.gerenciadorDeEventos.publicar("cena-terminada", this);
    }
}
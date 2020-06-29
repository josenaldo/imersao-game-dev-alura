class GerenciadorDeEventos {
    constructor() {
        this.eventos = {};
    }

    publicar(chave, data) {
        var manipuladores = this.eventos[chave];

        if (!!manipuladores === false) return;

        let manipulador;
        let objeto;
        let metodo
        for(let i=0, n=manipuladores.length ; i < n ; i ++) {
            manipulador = manipuladores[i];
            objeto = manipulador[0];
            metodo = manipulador[1];
            objeto[metodo].call(objeto, data);
        }
    }

    assinar(chave, manipulador, metodo) {
        var manipuladores = this.eventos[chave];

        if (!!manipuladores === false) {
            manipuladores = this.eventos[chave] = [];
        }

        manipuladores.push([manipulador, metodo]);
    }

    cancelarAssinatura(chave, manipulador) {

        var manipuladores = this.eventos[chave];

        if (!!manipuladores === false) return;

        let manipuladorIndex  = -1;

        for(let i = 0 ; i < manipuladores.length ; i++) {
            m = manipuladores[i];
            if(m[0] === manipulador) {
                manipuladorIndex  = i;
                break;
            }
        }

        manipuladores.splice(manipuladorIndex);
    }
}
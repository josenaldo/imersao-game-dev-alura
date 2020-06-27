# Imersão Game Dev Alura

Esse é o material que desenvolvi e usei durante a Imersão Game Dev Alura.

Para facilitar a execução desse projeto, usei o plugin [devServer](https://marketplace.visualstudio.com/items?itemName=ihuke.devServer), para criar um servidor web local.

- [Aula 0 - Imersão GameDev Live](https://www.youtube.com/watch?v=NAGb_i94UYo)

## Aula 1

Vídeo: [Aula 1](https://www.alura.com.br/imersao-gamedev-javascript/aula01-game-personagem-animacao)

O arquivo sketch.js parece ser o principal arquivo do jogo, o nosso "main".

Esse arquivo tem duas funções: setup e draw.

- setup é chamada apenas uma vez, ao inicializar o jogo.
- draw é chamada a cada loop do jogo

### Variáveis implícitas

- windowWidth - Largura da janela do navegador, em pixels
- windowHeight - Altura da janela do navegador, em pixels
- mouseX - Posição X do mouse
- mouseY - posição Y do mouse

### Funções

#### Funções de ciclo de vida

##### preload()

É executada antes do setup. Usada para carregar recursos como imagens.

##### setup()

É executada uma vez, na inicialização do jogo. Deve ser usada para código de preparação do jogo.

##### draw()

É executata a cada loop do jogo.

#### Funções de desenho

##### createCanvas(largura, altura)

Essa é a função que cia a área de desenho do jogo. ela recebe 2 parâmetros: largura e altura.

Você pode passar as variáveis implícitas (provavelmente globais) windowWidth e windowHeight, que passam a largura e altura da janela do navegador.

##### ellipse(x, y, largura, altura)

Cria uma ellipse no canvas, na posição x,y, como a largura e altura informados.

```ellipse(mouseX, mouseY, 200, 200 );```

Cria um círculo e faz ele acompanhar a posição do mouse.

##### rect(x, y, largura, altura)

Cria um retâgulo no canvas

##### square(x, y, largura)

Cria um quadrado, na posição x,y, com a largura informada.

##### circle(x, y, diametro)

Cria um círculo, na posição x,y, com o diametro informado.

##### loadImage(caminho)

Carrega uma imagem, a partir do caminho passado. Esse caminho pode ser
relativo.

##### background(imagem_ou_cor)

Carrega uma imagem ou uma cor no background

## Links importantes

- [Ferramenta de sprites](https://www.piskelapp.com/)
- [Bons sprites pra download](https://opengameart.org/users/bevouliincom)

## Paleta de cores

- [Paleta de cores](https://www.color-hex.com/color/611f6a)

Base color: #611F6A

- Shades of #611f6a
  - #611f6a
  - #571b5f
  - #4d1854
  - #43154a
  - #3a123f
  - #300f35
  - #260c2a
  - #1d091f
  - #130615
  - #09030a
  - #000000
- Tints of #611f6a
  - #611f6a
  - #703578
  - #804b87
  - #906296
  - #a078a5
  - #b08fb4
  - #bfa5c3
  - #cfbbd2
  - #dfd2e1
  - #efe8f0
  - #ffffff
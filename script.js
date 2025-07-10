const html = document.querySelector('html')
const botoesContexto = document.querySelectorAll('.app__card-button')
const titulo = document.querySelector('.app__title')
const banner = document.querySelector('.app__image')
const btMusica = document.querySelector('#alternar-musica')
const mostrarTempoNaTela = document.querySelector('#timer')
const startPauseBt = document.querySelector('#start-pause span')
const iconStartPause = document.querySelector('.app__card-primary-butto-icon')
const startMusic = new Audio('sons/play.wav')
const pauseMusic = new Audio('sons/pause.mp3')
const endMusic = new Audio('sons/beep.mp3')
const musica = new Audio('sons/luna-rise-part-one.mp3')


let tempoEmSegundos = 1500
let idInterval = null

/* BOTÕES DE NAVEGAÇÃO */
botoesContexto.forEach(botoes => {
    botoes.addEventListener('click', (botao) => {
        botoesContexto.forEach(btn => btn.classList.remove('active'))
        botoes.classList.add('active')

        let atributo = botao.target.attributes[0].value
        switch(atributo) {
            case 'foco':
                titulo.innerHTML = `Otimize sua produtividade,
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
                atributo = 'foco'
                tempoEmSegundos = 1500
                break;
            case 'short':
                titulo.innerHTML = `Que tal dar uma respirada?
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`
                atributo = 'descanso-curto'
                tempoEmSegundos = 300
                break;
            case 'long':                
                titulo.innerHTML = `Hora de voltar à superfície.
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
                atributo = 'descanso-longo'
                tempoEmSegundos = 900
                break
        }
        mostrarTempo()
        mudarContexto(atributo)
        
    })
    
})

/* TEMPO */
function contagemRegressiva() {
    if(tempoEmSegundos <= 0) {
        endMusic.play()
        zerar()
        return
    }
    tempoEmSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(idInterval) {
        startPauseBt.textContent = 'Começar'
        iconStartPause.setAttribute('src', '/imagens/play_arrow.png')
        pauseMusic.play()
        zerar()
        return
    }
    startPauseBt.textContent = 'Pause'
    iconStartPause.setAttribute('src', `/imagens/pause.png`)
    startMusic.play()
    idInterval = setInterval(contagemRegressiva, 1000)
}

function zerar() {
    clearInterval(idInterval)
    idInterval = null
}

function mostrarTempo() {
    const tempo = new Date(tempoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    mostrarTempoNaTela.innerHTML = `${tempoFormatado}`
}
mostrarTempo()

/* CHECKBOX MUSICA */

btMusica.addEventListener('change', () => {
    if(btMusica.checked) {
        musica.play()
        musica.loop = true
    } else {
        musica.pause()
    }
})


/* MÉTODO PARA MUDAR OS ATRIBUTOS */
function mudarContexto(contexto) {
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
}

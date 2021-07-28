//Componente - load sons
//som raquete
const somRaquete = new Audio();
somRaquete.src = "./som/raquete.mp3";
//som muro
const somMuro = new Audio();
somMuro.src = "./som/muro.mp3";
//som quando a bola sair do lado do jogador
const somPerdeu = new Audio();
somPerdeu.src = "./som/perdeu.mp3";
//som quando a bola sair do lado da CPU
const somPonto = new Audio();
somPonto.src = "./som/ponto.mp3";


//variaveis
var btIniciar;
var bola;
var cpu;
var jog;
var painelPontosJog;
var painelPontosCpu;

//variaveis de control
var game;
var frames;

//variaveis posição dos elementos
var posBolaX;
var posBolaY;
var posJogX;
var posJogY;
var posCpuX;
var posCpuY;

//variavel direção de acordo com a tecla do teclado
var direcaoJogY;

//variaveis de posições iniciais
var posJogInicialY = 180;
var posJogInicialX = 10;
var posCpuInicialY = 180;
var posCpuInicialX = 930;
var posBolaInicialX = 475;
var posBolaInicialY = 240;

//variaveis de tamanhos
var campoX = 0;
var campoY = 0;
var campoLargura = 960;
var campoAltura = 500;
var barraLargura = 20;
var barraAltura = 140;
var bolaLargura = 20;
var bolaAltura = 20;

//variaveis para controla a direção
var bolaX;
var bolaY;
var cpuY = 0;

//variaveis para controla a velocidade
var velocidadeBola;
var velocidadeCpu;
var velocidadeJog;

//controle
var pontos = 0;
var tecla;
var jogo = false;

//função de controle do jogador
function controlarJogador(){
    if(jogo){
        posJogY += velocidadeJog * direcaoJogY;
        if((posJogY + barraAltura >= campoAltura) || (posJogY <= 0)){//limitar a movimentação do jogador
            posJogY += (velocidadeJog * direcaoJogY) * (-1); 
        }
        jog.style.top = posJogY + "px";
    }
}

//função de controle da CPU
function controlarCpu(){
    if(jogo){
        if((posBolaX > (campoLargura/2)) && (bolaX > 0)){
            //movimentar CPU
            if((posBolaY + (bolaAltura/2)) > (posCpuY + (barraAltura/2)) + velocidadeCpu){
                //Mover para baixo
                if((posCpuY + barraAltura) <= campoAltura){
                    posCpuY += velocidadeCpu;
                }          
            }else if((posBolaY + (bolaAltura/2)) < (posCpuY + (barraAltura/2)) - velocidadeCpu){//Mover para cima
                if(posCpuY >= 0){
                   posCpuY -= velocidadeCpu;
                }
            } else if((posBolaY + (bolaAltura/2)) < (posCpuY + (barraAltura/2)) - velocidadeCpu){//Mover para cima
                if(posCpuY >= 0){
                   posCpuY -= velocidadeCpu;
                }
            }           
        } else {
            //posicionar CPU no centro
            if((posCpuY + (barraAltura/2)) < (campoAltura/2)){
                posCpuY += velocidadeCpu;
            } else if((posCpuY + (barraAltura/2)) > (campoAltura/2)){
                posCpuY -= velocidadeCpu;
            }
        }
        cpu.style.top = posCpuY + "px";
    }
}

//função de controle da bola
function controlarBola(){
    posBolaX += velocidadeBola * bolaX;   
    posBolaY += velocidadeBola * bolaY;

    //colisão com o jogador
    if((posBolaX <= posJogX + barraLargura) && ((posBolaY + bolaAltura >= posJogY) && (posBolaY <= posJogY + barraAltura))){
         bolaY = (((posBolaY + (bolaAltura/2)) - (posJogY + (bolaAltura/2)))/86);
         bolaX*=-1;
         somRaquete.play();
    }
    //colisão com a CPU
    if((posBolaX >= posCpuX - barraLargura) && ((posBolaY + bolaAltura >= posCpuY) && (posBolaY <= posCpuY + barraAltura))){
        bolaY = (((posBolaY + (bolaAltura/2)) - (posCpuY + (bolaAltura/2)))/86);
        bolaX*=-1;
        somRaquete.play();
   }
   //limite superior e inferior para não deixa a bola sair
   if((posBolaY >= 480)|| (posBolaY <=0)){
       bolaY*=-1;
       somMuro.play();
   }
   //Fez pontos quando saiu pela direita e pela esquerda
   if(posBolaX >= (campoLargura - bolaLargura)){
       velocidadeBola = 0;
       posBolaX = posBolaInicialX;
       posBolaY = posCpuInicialY;
       posJogY = posJogInicialY;
       posCpuY = posJogInicialY;
       pontos ++;
       painelPontosJog.value = pontos;
       somPonto.play();
       jogo = false;
       jog.style.top = posJogY + "px";
       cpu.style.top = posCpuY + "px";
   }else if (posBolaX <= 0){
    velocidadeBola = 0;
    posBolaX = posBolaInicialX;
    posBolaY = posCpuInicialY;
    posJogY = posJogInicialY;
    posCpuY = posJogInicialY;
    pontos ++;
    painelPontosCpu.value = pontos;
    somPerdeu.play();
    jogo = false;
    jog.style.top = posJogY + "px";
    cpu.style.top = posCpuY + "px";
    }
   
    bola.style.top = posBolaY + "px";
    bola.style.left = posBolaX + "px";
}

//função controle de tecla
function teclaDw(){//quando a tecla for precionada, para mover
   tecla = event.keyCode;
    if(tecla == 38){//para cima
        direcaoJogY = -1; 
    }else if(tecla == 40){//para baixo
        direcaoJogY = +1; 
    }
}
function teclaUp(){//quando a tecla for solta, para parar
    tecla = event.keyCode;
    if(tecla == 38){//para cima
        direcaoJogY = 0; 
    }else if(tecla == 40){//para baixo
        direcaoJogY = 0; 
    }
}

//função para controla as animações do jogo
function gameAnimation(){
    if(jogo){
        controlarJogador();
        controlarBola();
        controlarCpu();
    }
    frames = requestAnimationFrame(gameAnimation);
}

//função inicar jogo
function iniciarJogo(){
    if(!jogo){
        velocidadeBola = 8;
        velocidadeCpu = 8;
        velocidadeJog = 8;

        cancelAnimationFrame(frames);
        jogo = true;
        direcaoJogY = 0;
        bolaY = 0;
        if((Math.random() * 10) < 5){
            bolaX = -1;
        }else{
            bolaX = 1;
        }
        posBolaX = posBolaInicialX;
        posBolaY = posBolaInicialY;
        posJogY = posJogInicialY;
        posJogX = posJogInicialX;
        posCpuY = posCpuInicialY;
        posCpuX = posCpuInicialX;

        gameAnimation();
    }
}

//função para iniciar os componentes do game
function inicializar(){
    velocidadeBola = 8;
    velocidadeCpu = 8;
    velocidadeJog = 8;
    btIniciar = document.getElementById("btIniciar");
    btIniciar.addEventListener("click", iniciarJogo);
    bola = document.getElementById("bola");
    cpu = document.getElementById("cpu");
    jog = document.getElementById("jogador");
    painelPontosJog = document.getElementById("textPontosJog");
    painelPontosCpu = document.getElementById("textPontosCpu");
    document.addEventListener("keydown", teclaDw);
    document.addEventListener("keyup", teclaUp);
}

window.addEventListener("load", inicializar);




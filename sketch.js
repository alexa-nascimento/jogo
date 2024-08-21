
// menu
var tela = 1;
var lrect = 200;
var arect = 50;
var xopção = 150;
var yiniciar = 85;
var yinfo = 150;
var ycred = 210;
var yvoltar = 10


//jogador
var pX = 350
var pY = 480
var pWidth = 30
var pHeight = 70
var jogadora

//inimigo
var iX = 385
var iY = 200
var iWidth = 30
var iHeight = 70
var iposição = 385;
var ivelocidade = 2;
var idireção = 1
var idistancia = 50
var iM = false

//caixas (plataformas)
var b1X, b1Y, bWidth, bHeight, b2X, b2Y, b2Width, b2Height, b3X, b3Y, b3Width, b3Height,b4X,b4Y,b4Width,b4Height,b5X,b5Y,b5Width,b5Height;

//gravidade
var jump = false; 
var direction = 1;
var velocidade = 2;
var forcadopulo = 15;
var queda = 2
var minaltura = 500; 
var maxaltura = 50;
var contadorpulo = 0;
var hit;

//chave
chave = false
chave2 = false
xc = 50
yc =500
xC =350
yC=500

function preload(){
  
  torre = loadImage("fundo.jpg");
  tparede = loadImage("tparede-1.jpg");
  jogadora = loadImage("personagem.png");
  programador = loadImage("programadora.jpg");
  professor= loadImage("professor.png");
  tiles = loadImage("tile.png");
  musica = loadSound("musicatop.mp3");
  porta = loadImage("porta.png");
  
  
}

function setup(){
  createCanvas(500,600);
  hit = false;
  musica.play();

}
function draw(){
  keyPressed();
  keyTyped();
  gravity();
  
  textStyle(NORMAL);
  //menu
  if (tela == 1){
    Menu();
  }else {
    if (tela == 2){
      Jogo();
    }else {
      if (tela == 3){
        Instruções();
      }else{
        if (tela == 4){
          Creditos();
        }else{
          if(tela == 5){
            Fase2();
          }else{
            if ( tela == 6){
              Fase3();
            }else{
              if( tela == 7){
                Fim();
                }else if(tela == 8){
                  GameOver();
                }
              }
              }
            }
          }
        }
      }
    
  
}

//menu
function Menu(){
  background(torre);
  textAlign(CENTER);
  textSize(30);
  stroke("black");
  fill("white");
  text("Tabuada na torre ", 250,40); //titulo
  if (mouseX > xopção && mouseX < xopção + lrect && mouseY > yiniciar && mouseY < yiniciar + arect){
    stroke("rgb(7,2,2)");
    fill("rgba(255,255,255,0.07)");
    rect(xopção,yiniciar,lrect,arect,50);
    if (mouseIsPressed){
      tela = 2
    }
  } 
  fill(255);
  stroke("black");
  text("Iniciar",250,120); // botão de iniciar
  if (mouseX > xopção && mouseX < xopção + lrect && mouseY > yinfo && mouseY < yinfo + arect){
    stroke("rgb(3,3,3)");
    fill("rgba(255,255,255,0.07)");
    rect(xopção,yinfo,lrect,arect,50);
    if(mouseIsPressed){
      tela = 3;
    }
  }
  fill(255);
  stroke("black");
  text("Instruções",250,183); // botão de instruções
  if(mouseX > xopção && mouseX < xopção + lrect && mouseY > ycred && mouseY < ycred + arect){
    stroke("black");
    fill("rgba(255,255,255,0.07)");
    rect(xopção,ycred,lrect,arect,50);
    if(mouseIsPressed){
      tela =4;
    }
  }
    fill(255);
    stroke("black");
    text("Creditos",250,243); //botão de creditos
}

//jogo
function Jogo(){
  
 b1X = 130;
 b1Y = 400;
 bWidth = 200;
 bHeight =40;
 b2X = 385;
 b2Y = 250;
 b2Width = 200;
 b2Height = 40;
 b3X = 100;
 b3Y = 100;
 b3Width = 180;
 b3Height = 40;
  
 //fundo
  rectMode(CENTER);
  textAlign(CENTER);
  background(tparede); //parede da torre
  noStroke();
  fill("grey");
  image(tiles)
  rect(width/2,550,width,100); //chão
  //objetivo da fase
  noStroke()
  fill("rgba(204,190,190,0.75)")
  text("Para abrir a porta pegue a chave com a resposta de 1x3!",380,250,250,400)
   //janela
  noFill();
  stroke(0);
  strokeWeight(15);
  rect(width/2,height/2,width,height);
  
  //caixas
  stroke(0);
  strokeWeight(5);
  fill("rgba(128,128,128,0)")
  image(tiles,30,380,200,40)
  rect(b1X,b1Y,bWidth,bHeight); //plataforma 1
  
  stroke(0);
  strokeWeight(5);
  fill("rgba(128,128,128,0)");
  image(tiles,285,230,200,40)
  rect(b2X,b2Y,b2Width,b2Height); //plataforma 2
  
  stroke(0);
  strokeWeight(5);
  fill("rgba(128,128,128,0)");
  image(tiles,1,80,200,40)
  rect(b3X,b3Y,b3Width,b3Height) //plataforma 3
  
  //chave/porta
  noStroke();
  fill("yellow")
  circle(xc,yc,25);
  
  noStroke()
  fill("rgba(255,255,255,0)")
  image(porta,25,5,50,90)
  rect(50,45,50,90)
  
  //jogador
  stroke(0);
  fill(150,0,170);
  rect(pX,pY,pWidth,pHeight);
  
  //chave sendo carregada
  if(chave == true){
    xc = pX+20;
    yc = pY;
  }
  
  //colissões
  
  //caixa1
  hit = collideRectRect(pX,pY,pWidth,pHeight,b1X-84.2,b1Y,bWidth,bHeight);
  if(hit && jump  == false){
    pY = b1Y-bHeight-20;
    velocidade = 0;
    contadorpulo = 0;
  }
  
  //caixa2
  hit = collideRectRect(pX,pY,pWidth,pHeight,b2X-84.2,b2Y,b2Width,b2Height);
  if(hit && jump == false){
    pY = b2Y-bHeight-20;
    velocidade = 0;
    contadorpulo = 0;
  }
  
  //caixa3
  hit = collideRectRect(pX,pY,pWidth,pHeight,b3X-84.2,b3Y,b3Width,b3Height);
  if(hit){
    pY = b3Y-b3Height-20;
    velocidade = 0;
    contadorpulo = 0;
  }
  
  //chave
  hit = collideRectCircle(pX,pY,pWidth,pHeight,xc,yc,25);
  if(hit){
    chave = true;
    print("pegou a chave", chave);
    text("a resposta é 3,pois todo numero vezes 1 é ele mesmo",pX,pY,400,300) //resposta
  }
  //porta
  hit = collideRectRect(pX,pY,pWidth,pHeight,50,45,50,50);
  if (hit && chave == true){
    xc = 800;
    yc = 800;
    tela = 5
  } else if (hit == true && chave == false){
    stroke("black");
    fill("white");
    text("necessario chave",250,150);
  } 
}

//fase 2
function Fase2(){
   
 b1X = 130;
 b1Y = 400;
 bWidth = 200;
 bHeight =40;
 b2X = 385;
 b2Y = 250;
 b2Width = 200;
 b2Height = 40;
 b3X = 250;
 b3Y = 100;
 b3Width = 180;
 b3Height = 40;
 

 

  
  rectMode(CENTER);
  textAlign(CENTER);
  background(tparede); //parede da torre
  noStroke();
  fill("grey");
  rect(width/2,550,width,100); //chão
  //objetivo da fase
  noStroke()
  fill("rgba(204,190,190,0.75)")
  text("Derrote o inimigo para saber o resultado de 3x5!",380,500,250,400)
   //janela
  noFill();
  stroke(0);
  strokeWeight(15);
  rect(width/2,height/2,width,height);
  
  //jogador
  noStroke();
  fill(150,0,170);
  rect(pX,pY,pWidth,pHeight);
  
  //inimigo
  noStroke();
  fill("red");
  rect(iX,iY,iWidth,iHeight)
  
  //caixasFase 2
  stroke(0);
  strokeWeight(5);
  fill("rgba(128,128,128,0)")
  image(tiles,30,380,200,40)
  rect(b1X,b1Y,bWidth,bHeight); //plataforma 1
  
  stroke(0);
  strokeWeight(5);
  fill("rgba(128,128,128,0)");
  image(tiles,285,230,200,40)
  rect(b2X,b2Y,b2Width,b2Height); //plataforma 2
  
  stroke(0);
  strokeWeight(5);
  fill("rgba(128,128,128,0)");
  image(tiles,150,80,200,40)
  rect(b3X,b3Y,b3Width,b3Height) //plataforma 3
  
   //chave/porta
  
  noStroke();
  fill("rgba(165,42,42,0)")
  image(porta,225,5,50,90)
  rect(250,45,50,90)
  
  
 
  
  
  //colissoes fase 2
   //caixa1
  hit = collideRectRect(pX,pY,pWidth,pHeight,b1X-84.2,b1Y,bWidth,bHeight);
  if(hit && jump  == false){
    pY = b1Y-bHeight-20;
    velocidade = 0;
    contadorpulo = 0;
  }
  
  //caixa2
  hit = collideRectRect(pX,pY,pWidth,pHeight,b2X-84.2,b2Y,b2Width,b2Height);
  if(hit && jump == false){
    pY = b2Y-bHeight-20;
    velocidade = 0;
    contadorpulo = 0;
  }
  
  //caixa3
  hit = collideRectRect(pX,pY,pWidth,pHeight,b3X-84.2,b3Y,b3Width,b3Height);
  if(hit){
    pY = b3Y-b3Height-20;
    velocidade = 0;
    contadorpulo = 0;
  }
  
  
  
  //porta
  hit = collideRectRect(pX,pY,pWidth,pHeight,250,45,50,50);
  if (hit == true && iX == 10000){
    tela = 7
  } else if (hit == true && iX != 10000){
    stroke("black");
    fill("white");
    text("Inimigo não derrrotado",250,150);
  } 

  //atingindo inimigo
  hit = collideRectRect(pX,pY,pWidth,pHeight,iX,iY,iWidth,iHeight);
  if (hit == true){
    if(pY <= iY){
      iX = 10000
      iM = true
    }else  {
      tela = 8
    }
  }
  if ( iM == true){
    stroke("black");
    fill("purple")
    text("O resultado é 15, todos os numero multiplicados por 5 terminam em 0 ou 5!",pX,pY,400,300);
  }
  
  //inimigo se movendo
  iX = iX + (ivelocidade*idireção);
  if (iX >= iposição+idistancia || iX <= iposição-idistancia){
   idireção = idireção*-1;
  }
}
/*/fase 3 fase descartada
function Fase3(){
  
 b1X = 100;
 b1Y = 420;
 bWidth = 200;
 bHeight =40;
 b2X = 385;
 b2Y = 350;
 b2Width = 200;
 b2Height = 40;
 b3X = 250;
 b3Y = 250;
 b3Width = 180;
 b3Height = 20;
 b4X = 100
 b4Y = 100
 b4Width = 200
 b4Height = 40
 b5X = 400
 b5Y = 100
 b5Width = 200
 b5Height = 40
 xC = 100
 yC= 70
  chave2= false
  
  
  rectMode(CENTER);
  textAlign(CENTER);
  background(tparede); //parede da torre
  noStroke();
  fill("grey");
  rect(width/2,550,width,100); //chão
   //janela
  noFill();
  stroke(0);
  strokeWeight(15);
  rect(width/2,height/2,width,height);
  
  //jogador
  stroke(0);
  fill(150,0,170);
  rect(pX,pY,pWidth,pHeight);
  
  //caixasFase 3
  stroke(0);
  strokeWeight(5);
  fill("rgba(128,128,128,0)")
  image(tiles,8,400,200,40)
  rect(b1X,b1Y,bWidth,bHeight); //plataforma 1
  
  stroke(0);
  strokeWeight(5);
  fill("rgba(128,128,128,0)");
  image(tiles,285,330,200,40)
  rect(b2X,b2Y,b2Width,b2Height); //plataforma 2
  
  stroke(0);
  strokeWeight(5);
  fill("rgba(128,128,128,0)");
  image(tiles,160,240,180,20)
  rect(b3X,b3Y,b3Width,b3Height) //plataforma 3
  
  stroke(0);
  strokeWeight(5);
  fill("rgba(128,128,128,0)");
  image(tiles,5,80,200,40)
  rect(b4X,b4Y,b4Width,b4Height);//plataforma 4
  
  stroke(0);
  strokeWeight(5);
  fill("rgba(128,128,128,0.01)");
  image(tiles,300,80,200,40)
  rect(b5X,b5Y,b5Width,b5Height);//plataforma 5
  
  // chave/porta
  noStroke();
  fill("yellow")
  circle(xC,yC,25);
  stroke("grey");
  fill("brown")
  rect(450,500,50,90)
  
    //chave sendo carregada
  if(chave2 == false){
    xC = pX+20;
    yC = pY;
  }
  
  //colissoes fase 3
   //caixa1
  hit = collideRectRect(pX,pY,pWidth,pHeight,b1X-84.2,b1Y,bWidth,bHeight);
  if(hit && jump  == false){
    pY = b1Y-bHeight-20;
    velocidade = 0;
    contadorpulo = 0;
  }
  
  //caixa2
  hit = collideRectRect(pX,pY,pWidth,pHeight,b2X-84.2,b2Y,b2Width,b2Height);
  if(hit && jump == false){
    pY = b2Y-bHeight-20;
    velocidade = 0;
    contadorpulo = 0;
  }
  
  //caixa3
  hit = collideRectRect(pX,pY,pWidth,pHeight,b3X-84.2,b3Y,b3Width,b3Height);
  if(hit && jump == false){
    pY = b3Y-b3Height-30;
    velocidade = 0;
    contadorpulo = 0;
  }
  
  //caixa4 
  hit = collideRectRect(pX,pY,pWidth,pHeight,b4X-84.2,b4Y,b4Width,b4Height);
  if(hit && jump == false){
    pY = b4Y-b4Height-20;
    velocidade = 0;
    contadorpulo = 0;
  }
  
  //caixa5 
  hit = collideRectRect(pX,pY,pWidth,pHeight,b5X-84.2,b5Y,b5Width,b5Height);
  if(hit && jump == false){
    pY = b5Y-b5Height-20;
    velocidade = 0;
    contadorpulo = 0;
  }
  
  //chave
  hit = collideRectCircle(pX,pY,pWidth,pHeight,xC,yC,25);
  if(hit){
    chave2 = true;
    print("pegou a chave", chave);
  }
  
  //porta
  hit = collideRectRect(pX,pY,pWidth,pHeight,450,500,50,50);
  if (hit == true && chave2 == true){
    xC = 800;
    yC = 800;
    tela = 7
  } else if (hit == true && chave2 == false){
    stroke("black");
    fill("white");
    text("necessario chave",450,500);
  } 
  
  
}*/
//gravidade
function gravity(){
  if(pY >= minaltura && jump == false){
    pY = pY
    contadorpulo = 0;
  }
  else{
  pY = pY + (direction+velocidade); //gravidade funcionando
  }
  
  //pulo
  if(jump == true){
    if(pY <= maxaltura || contadorpulo >= forcadopulo){
      if(pY >= minaltura){
        pY = minaltura;
      }
      else{
      velocidade = queda;
        }
      }
    else{
    velocidade = -forcadopulo;
      contadorpulo = contadorpulo+1;
      }
  }
  else{
    velocidade = queda
  } 
}


//movimento
function keyPressed(){
  if (kb.pressing('a')) {
		pX = pX-=5
  }
  if(kb.pressing('d')){
    pX = pX+=5
  }
}
function keyTyped(){
  if(kb.pressing('w')){
    jump = true; // pulo
  }
  else{
    jump = false;
  }
  //if(b1Y == pY && b1X )
}

//instruções
function Instruções(){
  background(torre);
  textAlign(CENTER,TOP);
  textSize(25);
  stroke("white")
  fill("black")
  text("Use os comandos do teclado: ",130,20,250,250);
  
  textAlign(CENTER,CENTER);
  textSize(20);
  stroke("white");
  fill("black");
  text("tecla A para andar para o lado esquerdo",130,20,250,250)
  
  textAlign(CENTER,BASELINE);
  textSize(20);
  stroke("white");
  fill("black");
  text("tecla D para andar para o lado direito",130,200,250,250)
  
  textAlign(CENTER,BOTTOM);
  textSize(20);
  stroke("white");
  fill("black");
  text("tecla W para pular",130,30,250,250)
  text("Objetivo: pegar a chave,subir os obstaculos e chegar na porta para a proxima fase.",130,155,250,250)
  text("Apert ENTER para voltar", 130,200,250,250)
  
  if(keyIsDown(ENTER)){
      tela = 1;
    }
}

//creditos
function Creditos(){
  background(torre);
  stroke("rgb(255,255,255)");
  fill("rgb(2,0,0)");
  text("Programadora: Alexa Nascimento Borges",100,50,200,150);
  text("Professor: Rummenigge Rudson Dantas",100,250,200,150);
  text("Apert ENTER para voltar", 100,450,200,150)
  
  image(programador,350,100,100,100);
  image(professor,350,250,100,100);
  
  if(keyIsDown(ENTER)){
    tela = 1
  }
}

//fim do jogo
function Fim(){
  background(torre)
  stroke("black");
  fill("yellow");
  text("Parabens, você terminou o jogo",250,150);
  text( "Aperte ENTER para voltar ao menu",250,200);
  
  if(keyIsDown(ENTER)){
    tela = 1;
  }

 lrect = 200;
 arect = 50;
 xopção = 150;
 yiniciar = 85;
 yinfo = 150;
 ycred = 210;
 yvoltar = 10

//jogador
 pX = 350
 pY = 480
 pWidth = 30
 pHeight = 70


 iX = 385
 iY = 200
 iWidth = 30
 iHeight = 70
 iposição = 385;
 ivelocidade = 2;
 idireção = 1
 idistancia = 50
 iM = false
 jump = false; 
 direction = 1;
 velocidade = 2;
 forcadopulo = 15;
 queda = 2
 minaltura = 500; 
 maxaltura = 50;
 contadorpulo = 0;
chave = false
chave2 = false
xc = 50
yc =500
xC =350
yC=500

  
}

//Game Over
function GameOver(){
  background(torre);
  stroke("black");
  fill("white");
  text ("Game Over",250,150)
  text ("aperte ENTER para voltar",250,200);
  if(keyIsDown(ENTER)){
    tela = 1
  }
  
  lrect = 200;
 arect = 50;
 xopção = 150;
 yiniciar = 85;
 yinfo = 150;
 ycred = 210;
 yvoltar = 10

//jogador
 pX = 350
 pY = 480
 pWidth = 30
 pHeight = 70


 iX = 385
 iY = 200
 iWidth = 30
 iHeight = 70
 iposição = 385;
 ivelocidade = 2;
 idireção = 1
 idistancia = 50
 iM = false
 jump = false; 
 direction = 1;
 velocidade = 2;
 forcadopulo = 15;
 queda = 2
 minaltura = 500; 
 maxaltura = 50;
 contadorpulo = 0;
chave = false
chave2 = false
xc = 50
yc =500
xC =350
yC=500

}
var progreso;
var progresos = [];
var numProgresos = 4;
var duques = []; //variable que guarda la lista de Duques
var numDuques = 0; //numero de Duques creados
var estado = 0; //estado del juego
var x, y; //variable para la posicion de Colombia en x y en y;
var velx1, vely1; //variables para velocidad o cambio de posicion en el tiempo
var tam1 = 50; //variable tamaño de Colombia
var x1, y1; //variables para posicion de la elipse
var tam; //variable para tamano de la elipse
var bolas = []; //variable que guarda la lista de bolas
var numBolas = 10; //numero de bolas creadas
var miliseg = 0;
var progressCount = 0;
var himno;
var fondo;
var win;
var lose;
var lvlup;

//Carga todas las imagenes antes de comenzar a dibujar
function preload() {
  duque = loadImage('assets/duque.png');
  colombia = loadImage('assets/colombia.png');
  progresito = loadImage('assets/progreso.png');
  uribe = loadImage('assets/uribe.png');
  inicio = loadImage('assets/inicio.png');
  nivel1 = loadImage('assets/pantalla1.png');
  perdiste = loadImage('assets/perdiste1.png');
  nivel2 = loadImage('assets/nivel2.png');
  ganar = loadImage('assets/ganaste.png');
  himno = loadSound('assets/himno.mp3');
  fondo = loadSound('assets/fondo.mp3');
  win = loadSound('assets/ganaste.mp3');
  lose = loadSound('assets/perdiste.m4a');
  plop = loadSound('assets/plop.m4a');
  lvlup = loadSound('asset/level2.mp3');
}

function setup() {
 

  //Tamaño del canvas es el tamaño de ventana
  createCanvas(768, 1024); //crea un canvas de pantalla completa
  background(255);
  noStroke();
  //configura el texto para que se dibuje con respecto al centro
  textAlign(CENTER);

  //inicia las posiciones "x" y "y" en el centro de la pantalla
  x = width / 2;
  y = height - 10;
  
  //inicia posiciones x2 y2 en el centro a la izquierda de la pantalla
  x2 = 10;
  y2 = height/2;

  //la velocidad inicial es 0
  velx1 = 0;
  vely1 = 0;

  //Crea los 4 progresos
  progreso = new progress();
  for (var i2 = 0; i2 < 4; i2 = i2 + 1) {
    progresos[i2] = new progress(progress.x, progress.y);

    //inicializa las variables de posicion y tamano
    x1 = width / 2;
    y1 = height / 2;
    tam = 60;

    //crea las bolas de la lista
    for (var i = 0; i < numBolas; i++) {
      bolas[i] = new bola();
    }

  }
  
  tiempoAnterior = millis();
  tiempoAnterior1 = second();
}
//Carga las imágenes usadas en el juego

function draw() {

  //Estado 0 que es la pantalla inicial, muestra instrucciones 
  if (estado == 0) {

image(inicio,0,0,768,1024);
x2 = 10;
y2 = height/2;
x = width / 2;
y = height - 10;
  progressCount = 0;
          if (himno.isPlaying() == false) {
        himno.play(0);
      } 
  }



  //Estado 1, acá comienza el juego 
  else if (estado == 1) {
    image(nivel1,0,0,768,1024);
    fill(255, 150);
    rect(0, 0, width, height);
    fill(0);
    himno.pause();
    //Muestra el puntaje en pantalla
text(progressCount, width / 2, height / 2.5);
    comenzar();
    //asigna valores a la velocidad de acuerdo a la rotación del dispositivo
    velx1 = map(rotationY, -90, 90, -20, 20);
    vely1 = map(rotationX, -90, 90, -20, 20);

    //Dibuja la imagen de Colombia
    image(colombia, x, y, tam1, tam1);

    //suma la velocidad en x y en y a 
    x = x + velx1;
    y = y + vely1;

    //evita que las posiciones se salgan del canvas
    x = constrain(x, 1, (windowWidth - tam1));
    y = constrain(y, 1, (windowHeight - tam1));

	  //Dibuja los progresos y los hace morir cuando se toca con Colombia,
    //crea un conteo cada vez que Colombia toca los progresos, cuando
    //haya tocado los 4, puede pasar de nivel (cambiar de estado)
    for (i2 = 0; i2 < 4; i2 = i2 + 1) {
        progresos[i2].mostrar();
      if (dist(progresos[i2].x, progresos[i2].y, x, y) < progresos[i2].tam) {
        progresos[i2].morir();
      }
      if(progresos[i2].estaVivo != progresos[i2].estaVivoAntes){
         progressCount = progressCount + 1;
         progresos[i2].estaVivoAntes = progresos[i2].estaVivo;
        	plop.play();
         }
      if (progressCount == 4){
      estado = 4; 
        lvlup.play();
      }

    }
if (fondo.isPlaying() == false) {
        fondo.play();
      } 
    //El estado 2 es cuando se gana
  } else if (estado == 2) {
    if (win.isPlaying() == false) {
        win.play();
      } 
    //Resetea los valores de progresos para que se muestren de nuevo
    for (i2 = 0; i2 < 4; i2 = i2 + 1) {
    progresos[i2].estaVivoAntes = true;
		progresos[i2].estaVivo = true;
    progresos[i2].mostrar();
 	 	//variables de posicion, los progresos se crean entre 0 y el ancho
  	//de ventana y entre el alto de ventana-200 y el alto - 50
  	progresos[i2].x = random(0, windowWidth);
  	progresos[i2].y = random(windowHeight - 200, windowHeight - 50);
     }
    fondo.pause();
    //Resetea el conteo de progresos a 0
    progressCount = 0;
    //Imagen donde dice que se ganó
	image(ganar,0,0,768,1024);
    //El estado 3 es cuando se pierde, si toca Duque a Colombia
  } else if (estado == 3) {
        if (lose.isPlaying() == false) {
        lose.play();
      } 
    //Resetea los valores de progresos para que se muestren de nuevo
            for (i2 = 0; i2 < 4; i2 = i2 + 1) {
		  progresos[i2].estaVivo = true;
      progresos[i2].mostrar();
      progresos[i2].estaVivoAntes = true;
 	 	//variables de posicion, los progresos se crean entre 0 y el ancho
  	//de ventana y entre el alto de ventana-200 y el alto - 50
  	progresos[i2].x = random(0, windowWidth);
  	progresos[i2].y = random(windowHeight - 200, windowHeight - 50);
     }
    //Resetea el conteo de progresos a 0
    progressCount = 0;
    //Imagen de pérdida
    fondo.pause();
	image(perdiste,0,0,768,1024);
    
    //Reinicia los Uribes para que creen en otros lugares random
    for (var i = 0; i < numBolas; i++) {
    bolas[i].x = random(tam1+10, width);
  	bolas[i].y = random(height);
    }

    
    
  	//El estado 5 es el segundo nivel
  } else if (estado == 5) {
      //texto   
	image(nivel1, 0, 0, 768,1024);
  fill(255);
  noStroke();
	miliseg = floor(millis() - tiempoAnterior);
	text(miliseg, width / 2, height / 2);

    //Dibuja la imagen de Colombia
    image(colombia, x2, y2, tam1, tam1);


   //llama a las funciones mostrar y mover de cada una de las bolas en la lista
  for (var i = 0; i < numBolas; i++) {
    bolas[i].mostrar();
    bolas[i].mover();

    if (miliseg >= 20000){
  estado = 2;
}
    //revisa si se estaba tocando alguna bola y en tal caso la mata
    //se usa touches[0] porque se asume que solo hay un toque a la vez
    //si se tocan se pierde, o sea se va al estado 3
    if (dist(x2, y2, bolas[i].x, bolas[i].y) < bolas[i].tam) {
      estado = 3;
    }
  }
  }
  
  //El estado 4 son las instrucciones del nivel 2
  else if (estado == 4) {
 image(nivel2, 0, 0, 768, 1024);
  }


  //llama a las funciones mostrar, mover y morir de cada uno de los Duques en la lista
  for (var i = 0; i < numDuques; i++) {
    duques[i].mostrar();
    duques[i].mover();
    duques[i].morir();
    if (dist(duques[i].x, duques[i].y, x, y) < duques[i].tam) {
      estado = 3;
    }
  }


  
}


//función Duque
function presidente(px, py) {

  //variables de posicion, Duque se crea entre 0 y el ancho de la ventana
  //y entre la posición 0-50 en Y
  this.x = random(0, windowWidth);
  this.y = random(0, 50);

  //variables de velocidad que recibe la funcion
  this.velx = px;
  this.vely = py;

  //variable de tamano aleatorio entre 30 y 60
  this.tam = random(30, 60);


  //función que dibuja a Duque
  this.mostrar = function() {
    image(duque, this.x, this.y, this.tam, this.tam);
  }

  //función que mueve a Duque
  this.mover = function() {

    //el movimiento se asigna por la posicion + la velocidad
    this.x = this.x + this.velx;
    this.y = this.y + this.vely + 1;

    //aumenta la velocidad en Y constantemente para dar un efecto de gravedad
    this.vely += 0.5;

    //condicionales para que rebote Duque
    if (this.x > width || this.x < 0) {
      this.velx *= -1;
    }
    if (this.y > height || this.y < 0) {
      this.vely *= -1;
    }
  }

  //reduce el tamano de Duque hasta llegar a 0
  this.morir = function() {
    if (this.tam >= 0) {
      this.tam -= 0.3;
    }
  }
}

//funcion que se activa si se acaba el toque en la pantalla
function touchStarted() {
  //comenzar el juego cuando se está en el estado inicial
  if (estado == 0) {
    estado = 1;
    tiempoAnterior1 = second();
    himno.stop();
  } 
  //Pasar de las instrucciones al nivel 2 con un toque
  else if (estado == 4) {
    estado = 5;
    tiempoAnterior = millis();
    plop.play();
  }
  //Reiniciar el juego cuando ganó
  else if (estado == 2) {
    estado = 0;
    win.stop();
  }
  
  //reiniciar el juego cuando ya se perdió
  if (estado == 3) {
    estado = 0;
    lose.stop();
  }
  

  
}

//Función para comenzar a dibujar Duques en la pantalla
function comenzar() {

  //solo se pueden crear Duques en frames multiplos de 10, 
  //esto hace que no se puedan crear Duques tan seguido
  if (frameCount % 30 != 0) {
    return;
  }

  //posicion actual del raton
  var x1 = 50;
  var y1 = 50;

  //posicion anterior del raton
  var x2 = 50;
  var y2 = 50;

  //la velocidad se mide restando la posicion guardada del mouse con la posición que se habia guardado de este
  var velx = x1 - x2;
  var vely = y1 - y2;

  // se crea un nuevo Duque que recibe por parametro las velocidades en x y y del mouse
  duques[numDuques] = new presidente(velx, vely);
  //aumenta el numero de Duques de la lista
  numDuques++;
}



//función progreso
function progress(px, py) {

  this.estaVivo = true;
  //variables de posicion, los progresos se crean entre 0 y el ancho
  //de ventana y entre el alto de ventana-200 y el alto - 50
  this.x = random(0, windowWidth);
  this.y = random(windowHeight - 200, windowHeight - 50);

  //variable de tamano aleatorio entre 30 y 60
  this.tam = random(30, 60);
	
  
  
  this.estaVivoAntes = true  
  
  //función que dibuja los progresos
  this.mostrar = function() {
    if (this.estaVivo == true) {
      image(progresito, this.x, this.y, this.tam, this.tam);
    }
  }
  this.morir = function() {
    this.estaVivo = false;
  }
}
//esta funcion se activa cuando el dispositivo reconoce que se movio un toque en la pantalla
function touchMoved() {

    //revisa si se estaba tocando la bola
    //se usa touches[0] porque se asume que solo hay un toque a la vez
    if (dist(touches[0].x, touches[0].y, x2, y2) < tam) {

      //actualiza la posicion de la elipse con la posicion del toque
      x2 = touches[0].x;
      y2 = touches[0].y;
    }
  //para no mover la pantalla del explorador
  return false;
}

//funcion bola
function bola() {

  //variable que indica si esta viva o muerta
  this.viva = true;

  //variables de posicion, la bola se crea en una posicion aleatoria en X y Y
  this.x = random(tam1+10, width);
  this.y = random(height);

  //asigna valores de velocidad a la bola. aleatorios entre -2 y 2
  this.velx = random(-2, 2);
  this.vely = random(-2, 2);

  //variable de tamano
  this.tam = 50;

  //funcion que muestra la bola
  this.mostrar = function() {

    stroke(255);
    strokeWeight(4);

    //si esta viva la pinta azul, de lo contrario la pinta de rojo

    image(uribe,this.x, this.y, this.tam, this.tam);
  }

  //funcion que mueve la bola
  this.mover = function() {

    //solo se mueve si esta viva

      //el movimiento se asigna por la posicion + la velocidad
      this.x = this.x + this.velx;
      this.y = this.y + this.vely;

      //condicionales para que rebote la bola
      if (this.x > width - this.tam / 2 || this.x < this.tam / 2) {
        this.velx *= -1;
      }
      if (this.y > height - this.tam / 2 || this.y < this.tam / 2) {
        this.vely *= -1;
      }
    }
}

function mouseDragged() {
  //prevent default

  return false;

}


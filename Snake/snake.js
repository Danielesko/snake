class juego{
    snake = [];
    comida = null;
    director = null;
    direccion = 2;
    tamano = 10;
    canvas = null;
    perdida = false;
    cabeza = new Image();
    cola = new Image();
    galleta = new Image();
    derrota = new Image();
    //sonido = new sound("multimedia/Grito.m4a");
    direcciones = ["","Arriba","Derecha","Abajo","Izquierda"];
    constructor(txtButton,txtState,canvas){
        this.txtButton = txtButton;
        this.txtState = txtState;
        this.canvas = canvas;

        // obligatorio tener un contexto para el canvas
        this.ctx = this.canvas.getContext("2d");

        //añadir ruta para las imagenes
        this.cabeza.src = "multimedia/cabeza.png";
        this.cola.src = "multimedia/cola.png";
        this.galleta.src = "multimedia/galleta.png";
        this.derrota.src = "multimedia/derrota.webp";
    }
    // funcion para iniciar la partida
    start(){
        //defines la posicion de la serpiente y se la añades al array
        let cuadrado = new Object();
        cuadrado.X = 15;
        cuadrado.Y = 15;
        cuadrado.X_antiguo = 15;
        cuadrado.Y_antuguo = 15;
        this.snake.push(cuadrado);
        // obtener tecla pulsada
        document.addEventListener("keypress",(e)=>{
            this.mostrarTecla(e.key);
            // En este switch se eligen las direcciones a las que puede ir segun este yendo actualmente
            switch(e.key){
                case "w":
                    if(this.direccion !=3)
                    this.direccion =1;
                break;
                case "d":
                    if(this.direccion !=4)
                    this.direccion =2;
                break;
                case "s":
                    if(this.direccion !=1)
                    this.direccion =3;
                break;
                case "a":
                    if(this.direccion !=2)
                    this.direccion =4;
                break;
            }
        });
        // cada 100 mls revisa si ha muerto
        this.director = setInterval(()=>{
            if(!this.perdida){
                this.continua();
                this.mostrar();
            }else{
                //si pierde limpia el intervalo, limpia el canvas y muestra la pantalla de derrota
                clearInterval(this.director);
                this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
                this.ctx.drawImage(this.derrota,0,0);
            }
        }, 100);
    }
    continua(){
        this.mostrarDireccion();
        //crear comida si es null
        if(this.comida == null){
            this.conseguirGalletas();
        }
        //verificar posicion de la serpiente
        this.snake.map( (cuadrado)=>{
            cuadrado.X_antiguo = cuadrado.X;
            cuadrado.Y_antuguo = cuadrado.Y;
        })
        //movemos la posicion de la serpiente
        switch(this.direccion){
            case 1:
                this.snake[0].Y--;
                break;
            case 2:
                this.snake[0].X++;
                break;
            case 3:
                this.snake[0].Y++;
                break;
            case 4:
                this.snake[0].X--;
                break;
        }
        //reubicar la cola de la serpiente
        this.snake.map((cuadrado,index,snake1)=>{
            if(index!=0){
                cuadrado.X = snake1[index -1].X_antiguo;
                cuadrado.Y = snake1[index -1].Y_antiguo;
            }
        });
        if(this.comida !=null){
            this.comerGalletas();
        }
    }
    mostrar(){
        //limpia el canvas todo el rato para poder mostrar la vibora
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        // dibujamos la serpiente
        this.snake.map((cuadrado, index)=>{
            //es la cabeza de la serpiente
            if(index == 0){
                this.ctx.drawImage(this.cabeza,cuadrado.X*this.tamano,cuadrado.Y*this.tamano);
            }else{ //es la cola de la serpiente
                this.ctx.drawImage(this.cola,cuadrado.X*this.tamano,cuadrado.Y*this.tamano);
            }
            // mostrar las galletas
            if(this.comida!=null){
                this.ctx.drawImage(this.galleta, this.comida.X*this.tamano,this.comida.Y*this.tamano);
            }
        })
    }
    comerGalletas(){ // verificar cuando come, teniendo en cuenta que la cabeza de la serpiente y la galleta estan en el mismo sitio
        if(this.snake[0].X == this.comida.X && this.snake[0].Y == this.comida.Y){
            this.comida = null;
        }
        let cuadrado2 = new Object();
        cuadrado2.X = this.snake[this.snake.length - 1].X_antiguo;
        cuadrado2.Y = this.snake[this.snake.length - 1].Y_antiguo;
        this.snake.push(cuadrado2);
    }
    conseguirGalletas(){//obtener comida en una posicion aleatoria
        var cuadrado1 = new Object();
        cuadrado1.X = Math.floor(Math.random()*30);
        cuadrado1.Y = Math.floor(Math.random()*30);
        this.comida = cuadrado1;
    }
    mostrarDireccion(){
        this.txtState.value = this.direcciones[this.direccion];
    }
    mostrarTecla(txt){
        this.txtButton.value = txt;
    }
}
//crear un objeto juego
var j1 = new juego(document.getElementById("txtButton"),document.getElementById("txtState"),document.getElementById("canvas"));
//inicializar el juego
j1.start();
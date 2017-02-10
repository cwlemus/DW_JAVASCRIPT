

//objeto calculadora
var calculadora = {
  //variable que contiene numero 1 a operar
  numero1:0,
  //variable que contiene numero 2 a operar
  numero2:0,
  //variable que contiene resultado de operacion
  resultado:0,
  //numero ingresado por el usuario
  numero:0,
  //tecla que indica si se realizará una operacion sobre un resultado obtenido
  teclaPrevia:"",
  //tipo de operacion a realizar
  tipoOperacion:"",
  //indica si el punto ya fue presionado
  puntoYa:0,
  //para asegurar que se presione solamente una vez el signo
  pulsacionSigno:0,

  inicializacion: function(e){

        if(e.id=="punto"){
          this.puntoYa+=1;
        }
      //asignacion de numero capturado
      this.asignacionNumeroPresionado(e.id);

      //mostrar numero presionado en pantalla
      this.mostrarNumeroPantalla(e.id);

      //ejecutar operacion
      this.ejecutarOperacion(e.id);

  },
  sumar: function(){
    this.resultado=parseFloat(this.numero1)+parseFloat(this.numero2);
    return this.validarTamano(this.resultado);
  },
  restar: function(){
    this.resultado=this.numero1-this.numero2;
    return this.validarTamano(this.resultado);
  },
  multiplicar: function(){
    this.resultado=this.numero1*this.numero2;
    return this.validarTamano(this.resultado);
  },
  dividir:function(){
    this.resultado=this.numero1/this.numero2;
    return this.validarTamano(this.resultado);
  },

  //verifique que no muestre mas de 8 digitos
  validarTamano: function(n){
    num=n;
    n+="";
    if(n.length>8){
    num= parseFloat(n).toFixed(8-(parseInt(n)+".").length);
    }
    return num;
  },

  //reduce la tecla presionada
  reducirTamano: function(id){
    document.getElementById(id).style='padding:3px;';
  },

  //amplia la tecla presionada
  ampliarTamano: function(id){
       document.getElementById(id).style='padding:0px;';
  },

  //asignacion de numero presionado a variable
  asignacionNumeroPresionado: function(id){
    if(id.length==1 || id=="punto" || id=="signo"){

        if((id=="punto"  || id=="signo") && this.numero==0){
          this.numero=0
        }

        if(id=="punto" && this.puntoYa==1){
          this.numero+=".";
        }

        if(id=="signo" && this.numero!=0){
          this.numero=this.numero*(-1);
        }

        if(id!="punto" && id!="signo"){
          if(this.numero!=0 || this.puntoYa==1)
          {
              this.numero+=id;
          }else{
              this.numero=id;
          }


        }
    }
  },

  //mostrar numero en pantalla
  mostrarNumeroPantalla: function(id){
    if(id=="on"){
      document.getElementById('display').innerHTML="0";
      this.numero=0;
      this.puntoYa=0;
      this.numero1=0;
      this.numero2=0;
      this.resultado=0;
      this.pulsacionSigno=0;
    }
    else if(id.length==1 || id=="punto" || id=="signo" || id=="igual"){
      this.numero+="";      
        if(this.numero.length<=8)
          {
            document.getElementById('display').innerHTML=this.numero;
            this.pulsacionSigno=0;
          }
    }else{
        document.getElementById('display').innerHTML="";
    }
  },

  //ejectuar operacion
  ejecutarOperacion: function(id){
    switch (id) {
      case "mas":
          this.tipoOperacion="suma";
          this.teclaPrevia="s";
          this.pulsacionSigno+=1;
          if(this.pulsacionSigno==1) this.numero1=this.numero;
          this.puntoYa=0;
          this.numero=0;
        break;
      case "por":
          this.tipoOperacion="multiplicacion";
          this.pulsacionSigno+=1;
          if(this.pulsacionSigno==1) this.numero1=this.numero;
          this.teclaPrevia="m";
          this.puntoYa=0;
          this.numero=0;
        break;
      case "menos":
          this.tipoOperacion="resta";
          this.pulsacionSigno+=1;
          if(this.pulsacionSigno==1) this.numero1=this.numero;
          this.teclaPrevia="r";
          this.puntoYa=0;
          this.numero=0;
        break;
      case "dividido":
          this.tipoOperacion="division";
          this.pulsacionSigno+=1;
          if(this.pulsacionSigno==1) this.numero1=this.numero;
          this.teclaPrevia="d";
          this.puntoYa=0;
          this.numero=0;
        break;
      case "igual":
          if(this.numero!=0 && this.tipoOperacion!=""){
            if(this.teclaPrevia!="i")
              this.numero2=this.numero;
            else
              this.numero1=this.numero;

            //se realiza operacion y obtiene resultado
            switch (this.tipoOperacion) {
              case "suma":
                this.numero=this.sumar();
                //se imprime en pantalla el resultado
                document.getElementById('display').innerHTML=this.numero;
                break;
              case "resta":
                this.numero=this.restar();
                //se imprime en pantalla el resultado
                document.getElementById('display').innerHTML=this.numero;
                break;
              case "multiplicacion":
                this.numero=this.multiplicar();
                //se imprime en pantalla el resultado
                document.getElementById('display').innerHTML=this.numero;
                break;
              case "division":
                  if(this.numero2!=0){
                    this.numero=this.dividir();
                  }else{
                    this.numero='ERROR';
                  }
                  //se imprime en pantalla el resultado
                  document.getElementById('display').innerHTML=this.numero;
                break;
            }
            //se guarda la tecla igual por si es oprimida repetidas veces
            this.teclaPrevia="i";
            this.pulsacionSigno=0;
          }
    }
  }
}


//evento click
function reply_click(e) {
  e = e || window.event;
  e = e.target || e.srcElement;
  if(e.id!="raiz" && e.id!="calc" && e.id!="calc2" && e.id!="calc3"){
  calculadora.reducirTamano(e.id);
  //retraso 50 milisegundos la ampliacion de la tecla
  setTimeout(function(){calculadora.ampliarTamano(e.id)},50);
  calculadora.inicializacion(e);
  }
}

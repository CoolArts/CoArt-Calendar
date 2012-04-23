//Si te interesa el tuto y no sabes trabajar con fechas, revisa el tutorial
//"El Objeto Date, su m�todos, ejemplos pr�cticos y ejercicios" en Cristalab.com:
//url: http://foros.cristalab.com/el-objeto-date-su-metodos-ejemplos-practicos-y-ejercicios-t105282/

//Creamos la funcion principal
function caCal (fecha) {
	//Si no se pasa una fecha, se toma la fecha del d�a en curso
	if (!fecha) {fecha = new Date()};
	//Para nuestra comodidad almacenamos tambi�n la fecha subdividida en a�o, mes y d�a
	var ano = fecha.getFullYear(),
		mes = fecha.getMonth(),
		dia = fecha.getDate(),
		//Tambi�n almacenaremos los d�as de la semana en nuestro idioma
		//Y el nombre de los meses
		//M�s tarde podremos ampliar los idiomas haciendo un objeto con estos datos
		diasSemanaES = ['Lunes', 'Martes', 'Mi�rcoles', 'Jueves', 'Viernes', 'S�bado', 'Domingo'],
		mesesES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
		//Por �ltimo vamos a hacer lo mismo con los d�as de los meses
		diasMeses = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		
	//Vamos a empezar por crear la funciones que nos har�n falta
	//Al final del tutorial estas funciones ser�n m�todos del plug-in
	//Con las que el usuario podr� trabajar con fechas a su antojo
	
	//Tenemos un problema, nuestros d�as de la semana empiezan en lunes,
	//sin embargo, los d�as de la semana del objeto Date comienzan en domingo,
	//por lo que tendremos que configurar un peque�o fix para obtener el d�a correcto.
	//As� que empezaremos por crear la funci�n que nos devolver� los d�as semanales correctos
	//Le tendremos que pasar obligatoriamente un objeto Date
	function calcularDiaSemanal(fechaPasada) {
		//Si no recibimos la fecha lanzamos una excepci�n a la consola y devolvemos false
		if (!fechaPasada) {
			console.log('Error en funcion:\nCalcularComienzoPrimeraSemana\n\nFecha requerida');
			return false;
		};
		//Almacenamos el n�mero de d�a semanal en una variable
		var diaSemana = fechaPasada.getDay();
		//Ahora efectuamos el cambio de los n�meros
		//Si el d�a obtenido es 0 lo convertiremos en 6,
		//si es cualquier otro le restaremos 1, as� el lunes ser� 0 y el domingo 6
		if (diaSemana == 0) {diaSemana = 6}
		else {diaSemana --};
		//Y por �ltimo devolvemos el d�a fixeado
		return diaSemana;
	}
	
	//Ahora crearemos una funci�n que nos devolver� cantidades de d�as de meses completos
	//Le pasaremos un array con fechas
	//Si le pasamos s�lo una fecha, nos devolver� los d�as de ese mes
	//Si le pasamos m�s de una, nos devolver� la suma de todos los d�as de esos meses
	function calcularDiasMeses (arrayFechas) {
		//Si no hay array o est� vac�o lazamos una excepci�n a la consola
		if (!arrayFechas || arrayFechas.length < 1) {
			alert('Error en funcion:\ncalcularDiasMes\n\nSe requiere m�nimo una fecha')
		};
		//Declaramos la variable totalDias, y le iremos sumando los d�as de los meses,
		//Finalmente la devolveremos
		var totalDias = 0;
		//Ahora revisamos cada posici�n del array
		for (d in arrayFechas) {
			//Declaramos una variable y la igualamos a 0,
			//en ella almacenaremos un 1 si el a�o de la fecha es bisiexto
			var bisiexto = 0,
			//Obtenemos el a�o de la fecha actual
				anoArray = arrayFechas[d].getFullYear();
			//Comprobamos si el a�o es bisiexto, y si lo es...
			if (anoArray%4 == 0 && anoArray%100 != 0 || anoArray%400 == 0) {bisiexto = 1};
			//le sumamos la variable bisiexto a febrero,
			diasMeses[1] += bisiexto;
			//e incrementamos totalDias, los d�as del mes correspondiente
			totalDias += diasMeses[arrayFechas[d].getMonth()];
			//Reestablecemos Febrero
			diasMeses[1] = 28;
		}
		//Por �ltimo devolvemos la suma total
		return totalDias;
	}
	
	//Ahora crearemos una funci�n que nos calcular� cuantas semanas abarca el mes de una fecha que le pasemos,
	//El n�mero de semanas puede variar entre 4 y 6.
	function calcularSemanasCalendario (fechaPasada) {
		//Como siempre comenzaremos por configurar nuestra excepci�n
		if (!fechaPasada) {console.log('Error en funcion:\ncalcularSemanasCalendario\n\nFalta el objeto Date')};
		//Lo primero que necesitamos saber es en que d�a semanal comienza el mes
		//As� que, vamos a echar mano de nuestra funci�n "calcularDiaSemanal()"
		var diaSemanal = calcularDiaSemanal(new Date(fechaPasada.getFullYear(), fechaPasada.getMonth(), 1));
		//Y despu�s necesitaremos saber los d�as de nuestro mes, usaremos nuestra funci�n "calcularDiasMeses()"
		var diasTotales = calcularDiasMeses([fechaPasada]);
		//Ahora vamos a restarle a d�asTotales, 7 menos el d�a semanal
		var restoDeDias = diasTotales - (7 - diaSemanal);
		//Y vamos a devolver 1 + restoDeDias divido por 7 redondeado hacia arriba,
		//Este ser� el numero de semanas que tiene nuestro mes
		return 1+(Math.ceil(restoDeDias/7));
	}
	
	//Y por �ltimo una funci�n que nos ayudar� a trabajar con milisegundos
	//Esta funci�n est� explicada al final de este tutorial, en el ejercicio 2
	//url: http://foros.cristalab.com/el-objeto-date-su-metodos-ejemplos-practicos-y-ejercicios-t105282/
	function convertirMilisegundos (cantidad, unidad, modo) {
		if (arguments.length != 3) {
			console.log('La funci�n convertirMilisegundos requiere exactamente 3 par�metros\ncantidad, unidad, modo');
			return false
		}
		var valor = 0;
		switch (unidad) {
			case 'se': valor = 1000; break;
			case 'mi': valor = 60000; break;
			case 'ho': valor = 3600000; break;
			case 'di': valor = 86400000; break;
			case 'an': valor = 31536000000; break;
		}
		switch (modo) {
			case 'miliUni': return catidad/valor; break;
			case 'uniMili': return catidad*valor; break;
		}
	}
	
	/*
	Bien, ahora que tenemos todas las funciones, vamos a dibujar nuestro calendario.
	De momento no nos interesa lo bonito u horripilante que pueda quedar,
	lo que nos interesa es rellenarlo con los datos que necesitemos, ya nos ocuparemos de los estilos al final.
	Vamos a necesitar un contenedor donde meterlo y opcionalmente la medida del ancho completo,
	el alto variar� en funci�n de las semanas que tenga el mes y el ancho que tenga el calendario,
	por lo que le pasaremos los par�metros contenedor y anchoContenedor.
	*/
	
	//Tambi�n le vamos a a�adir los nuevos par�metros a nuestra funci�n principal
	//ANTES:
	function caCal (fecha) {'...'}
	//AHORA:
	function caCal (contenedor, anchoContenedor, fecha) {'...'}
	//dejaremos anchoContenedor y fecha al final, ya que ser�n par�metros opcionales
	
	//La variable "contenedor" ser� la id del contenedor, ser� un string ej:('miContenedor')
	
	function dibujarCalendario (contenedor, anchoContenedor) {

		/*
		OK, pensemos todo lo que nos har� falta para dibujar nuestro calendario
		1� Necesitaremos una id personalizada, por si vamos a usar m�s de un calendario
		2� Despu�s necesitamos saber en que d�a de la semana empieza el mes que queremos dibujar
		3� Tambi�n necesitamos conocer la cantidad de d�as que tiene el mes requerido
		4� Y por �ltimo, necesitamos saber el numero de semanas que ocupa nuestro mes
		*/
		
		//Lo primero que vamos a hacer es insertar un div an final del contenedor,
		//que ser� a su vez el contenedor de nuestro calendario.
		//------------------------------------------------------------------------
		//Empezaremos por almacenar en una variable la id seleccionable de nuestro contenedor principal
		var contenedorCal_selId = '#'+contenedor;
		//Vamos a detectar si ya hay alg�n calendario en el DOM
		//En funci�n de los que haya, personalizaremos la id de nuestro calendario
		//Creamos un variable de valor 0 en la que los contaremos
		var calendariosInstanciados = 0;
		//Y por cada calendario que haya, incrementaremos en 1 la variable calendariosInstanciados
		$('.coArtCa_Contenedor').each(function () {calendariosInstanciados++});
		//Ahora vamos a almacenar la nueva id personalizada de nuestro calendario en una varibale
		var caCal_id = 'coArtCa_Contenedor'+calendariosInstanciados;
		//Vamos a crear nuestro div contenedor del calendario
		$(contenedorCal_selId)
			//Agregamos nuestro calendario al final del contenido de nuestro contenedor
			//Le damos una id personalizada
			.append($('<div id="'+caCal_id+'" />')
				//Le a�adimos la clase coArtCa_Contenedor
				.addClass('coArtCa_Contenedor')
			);
			
		//Ahora crearemos la cabecera con los d�as de la semana
		////////////////////////////
		//FALTA CODIGO Y EXPLICACION
		////////////////////////////
		
		//El siguiente paso va a ser insertar un div por cada d�a anterior al primer d�a
		//Despu�s insertaremos un div por cada d�a del mes y le daremos su clase en funci�n a si es el d�a seleccionado, si no lo es, diferenciaremos los d�as de la semana y los de fin de semana
		//Y por �ltimo insertaremos un div por cada d�a que reste para rellenar el mes
		
		//Empezaremos almacenando nuestro contenedor en una variable
		var contenedorDias_selId = '#' + caCal_id;
		var contenedorDias = $(contenedorDias_selId);
		//Ahora por cada dia de la semana anterior al primer dia semanal de nuestro mes insertaremos un div con la clase diaDeOtroMes
		for (i=0; i<diaDeLaSemana; i++) {
			contenedorDias.append();
		}
	}
	
}
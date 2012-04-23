//Si te interesa el tuto y no sabes trabajar con fechas, revisa el tutorial
//"El Objeto Date, su métodos, ejemplos prácticos y ejercicios" en Cristalab.com:
//url: http://foros.cristalab.com/el-objeto-date-su-metodos-ejemplos-practicos-y-ejercicios-t105282/

//Creamos la funcion principal
function caCal (fecha) {
	//Si no se pasa una fecha, se toma la fecha del día en curso
	if (!fecha) {fecha = new Date()};
	//Para nuestra comodidad almacenamos también la fecha subdividida en año, mes y día
	var ano = fecha.getFullYear(),
		mes = fecha.getMonth(),
		dia = fecha.getDate(),
		//También almacenaremos los días de la semana en nuestro idioma
		//Y el nombre de los meses
		//Más tarde podremos ampliar los idiomas haciendo un objeto con estos datos
		diasSemanaES = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
		mesesES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
		//Por último vamos a hacer lo mismo con los días de los meses
		diasMeses = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		
	//Vamos a empezar por crear la funciones que nos harán falta
	//Al final del tutorial estas funciones serán métodos del plug-in
	//Con las que el usuario podrá trabajar con fechas a su antojo
	
	//Tenemos un problema, nuestros días de la semana empiezan en lunes,
	//sin embargo, los días de la semana del objeto Date comienzan en domingo,
	//por lo que tendremos que configurar un pequeño fix para obtener el día correcto.
	//Así que empezaremos por crear la función que nos devolverá los días semanales correctos
	//Le tendremos que pasar obligatoriamente un objeto Date
	function calcularDiaSemanal(fechaPasada) {
		//Si no recibimos la fecha lanzamos una excepción a la consola y devolvemos false
		if (!fechaPasada) {
			console.log('Error en funcion:\nCalcularComienzoPrimeraSemana\n\nFecha requerida');
			return false;
		};
		//Almacenamos el número de día semanal en una variable
		var diaSemana = fechaPasada.getDay();
		//Ahora efectuamos el cambio de los números
		//Si el día obtenido es 0 lo convertiremos en 6,
		//si es cualquier otro le restaremos 1, así el lunes será 0 y el domingo 6
		if (diaSemana == 0) {diaSemana = 6}
		else {diaSemana --};
		//Y por último devolvemos el día fixeado
		return diaSemana;
	}
	
	//Ahora crearemos una función que nos devolverá cantidades de días de meses completos
	//Le pasaremos un array con fechas
	//Si le pasamos sólo una fecha, nos devolverá los días de ese mes
	//Si le pasamos más de una, nos devolverá la suma de todos los días de esos meses
	function calcularDiasMeses (arrayFechas) {
		//Si no hay array o está vacío lazamos una excepción a la consola
		if (!arrayFechas || arrayFechas.length < 1) {
			alert('Error en funcion:\ncalcularDiasMes\n\nSe requiere mínimo una fecha')
		};
		//Declaramos la variable totalDias, y le iremos sumando los días de los meses,
		//Finalmente la devolveremos
		var totalDias = 0;
		//Ahora revisamos cada posición del array
		for (d in arrayFechas) {
			//Declaramos una variable y la igualamos a 0,
			//en ella almacenaremos un 1 si el año de la fecha es bisiexto
			var bisiexto = 0,
			//Obtenemos el año de la fecha actual
				anoArray = arrayFechas[d].getFullYear();
			//Comprobamos si el año es bisiexto, y si lo es...
			if (anoArray%4 == 0 && anoArray%100 != 0 || anoArray%400 == 0) {bisiexto = 1};
			//le sumamos la variable bisiexto a febrero,
			diasMeses[1] += bisiexto;
			//e incrementamos totalDias, los días del mes correspondiente
			totalDias += diasMeses[arrayFechas[d].getMonth()];
			//Reestablecemos Febrero
			diasMeses[1] = 28;
		}
		//Por último devolvemos la suma total
		return totalDias;
	}
	
	//Ahora crearemos una función que nos calculará cuantas semanas abarca el mes de una fecha que le pasemos,
	//El número de semanas puede variar entre 4 y 6.
	function calcularSemanasCalendario (fechaPasada) {
		//Como siempre comenzaremos por configurar nuestra excepción
		if (!fechaPasada) {console.log('Error en funcion:\ncalcularSemanasCalendario\n\nFalta el objeto Date')};
		//Lo primero que necesitamos saber es en que día semanal comienza el mes
		//Así que, vamos a echar mano de nuestra función "calcularDiaSemanal()"
		var diaSemanal = calcularDiaSemanal(new Date(fechaPasada.getFullYear(), fechaPasada.getMonth(), 1));
		//Y después necesitaremos saber los días de nuestro mes, usaremos nuestra función "calcularDiasMeses()"
		var diasTotales = calcularDiasMeses([fechaPasada]);
		//Ahora vamos a restarle a díasTotales, 7 menos el día semanal
		var restoDeDias = diasTotales - (7 - diaSemanal);
		//Y vamos a devolver 1 + restoDeDias divido por 7 redondeado hacia arriba,
		//Este será el numero de semanas que tiene nuestro mes
		return 1+(Math.ceil(restoDeDias/7));
	}
	
	//Y por último una función que nos ayudará a trabajar con milisegundos
	//Esta función está explicada al final de este tutorial, en el ejercicio 2
	//url: http://foros.cristalab.com/el-objeto-date-su-metodos-ejemplos-practicos-y-ejercicios-t105282/
	function convertirMilisegundos (cantidad, unidad, modo) {
		if (arguments.length != 3) {
			console.log('La función convertirMilisegundos requiere exactamente 3 parámetros\ncantidad, unidad, modo');
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
	el alto variará en función de las semanas que tenga el mes y el ancho que tenga el calendario,
	por lo que le pasaremos los parámetros contenedor y anchoContenedor.
	*/
	
	//También le vamos a añadir los nuevos parámetros a nuestra función principal
	//ANTES:
	function caCal (fecha) {'...'}
	//AHORA:
	function caCal (contenedor, anchoContenedor, fecha) {'...'}
	//dejaremos anchoContenedor y fecha al final, ya que serán parámetros opcionales
	
	//La variable "contenedor" será la id del contenedor, será un string ej:('miContenedor')
	
	function dibujarCalendario (contenedor, anchoContenedor) {

		/*
		OK, pensemos todo lo que nos hará falta para dibujar nuestro calendario
		1º Necesitaremos una id personalizada, por si vamos a usar más de un calendario
		2º Después necesitamos saber en que día de la semana empieza el mes que queremos dibujar
		3º También necesitamos conocer la cantidad de días que tiene el mes requerido
		4º Y por último, necesitamos saber el numero de semanas que ocupa nuestro mes
		*/
		
		//Lo primero que vamos a hacer es insertar un div an final del contenedor,
		//que será a su vez el contenedor de nuestro calendario.
		//------------------------------------------------------------------------
		//Empezaremos por almacenar en una variable la id seleccionable de nuestro contenedor principal
		var contenedorCal_selId = '#'+contenedor;
		//Vamos a detectar si ya hay algún calendario en el DOM
		//En función de los que haya, personalizaremos la id de nuestro calendario
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
				//Le añadimos la clase coArtCa_Contenedor
				.addClass('coArtCa_Contenedor')
			);
			
		//Ahora crearemos la cabecera con los días de la semana
		////////////////////////////
		//FALTA CODIGO Y EXPLICACION
		////////////////////////////
		
		//El siguiente paso va a ser insertar un div por cada día anterior al primer día
		//Después insertaremos un div por cada día del mes y le daremos su clase en función a si es el día seleccionado, si no lo es, diferenciaremos los días de la semana y los de fin de semana
		//Y por último insertaremos un div por cada día que reste para rellenar el mes
		
		//Empezaremos almacenando nuestro contenedor en una variable
		var contenedorDias_selId = '#' + caCal_id;
		var contenedorDias = $(contenedorDias_selId);
		//Ahora por cada dia de la semana anterior al primer dia semanal de nuestro mes insertaremos un div con la clase diaDeOtroMes
		for (i=0; i<diaDeLaSemana; i++) {
			contenedorDias.append();
		}
	}
	
}
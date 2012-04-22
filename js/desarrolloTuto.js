//Si te interesa el tuto y no sabes trabajar con fechas, revisa el tutorial "El Objeto Date, su métodos, ejemplos prácticos y ejercicios" en Cristalab.com:
//url: http://foros.cristalab.com/el-objeto-date-su-metodos-ejemplos-practicos-y-ejercicios-t105282/

//Creamos la funcion principal
function caCal (fecha) {
	//Si no se pasa una fecha, se toma la fecha del día en curso
	if (!fecha) {fecha = new Date()};
	//Para nuestra comodidad almacenamos también la fecha subdividida en año, mes y día
	var ano = fecha.getFullYear(),
		mes = fecha.getMonth(),
		dia = fecha.getDate();
	
	//Lo primero es saber cuantas semanas abarca el mes recibido en el parámetro 'fecha', en un calendario. Puede variar entre 4 y 6.
	//Le pasaremos a javaScript los cálculos necesarios para que nos diga el número de semanas
	var diaDeLaSemana = calcularComienzoPrimeraSemana(fecha);
	
	//Creamos la función que nos devolverá el número de semanas le pasaremos un objeto Date
	function calcularComienzoPrimeraSemana(fechaPasada) {
		//Si no recibimos la fecha lanzamos una excepción
		if (!fechaPasada) {console.log('Error en funcion:\nCalcularComienzoPrimeraSemana\n\nFecha requerida')};
		
		//Primero tendremos que saber en qué día de la semana cae el día 1 del mes solicitado
		//Creamos un nuevo objetoFecha y almacenamos el día 1 del mes
		var dia1MesCurso = new Date (fechaPasada.getFullYear(), fechaPasada.getMonth(), 1),
		//Y almacenamos su numero de día en una variable
			diaSemana = dia1MesCurso.getDay();
		
		//Ahora tenemos un problema, nuestros días de la semana empiezan en lunes, sin embargo, los días de la semana del objeto Date comienzan en domingo, por lo que tendremos que configurar un pequeño fix para obtener el día correcto.
		//Lo que haremos será: si el día obtenido es 0 lo convertiremos en 6, si es cualquier otro le restaremos 1, así el lunes será 0 y el domingo 6
		if (diaSemana == 0) {diaSemana = 6}
		else {diaSemana --};
		
		//Y por último devolvemos el día fixeado
		return diaSemana;
	}
	
	//Y ahora calcularemos cuantas semanas abarca el mes, primero necesitaremos saber cuantos días tiene.
	//Creemos la función que nos devolverá los días de un mes concreto, la prepararemos para que reciba 2 parámetros año y mes
	function calcularDiasMes (cdAno, cdMes) {
		//Comenzaremos por comprobar que estamos recibiendo ambos parámetros, si no, lanzaremos una excepción
		if (!cdAno) {console.log('Error en funcion:\ncalcularDiasMes\n\nFalta el parámetro cdAno')};
		if (!cdMes) {console.log('Error en funcion:\ncalcularDiasMes\n\nFalta el parámetro cdMes')};
		//Para empezar crearemos una variable donde almacenaremos 1 y 0, en función de si el año es bisiexto o no
		var bisiexto = 0;
		//Ahora comprobaremos si el año de la fecha actual es bisiexto
		if (cdAno%4 == 0 && cdAno%100 != 0 || cdAno%400 == 0) {bisiexto = 1};
		//Crearemos un array con los días de los meses y a febrero le sumaremos la variable bisiexto
		var diasMeses = [31, (28+bisiexto), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
		//Almacenamos en valor solicitado en una variable
			diasSolicitados = diasMeses[cdMes];
		//Y por último devolvemos los días solicitados
		return diasSolicitados;
	}
	
	//Ahora ya estamos listos para saber cuantos días tiene nuestro mes solicitado
	//////////////////////////////////////////////////////////////////////////////////////////RECUPERAR
	//var diasDelMes = calcularDiasMes(ano, mes);
	//////////////////////////////////////////////////////////////////////////////////////////BORRAR
	var diasDelMes = calcularDiasMeses([[ano, mes]]);
	
	//Ahora ya contamos con todos los datos necesarios para calcular el número de semanas que tiene el mes deseado sobre el calendario.
	//Así que vamos a crear la función calcularSemanasCalendario, necesitaremos 2 variables para hacerla funcionar, diaDeLaSemana y diasDelMes
	function calcularSemanasCalendario (diaSemanal, diasTotales) {
		//Como siempre comenzaremos por configurar nuestra excepción
		if (!diaSemanal) {console.log('Error en funcion:\ncalcularSemanasCalendario\n\nFalta diaSemanal')};
		if (!diasTotales) {console.log('Error en funcion:\ncalcularSemanasCalendario\n\nFalta diasTotales')};
		//Ahora vamos a restarle a díasTotales - 7 (que es una semana entera) - diaSemanal
		var restoDeDias = diasTotales - (7-diaSemanal);
		//Y vamos a devolver 1 + restoDeDias divido por 7 redondeado hacia arriba, que será el numero de semanas que tiene nuestro mes
		return 1+(Math.ceil(restoDeDias/7));
	}
	
	//Y ahora almacenamos en una variable el resultado de la función que acabamos de hacer con las fecha solicitadas
	var semanasDelMes = calcularSemanasCalendario(diaDeLaSemana, diasDelMes);
	
	//A pesar de que, como veremos más adelante, el número de semanas no es necesario calcularlo para dibujar el calendario, sin embargo, ya que hemos creado la función que lo hace por nosotros la usaremos, y si usamos la imaginación, esta función nos puede valer para alguna otra cosa que se nos ocurra. Nosotros también la vamos a usar para calcular si las medidas máximas de nuestro calendario exceden el tamaño del contenedor asignado
	
	//Ahora vamos a mejorar un pelin nuestra función calcularDiasMes, para que nos devuelva la suma de todos los meses solicitados
	//Cambiamos las variables por un array que va a contener a su vez arrays con pares año - mes
	//Veamos un ejemplo:
	
	//////////////////////////////////////////////////QUITAR COMENTARIO
	//[[1985, 4], [2456, 2], [2012, 0]]
	///////////////////////////////////////////////////////////////////
	
	//La idea es que ahora la función nos devuelva la suma de los días de los meses, de todas esas fechas, Mayo de 1985 + Marzo de 2456 + Enero de 2012
	//Comencemos
	function calcularDiasMeses (arrayAnosMeses) {
		//Cambiamos el objeto de la alerta y la alerta
		if (!arrayAnosMeses) {alert('Error en funcion:\ncalcularDiasMes\n\nFalta el Array')};
		//Declaramos la variable totalDias, a la que le iremos sumando los días de los meses y la devolveremos al final de la función si todo va bien
		var totalDias = 0;
		//Ahora revisamos cada posición del array (que es otro array) y comprobamos que tenga 2 posiciones, si las tiene, calculamos sus días y los vamos sumando a nuestra variable totalDias
		for (d in arrayAnosMeses) {
			//Si no tiene exactamente 2 valores, Excepción y devolvemos un false para salir de la función
			if (arrayAnosMeses[d].length != 2) {
				alert('Error en funcion:\ncalcularDiasMes\n\nEl número de valores de la posición'+d+' del array es incorrecto');
				return false;
			};
			//Sustituimos los valores de la antigua función
			var bisiexto = 0;
			var anoArray = arrayAnosMeses[d][0];
			if (anoArray%4 == 0 && anoArray%100 != 0 || anoArray%400 == 0) {bisiexto = 1};
			var diasMeses = [31, (28+bisiexto), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
			//Sumamos a totalDias los días correspondientes
			totalDias += diasMeses[arrayAnosMeses[d][1]];
		}
		//Devolvemos la suma de todos los días
		return totalDias;
	}
	// Y ahora cambiamos nuestra llamada inicial
	//ANTES:
	////////////////////////////////////////////////////////////////////////////////RECUPERAR
	//var diasDelMes = calcularDiasMes(ano, mes);
	//AHORA
	////////////////////////////////////////////////////////////////////////////////RECUPERAR
	//var diasDelMes = calcularDiasMeses([[ano, mes]]);
	
	//Bien, ahora que tenemos todos los datos vamos a dibujar nuestro calendario, de momento no nos interesa lo bonito o no que pueda quedar, sólo nos interesa rellenarlo con los datos que necesitemos, ya haremos el css al final.
	//Creamos la función dibujarCalendario(), como vamos a necesitar un contenedor donde meterlo y la medida del ancho completo, el alto variará en función de las semanas que tenga el mes y el ancho que le demos; le pasaremos los parámetros contenedor y anchoContenedor, contenedor será la id del contenedor donde queremos colocar nuestro calendario y será un string ej:('miContenedor') y anchoContenedor un número mayor que 0
	
	////////////////////////////////////////////////////ELIMINAR LINEAS DE COMENTARIO
	/*
	function dibujarCalendario (contenedor, anchoContenedor) {
		
	}
	//Y también se lo vamos a añadir a nuestra función principal
	//ANTES:
	function caCal (fecha) {'...'}
	//AHORA:
	function caCal (contenedor, anchoContenedor, fecha) {'...'}
	dejaremos
	*/
	////////////////////////////////////////////////////////////////////////////////
	
	
	//Volvamos a la función dibujar calendario
	function dibujarCalendario (contenedor, anchoContenedor) {
		
		//////////////////////////////////////////TEXTO PLANO FUERA DE CODIGO
		/*
		OK, pensemos todo lo que nos hará falta para dibujar nuestro calendario
		1º Necesitaremos una id personalizada por si vamos a usar más de un calendario
		2º Después necesitamos saber en que día de la semana empieza el mes, la variable [i]diaDeLaSemana[/i]
		3º También necesitamos conocer la cantidad de días que tiene el mes requerido, la variable [i]diasDelMes[/i]
		4º Y por último, ya que tenemos el numero de semanas que ocupa nuestro mes, la variable [i]semanasDelMes[/i], la usaremos para rellenar las últimas casillas del mes, si quedasen libres.
		*/
		/////////////////////////////////////////////////////////////////////
		
		
		//Lo primero que vamos a hacer es insertar un div an final del contenedor, que será a su vez el contenedor de nuestro calendario
		//Empezaremos por almacenar la id seleccionable de nuestro contenedor principal
		var contenedorCal_selId = '#'+contenedor;
		//Vamos a detectar si ya hay algún calendario en el DOM y en función de los que haya, personalizaremos la nueva id de nuestro contenedor
		//Creamos un variable de valor 0 en la que los contaremos
		var calendariosInstanciados = 0;
		//Y por cada calendario incrementaremos en 1 la variable
		$('.caCal_Contenedor').each(function () {calendariosInstanciados++});
		//Ahora vamos a almacenar la nueva id personalizada de nuestro calendario en una varibale
		var caCal_id = 'caCal_Contenedor'+calendariosInstanciados;
		//Vamos a crear nuestro div contenedor y lo rellenaremos, cuando lo hayamos rellenado, le daremos las medidas
		$(contenedorCal_selId)
			//Agregamos nuestro calendario al final del contenido de nuestro contenedor, y le damos una id personalizada
			.append($('<div id="'+caCal_id+'" />')
				//Le añadimos la clase caCal_Contenedor
				.addClass('caCal_Contenedor')
			);
		
		//Lo primero que haremos es crear un array con los días de la semana
		var diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].
		//El siguiente paso va a ser insertar un div por cada día anterior al primer día
		//Después insertaremos un div por cada día del mes y le daremos su clase en función a si es el día seleccionado, si no lo es, diferenciaremos los días de la semana y los de fin de semana
		//Y por último insertaremos un div por cada día que reste para rellenar el mes
		
		//Empezaremos almacenando nuestro contenedor en una variable
		var contenedorDias_selId = '#'+caCal_id;
		var contenedorDias = $(contenedorDias_selId);
		//Ahora por cada dia de la semana anterior al primer dia semanal de nuestro mes insertaremos un div con la clase diaDeOtroMes
		for (i=0; i<diaDeLaSemana; i++) {
			contenedorDias.append
		}
	}
	
}
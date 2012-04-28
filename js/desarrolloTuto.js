//Si está leyendo esto en gitHub antes de que esté publicado en cristalab,
//deberás saber que el codigo a continuación puede contener fallos y cosas mal estructuradas,
//es un tutorial y está en proceso de desarrollo, no tengo una base desde la que lo esté haciendo,
//por lo que cada palabra a continuación ha salido de mi cabeza (grande todo sea dicho (-_-) ),
//y como ya he dicho, es posible que contenga fallos, pues no lo veo haciendo en orden
//y habrá partes que encontraréis no depuradas.

//Si ves fallos o tienes idéas de como hacerlo mejor, te agradecería que la aportases,
//y en el momento de publicarlas, estarían incorporadas con una mención a tu usuario de clab
//o en su defecto a tú nombre.

///////////////////////////////////////////////////////////////////////////////
////////////////////////////IDEAS POR INCORPORAR///////////////////////////////
///////////////////////////////////////////////////////////////////////////////
/*
	1º - Hacer el cambio de los meses o años en el calendario
		a. En el momento de la creación o de cambiar los meses, que también genere los meses adyacentes (ocultos), y que cambie de mes tipo slide, de izquierda a derecha incluidos los años
		b. Cada vez que se cambiara de mes se generaía un nuevo mes oculto, y el mes desplazado a 2 posiciones del central se eliminaría
	2º - Usar las fechas para obtener Tweets de usuarios
	3º - Función para hacer cálculos entre 2 fechas o más
	4º - Función (¿¿con php incorporado??), para hacer una especie de sistema de reservas o algo parecido
	5º - Hacer 2 tipos de calendario en función del tamaño de su contenedor objetivo
	6º - ¿Hacerlo Dragable?
	7º - Convertirlo en un plug-in
	8º - Funcionalidad de idiomas
	9º - Una vez acabado (post-tutorial), optimizar todos los nombres de los códigos y adaptar todas las palabras a inglés, para un mayor alcance en el soporte vía gitHub y para hacer un calendar al que se le pueda dar un uso más globalizado.
*/

///////////////////////////////////////////////////////////////////////////////
//////////////////////////////////TUTORIAL/////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

//Si te interesa el tuto y no sabes trabajar con fechas, revisa el tutorial
//"El Objeto Date de JavaScript" en Cristalab.com:
//url: http://foros.cristalab.com/el-objeto-date-su-metodos-ejemplos-practicos-y-ejercicios-t105282/

$(document).ready(function () {caCal('calendario');});

//Creamos la funcion principal
function caCal (contenedor, anchoContenedor, fecha) {
	//Si no se pasa una fecha, se toma la fecha del día en curso
	if (!fecha) {fecha = new Date()};
	//Para nuestra comodidad almacenamos también la fecha subdividida en año, mes y día
	var ano = fecha.getFullYear(),
		mes = fecha.getMonth(),
		dia = fecha.getDate(),
		//También almacenaremos los días de la semana
		//y los nombres de los meses en los idiomas que queramos
		//Al final del tuto guardaremos un json con los idiomas
		idiomas = {
			es : {
				dias: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
				meses: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
			},
			en : {
				dias: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
				meses: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
			}
		};
		//Setearemos el idioma por defecto
		idioma = 'es';
		//Por último vamos a hacer lo mismo con los días de los meses
		diasMeses = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		
	//Vamos a empezar por crear la funciones que nos harán falta
	//Al final del tutorial estas funciones serán métodos del plug-in
	//Con las que el usuario podrá trabajar con fechas a su antojo
	
	//Tenemos un problema, nuestros días de la semana empiezan en lunes,
	//sin embargo, los días de la semana del objeto Date comienzan en domingo,
	//por lo que tendremos que configurar un pequeño arreglo para obtener el día correcto.
	//Así que empezaremos por crear la función que nos devolverá los días semanales correctos
	function calcularDiaSemanal(fechaPasada) {
		//Si no recibimos la fecha, configuramos la de hoy y lo avisamos por la consola
		if (!fechaPasada) {fechaPasada = new Date()};
		//Almacenamos el número de día semanal en una variable
		var diaSemana = fechaPasada.getDay();
		//Ahora efectuamos el cambio de los números
		//Si el día obtenido es 0 lo convertiremos en 6,
		//si es cualquier otro le restaremos 1, así el lunes será 0 y el domingo 6
		if (diaSemana == 0) {diaSemana = 6}
		else {diaSemana --};
		//Y por último devolvemos el día arreglado
		return diaSemana;
	}
	
	//Ahora crearemos una función que nos devolverá cantidades de días de meses completos
	//Le pasaremos un array con fechas
	//Si no le pasamos fecha configuramos la fecha actual (¡importante¡, en un array)
	//Si le pasamos sólo una fecha, nos devolverá los días de ese mes
	//Si le pasamos más de una, nos devolverá la suma de todos los días de esos meses
	function calcularDiasMeses (arrayFechas) {
		if (!arrayFechas || arrayFechas.length < 1) {
			arrayFechas = [new Date()];
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
	
	//Vamos a crear una estúpida función que nos devolverá el primer día del mes de la fecha pasada.
	//símplemente para ahorrarnos ecribir en adelante.
	function primerDia (fechaPasada) {
		//si no se le pasa fecha se configura la de hoy
		if (!fechaPasada) {fechaPasada = new Date()};
		//y devolvemos el día 1
		return new Date(fechaPasada.getFullYear(), fechaPasada.getMonth());
	}
	
	//Ahora crearemos una función que nos calculará cuantas semanas abarca el mes de una fecha que le pasemos,
	//El número de semanas puede variar entre 4 y 6.
	function calcularSemanasCalendario (fechaPasada) {
		//Como siempre comenzaremos por comprobar si se ha pasado una fecha,
		//y si no se ha pasado generamos la del día en curso
		if (!fechaPasada) {fechaPasada = new Date()};
		//Lo primero que necesitamos saber es en que día semanal comienza el mes
		//Así que, vamos a echar mano de nuestra función "calcularDiaSemanal()"
		var diaSemanal = calcularDiaSemanal(primerDia(fechaPasada)),
		//Y después necesitaremos saber los días de nuestro mes, usaremos nuestra función "calcularDiasMeses()"
			diasTotales = calcularDiasMeses([fechaPasada]),
		//Ahora vamos a restarle a díasTotales, 7 menos el día semanal
			restoDeDias = diasTotales - (7 - diaSemanal);
		//Y vamos a devolver 1 + (redondeando hacia arriba restoDeDias divido por 7),
		//Este será el numero de semanas que abarca nuestro mes
		return 1+(Math.ceil(restoDeDias/7));
	}
	
	//Y por último una función que nos ayudará a trabajar con milisegundos
	//Esta función está explicada en el ejercicio 2 del tutorial que indico en la presentación,
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
	dibujarCalendario(fecha, contenedor);
	
	//1-////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////
	///////////////PREPARAR PARA TAMAÑO PEQUEÑO Y GRANDE
	////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////
	
	//2-////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////
	///////////////CALCULOS FUTUROS CON FECHAS
	////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////	
	
	function dibujarCalendario (fechaDib, contenedorDib, anchoContenedor) {

		/*
		OK, pensemos todo lo que nos hará falta para dibujar nuestro calendario
		1º Necesitaremos una id personalizada, por si vamos a usar más de un calendario
		2º Después necesitamos saber en que día de la semana empieza el mes que queremos dibujar
		3º También necesitamos conocer la cantidad de días que tiene el mes requerido
		4º Y, aunque no nos hace falta, ya que tenemos la función que nos calcula la extensión de semanas de un mes. La usaremos.
		*/
		
		//Lo primero que vamos a hacer es insertar un div an final del contenedor,
		//que será a su vez el contenedor de nuestro calendario.
		//------------------------------------------------------------------------
		//Empezaremos por almacenar en una variable la id seleccionable de nuestro contenedor principal
		var contenedorCal_selId = '#'+contenedorDib,
		//Vamos a detectar si ya hay algún calendario en el DOM,
		//en función de los que haya, personalizaremos la id de nuestro calendario.
		//Vamos a definir una variable de valor 0 en la que los contaremos
			calendariosInstanciados = 0,
		//También vamos a ir rellenando una variable cada vez que pintemos un día
		//y con el comprobaremos si hemos rellenado el mes completamente.
			diasPintados = 0;
		//Y por cada calendario que haya, incrementaremos en 1 la variable calendariosInstanciados
		$('.coArtCal_Contenedor').each(function () {calendariosInstanciados++});
		//Ahora vamos a almacenar la nueva id personalizada de nuestro calendario en una varibale
		var caCal_id = 'coolArtsCalendar-'+calendariosInstanciados;
		
		//Vamos a crear nuestro div contenedor del calendario
		$(contenedorCal_selId)
			//Agregamos nuestro calendario al final del contenido de nuestro contenedor
			//Le damos una id personalizada
			.append($('<div id="'+caCal_id+'" />')
				//Le añadimos la clase coolArtsCalendar
				.addClass('coolArtsCalendar') );
				//Lo ocultaremos para rellenarlo oculto
				//Y lo mostraremos una vez relleno
				//.hide() );
		
		//El siguiente paso será crear la cabecera e insertar un div por cada día anterior al primer día.
		//Después insertaremos un div por cada día del mes,
		//y le daremos su clase en función a si es el día de hoy,
		//si no lo es, diferenciaremos los días de la semana y los de fin de semana.
		//Y por último insertaremos un div por cada día que reste para rellenar el mes.
		
		//Empezaremos almacenando nuestro contenedor en una variable
		var contenedorDias_selId = '#' + caCal_id,
			$contenedorDias = $(contenedorDias_selId);
		
		//Ahora crearemos la cabecera con los días de la semana
		for (diaSemanal in idiomas[idioma].dias) {
			var dial = idiomas[idioma].dias[diaSemanal];
			$contenedorDias.append($('<div class="coArtCal_diaCabecera" />').html(dial))
		}
		
		//1-////////////////////////////////////
		//Meter en contenedor para cambio de mes
		////////////////////////////////////////
		
		//Calculemos en que día cae el primer día del mes (con el día semanal correcto)
		var diaDeLaSemana = calcularDiaSemanal(primerDia(fechaDib));
		
		//*-/////////////////////////////////////////
		//Pensar en visualización de los meses y años
		/////////////////////////////////////////////
		
		//Ahora por cada dia de la semana, anterior al primer dia semanal de nuestro mes,
		//insertaremos un div con la clase diaDeOtroMes y lo rellenaremos con el día que corresponda.
		//Necesitamos saber cuantos días tiene nuestro mes anterior,
		//Le diremos a nuestra función calcularDiasMeses() que nos lo diga
		//primero almacenamos el numero de mes anterior
		var mesAnterior = fechaDib.getMonth()-1;
		//si el mes anterior resulta ser diciembre, es decir -1, lo converimos en 11
		if (mesAnterior == -1) {mesAnterior = 11};
		//Ahora ya podemos calcular los días del mes anterior sin errores
		//El año nos da igual pues los meses siempre tienen los mismos días,
		//a excepción de febrero en los años bisiextos,
		//pero nuestra función calcularDiasMeses ya arregla esto.
		var diasMesAnterior = calcularDiasMeses([new Date(fechaDib.getFullYear(), mesAnterior)]);
		//bien, ahora nos toca restarle los días que queramos incluir en el calendario,
		//que será el día semanal del primer día -1
		//esto los hacemos para que el primer día que rellenemos sea ese,
		//y después lo iremos incrementando en 1.
		diasMesAnterior -= diaDeLaSemana-1;
				
		for (i=0; i<diaDeLaSemana; i++) {
			//2-////////////////////////////////
			//Check si es una fecha seleccionada
			////////////////////////////////////
			
			$contenedorDias.append($('<a class="diaDeOtroMes" />')
				.html(diasMesAnterior) );
			//incrementamos en 1 los días pintados y el días del mes anterior
			diasMesAnterior++;
			diasPintados++;
		}
		
		//Ahora por cada día del mes una casilla con su día
		for (i=1; i<=calcularDiasMeses([fechaDib]); i++) {
			//2-////////////////////////////////
			//Check si es el dia de hoy
			////////////////////////////////////
			$contenedorDias
				.append($('<a class="diaMes" />')
					.html(i) );
			//incrementamos en 1 los días pintados
			diasPintados++;
		}
		
		//Y por último comprobamos si hemos rellenado todos los días visibles de las semanas,
		//y lo que sobre lo rellenamos con nuevas casillas con clase 'diaDeOtroMes'
		//Para ir rápido echamos mano de nuestra función para calcular las semanas
		//y lo que nos devuelva la función lo multiplicamos por 7 para obtener los días
		var diasMesCalendario = calcularSemanasCalendario(fechaDib)*7,
		//calculamos cuantos días hay vacíos
			diasVacios = diasMesCalendario-diasPintados;
		//y por cada día vacío, insertamos un nuevo día,
		//como sabemos que el mes que viene empieza en 1,
		//aprovechamos para rellenar su número de día
		for (i=1; i<=diasVacios; i++) {
			$contenedorDias.append($('<a class="diaDeOtroMes" />')
				.html(i) );
		}
		
	}
	
}
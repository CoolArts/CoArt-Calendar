$(document).ready(function () {caCal('calendario');});

//Creamos la funcion principal
function caCal (contenedor, anchoContenedor, fecha) {
	if (!fecha) {fecha = new Date()};
	
	var ano = fecha.getFullYear(),
		mes = fecha.getMonth(),
		dia = fecha.getDate(),
		idiomas = {
			es : {
				dias: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
				meses: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
			},
			en : {
				dias: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
				meses: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
			}
		},
		idioma = 'es',
		diasMeses = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		
	function calcularDiaSemanal(fechaPasada) {
		if (!fechaPasada) {fechaPasada = new Date()};
		
		var diaSemana = fechaPasada.getDay();
		
		if (diaSemana == 0) {diaSemana = 6}
		else {diaSemana --};
		
		return diaSemana;
	}
	
	function calcularDiasMeses (arrayFechas) {
		if (!arrayFechas || arrayFechas.length < 1) {
			arrayFechas = [new Date()];
		};
		
		var totalDias = 0;
		
		for (d in arrayFechas) {
			var bisiexto = 0,
				anoArray = arrayFechas[d].getFullYear();
				
			if (anoArray%4 == 0 && anoArray%100 != 0 || anoArray%400 == 0) {bisiexto = 1};
			
			diasMeses[1] += bisiexto;
			totalDias += diasMeses[arrayFechas[d].getMonth()];
			diasMeses[1] = 28;
		}
		return totalDias;
	}
	
	function primerDia (fechaPasada) {
		if (!fechaPasada) {fechaPasada = new Date()};
		return new Date(fechaPasada.getFullYear(), fechaPasada.getMonth());
	}
	
	function calcularSemanasCalendario (fechaPasada) {
		if (!fechaPasada) {fechaPasada = new Date()};
		var diaSemanal = calcularDiaSemanal(primerDia(fechaPasada)),
			diasTotales = calcularDiasMeses([fechaPasada]),
			restoDeDias = diasTotales - (7 - diaSemanal);
		return 1+(Math.ceil(restoDeDias/7));
	}
	
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
	
	dibujarCalendario(fecha, contenedor);
	
	function dibujarCalendario (fechaDib, contenedorDib, anchoContenedor) {
		var contenedorCal_selId = '#'+contenedorDib,
			calendariosInstanciados = 0,
			diasPintados = 0,
			semanasPintadas = 1;
			
		$('.coArtCal_Contenedor').each(function () {calendariosInstanciados++});
		
		var caCal_id = 'coolArtsCalendar-'+calendariosInstanciados;
		
		$(contenedorCal_selId)
			.append($('<div id="'+caCal_id+'" />')
				.addClass('coolArtsCalendar') );
				
		var tabla = $('<table />')
			.append($('<thead />')
				.append('<tr class="coArtCal_meses" />')
				.append('<tr class="coArtCal_diasSemana" />')
			)
			.append('<tbody />');
			
		var cabeceras = tabla.find('thead').find('tr:eq(1)');
		
		var contenedorDias_selId = '#' + caCal_id,
			$contenedorCal = $(contenedorDias_selId);
			
		for (diaSemanal in idiomas[idioma].dias) {
			var dial = idiomas[idioma].dias[diaSemanal];
			cabeceras.append($('<th />').html(dial))
		}
		
		var diaDeLaSemana = calcularDiaSemanal(primerDia(fechaDib));
		
		var mesAnterior = fechaDib.getMonth()-1;
		
		if (mesAnterior == -1) {mesAnterior = 11};
		
		var diasMesAnterior = calcularDiasMeses([new Date(fechaDib.getFullYear(), mesAnterior)]);
		
		diasMesAnterior -= diaDeLaSemana-1;
		
		var semanasCalendario = calcularSemanasCalendario(fechaDib),
			diasMesCalendario = semanasCalendario*7,
			tbody = tabla.find('tbody');
			
		for (i=0; i<semanasCalendario; i++) {tbody.append('<tr />')}
		
		var primerTr = tbody.find('tr:eq(0)');
		
		for (i=0; i<diaDeLaSemana; i++) {			
			primerTr.append($('<td class="diaDeOtroMes" />')
				.html(diasMesAnterior) );
				
			diasMesAnterior++;
			diasPintados++;
		}
		
		function calcularFila() {
			return 'tr:eq('+Math.floor(diasPintados/7)+')'
		}
		
		for (i=1; i<=calcularDiasMeses([fechaDib]); i++) {
			tbody.children(calcularFila())
				.append($('<td class="diaMes" />')
					.html(i) );
					
			diasPintados++;
		}
		
		var diasVacios = diasMesCalendario-diasPintados;
		
		for (i=1; i<=diasVacios; i++) {
			tbody.children(calcularFila())
				.append($('<td class="diaDeOtroMes" />')
					.html(i) );
		}
		$contenedorCal.append(tabla);
	}
}
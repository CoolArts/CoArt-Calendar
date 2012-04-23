function caCal (contenedor, anchoContenedor, fecha) {
	if (!fecha) {fecha = new Date()};
	
	var ano = fecha.getFullYear(),
		mes = fecha.getMonth(),
		dia = fecha.getDate(),
		diasSemanaES = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
		mesesES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
		diasMeses = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	function calcularDiaSemanal(fechaPasada) {
		if (!fechaPasada) {
			console.log('Error en funcion:\nCalcularComienzoPrimeraSemana\n\nFecha requerida');
			return false;
		};
		
		var diaSemana = fechaPasada.getDay();
		
		if (diaSemana == 0) {diaSemana = 6}
		else {diaSemana --};
		
		return diaSemana;
	}
	
	function calcularDiasMeses (arrayFechas) {
		if (!arrayFechas || arrayFechas.length < 1) {
			alert('Error en funcion:\ncalcularDiasMes\n\nSe requiere mínimo una fecha')
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
	
	function calcularSemanasCalendario (fechaPasada) {
		if (!fechaPasada) {
			console.log('Error en funcion:\ncalcularSemanasCalendario\n\nFalta el objeto Date')
		};
		
		var diaSemanal = calcularDiaSemanal(new Date(fechaPasada.getFullYear(), fechaPasada.getMonth(), 1)),
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
	
	function dibujarCalendario (contenedor, anchoContenedor) {

		var contenedorCal_selId = '#'+contenedor;
			calendariosInstanciados = 0;
		
		$('.coArtCa_Contenedor').each(function () {calendariosInstanciados++});
		
		var caCal_id = 'coArCat_Contenedor'+calendariosInstanciados;
		
		$(contenedorCal_selId)
			.append($('<div id="'+caCal_id+'" />')
				.addClass('coArtCa_Contenedor')
			);
			
		var contenedorDias_selId = '#' + caCal_id,
			contenedorDias = $(contenedorDias_selId);
		
		for (i=0; i<diaDeLaSemana; i++) {
			contenedorDias.append();
		}
	}
	
}
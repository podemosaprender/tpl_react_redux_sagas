import { put, take } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import { 
	rteGet, rteSet, rteCall, 
	importDynamic, rteRunSaga, takeEvery, all, delay 
} from '../../rte';
//A: imports para todos los tests
//VER: https://redux-saga.js.org/docs/advanced/Testing/#branching-saga

import { SoloParaTest } from './main_sagas';

//VER: https://jestjs.io/docs/getting-started
test('basico', () => { //TUTORIAL: un test es una funcion con nombre para el reporte y pruebas
	const unResultado= 1; //TUTORIAL: suponete que una funcion tuya devolvio unResultado
	expect(unResultado).toBe(1); //TUTORIAL: lo comparas con una CONSTANTE, el test tiene que ser bien simple
})

describe('sorteo, todos los casos', () => { //TUTORIAL: asi se testea una saga
	const generador= cloneableGenerator( SoloParaTest.sortear )(); //TUTORIAL: mi saga, en este caso no se exporta salvo para test
	//TUTORIAL: podes hacer algunos pasos comunes y despues clonarlo!
	let _tmp= null;
	_tmp= generador.next(); //TUTORIAL: proximo paso de la saga
	//console.log("sorteo, PASO1", _tmp); //TUTORIAL: es un diccionario, lo podes ver en la consola, etc.
	//VER: https://redux-saga.js.org/docs/advanced/Testing/#branching-saga

	test('empieza poniendo cartel y estado "sorteando"',  () => {
		const primeraLLamadaEsperada= rteCall(SoloParaTest.cartelSorteoYEsperar ,'Empieza el sorteo!','sorteando', 500);
		//TUTORIAL: todo lo que "invocas" con yield en la saga son diccionarios que devulevle el generador
		// los podes imprimir con console.log, buscar partes, comparar, etc.
		// podes probar cambiar algun parametro arriba y ver el mensaje de error
		expect(_tmp.value).to.deep.equal(  primeraLLamadaEsperada );
	});


	test('sorteo cuenta regresiva y numero ganador', () => { 
		const genEsteTest= generador.clone(); //A: copio con el estado actual
		let llamadaEsperada= null;

		_tmp= genEsteTest.next();
		llamadaEsperada= rteCall(SoloParaTest.cartelSorteoYEsperar , 'faltan 5! Todavía podés cambiar tu número!','sorteando');
		expect(_tmp.value).to.deep.equal( llamadaEsperada );

		_tmp= genEsteTest.next();
		llamadaEsperada= rteCall(SoloParaTest.cartelSorteoYEsperar , 'faltan 4! Todavía podés cambiar tu número!','sorteando');
		expect(_tmp.value).to.deep.equal( llamadaEsperada );

		_tmp= genEsteTest.next();
		llamadaEsperada= rteCall(SoloParaTest.cartelSorteoYEsperar , 'faltan 3! Todavía podés cambiar tu número!','sorteando');
		expect(_tmp.value).to.deep.equal( llamadaEsperada );

		_tmp= genEsteTest.next();
		llamadaEsperada= rteCall(SoloParaTest.cartelSorteoYEsperar , 'faltan 2! Todavía podés cambiar tu número!','sorteando');
		expect(_tmp.value).to.deep.equal( llamadaEsperada );

		_tmp= genEsteTest.next();
		llamadaEsperada= rteCall(SoloParaTest.cartelSorteoYEsperar , 'faltan 1! Todavía podés cambiar tu número!','sorteando');
		expect(_tmp.value).to.deep.equal( llamadaEsperada );
		//TUTORIAL: no uso for para no repetir errores de codigo!
		
		_tmp= genEsteTest.next();
		llamadaEsperada= rteGet('cont1');
		expect(_tmp.value.args).to.deep.equal( llamadaEsperada.args );
		//TUTORIAL: asi reviso pedidos al store con rteGet

		_tmp= genEsteTest.next(3); //TUTORIAL: asi le devuelvo un valor a yield rteGet por ej
		
		llamadaEsperada= rteCall(SoloParaTest.cartelSorteoYEsperar , 'Ganaste! El numero ganador era 3 y el tuyo 3', 'SIMULO ERROR y pongo perdiste');
		expect(_tmp.value).to.deep.equal( llamadaEsperada );
	});
})

//INFO: ejemplos de "sagas" y como usarlas

import { 
	rteGet, rteSet, rteCall, 
	importDynamic, rteRunSaga, takeEvery, all, delay 
} from '../../rte';
import { navigationPush } from '../../rte';
import { logmsg, ser_urlparams } from '../../rte';

//S: APP *****************************************************
const import_eth_sagas= importDynamic(() => import('../../rte/lib/ethereum')); //EJ. importar cuando necesito

function* envioEditar() { //XXX:ejemplo
	yield rteSet({ "pantalla": "/editar" });
}

function* cambiaNumerito() {
	const [n]= yield rteGet("numerito");
	console.log("numerito:",n);
	if (n<1) {
		var x= rteSet({numerito: 7}); 
		console.log("rteSet es",x);
		yield x;
	}
}

function* onLocationChange() {
	try {
		const [loc]= yield  rteGet("navigation_location");
		//DBG: console.log("LOC CHANGE", loc);
		if (loc == null) return;  //A: no tengo datos?

		//XXX: ACA deberia elegir a que pantalla ir!
		if (loc.params.de || loc.params.texto || loc.params.para) {  //XXX. generalizar o ejemplo
			yield rteSet({"mensaje": {para: loc.params.para, de: loc.params.de, texto: loc.params.texto}}); 
			yield rteCall(mensajeDerivar)
		}

	} catch (ex) {
		let sts= yield rteGet('progress{error');
		if (!sts) { //A: no hay un mensaje de error mejor que la excepción
			yield rteSet({progress: {error : 'ERROR '+ex.message}});
		}
	}
}

//S: MAIN **************************************************
export function* autorunSaga() { //U: un solo punto de entrada para todas las "sagas"
	yield rteCall(onLocationChange); //A: primera vez

	yield takeEvery('SET/navigation_location', onLocationChange);
	yield takeEvery('SET/numerito', cambiaNumerito); //XXX:ejemplo
}

rteRunSaga(autorunSaga);

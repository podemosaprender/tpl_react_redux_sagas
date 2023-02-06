//INFO: ejemplos de "sagas" y como usarlas

import { 
	rteGet, rteSet, rteCall, 
	importDynamic, rteRunSaga, takeEvery, all, delay 
} from '../../rte';
import { navigationPush } from '../../rte';
import { logmsg, ser_urlparams } from '../../rte';

//S: APP *****************************************************
//TUTORIAL: const import_eth_sagas= importDynamic(() => import('../../rte/lib/ethereum')); //TUTORIAL: importar cuando necesito

function* onLocationChange() {
	try {
		const [loc]= yield rteGet("navigation_location");
		//DBG: console.log("LOC CHANGE", loc);
		if (loc == null) return;  //A: no tengo datos?

		if (loc.pathname=='/guienso') { //TUTOTIAL: puedo elegir que mostrar en base a la URL
			navigationPush('/404');	
		}
		else if (loc.params.num) {  //TUTORIAL: aca puedo revisar la url, parametros, y cargar cosas de servidores, revisar permisos, etc
			yield rteSet({cont1: parseInt(loc.params.num)}); //A: pongo el numero en el store
			if (! loc.params.nosortear) {
				yield rteCall(sortear); //A: lanzo el sorteo!
			}
		}

	} catch (ex) { //TUTORIAL: si algo falla puedo poner un mensaje en el store para que la UI decida que mostrar
		let sts= yield rteGet('progress{error');
		if (!sts) { //A: no hay un mensaje de error mejor que la excepción
			yield rteSet({progress: {error : 'ERROR '+ex.message}});
		}
	}
}

function* cartelSorteoYEsperar(mensaje, estado, cuantoEsperar=1000) { //TUTORIAL: las sagas son como funciones, se llaman con yield rteCall(...)
	yield rteSet({'sorteo{mensaje': mensaje, 'sorteo{estado': estado}); //TUTORIAL: asi cambiamos valores en el store
	yield delay(cuantoEsperar); //TUTORIAL: esta saga=procesito espera un segundo, pero la app y otras pueden seguir haciendo cosas!
}

function* sortear() { //TUTORIAL: una saga que va actualizando el store (y la UI) en varios pasos
	yield rteCall(cartelSorteoYEsperar, 'Empieza el sorteo!', 'sorteando',500) //TUTORIAL: llamar otra saga

	for (let i=5; i>0; i--) { //TUTORIAL: podemos ir actualizando el store Y la UI "sin salir" de esta funcion y sin bloquear!
		yield rteCall(cartelSorteoYEsperar, 'faltan '+i+'! Todavía podés cambiar tu número!', 'sorteando') //TUTORIAL: llamar otra saga
	}

	const num= yield rteGet('cont1'); //TUTORIAL: OjO! lo mismo, otras sagas o la UI pueden cambiar valores mientras ejecutamos!
	if (num==3) {
		yield rteCall(cartelSorteoYEsperar, 'Ganaste! El numero ganador era 3 y el tuyo '+num, 'ganaste') //TUTORIAL: llamar otra saga
	}
	else {
		yield rteCall(cartelSorteoYEsperar, 'Perdiste! El numero ganador era 3 y el tuyo '+num, 'perdiste') //TUTORIAL: llamar otra saga
	}

}

//S: MAIN **************************************************
export function* autorunSaga() { //U: un solo punto de entrada para todas las "sagas"
	yield rteCall(onLocationChange); //A: actualizar el estado segun a que url entro, la primera vez

	yield takeEvery('SET/navigation_location', onLocationChange); //A: cada vez que cambia la url o sus parametros
	yield takeEvery('sortear', sortear); //TUTORIAL: cuando llegue el mensaje "sortear" emitido por action llama esta saga
}

rteRunSaga(autorunSaga);

export const SoloParaTest= process.env.NODE_ENV=='test' && { //A: solo para testear en vitest
	sortear,
	cartelSorteoYEsperar,
}



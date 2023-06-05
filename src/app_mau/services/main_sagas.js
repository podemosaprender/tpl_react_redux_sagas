//INFO: ejemplos de "sagas" y como usarlas

import { 
	rteGet, rteSet, rteCall, 
	importDynamic, rteRunSaga, takeEvery, all, delay 
} from '../../rte';
import { navigationPush } from '../../rte';
import { logmsg, ser_urlparams } from '../../rte';

//S: copiado de dwimer

//============================================================
//S: speech
var SpeechRateDflt= 1.1;
var TTS= window.TTS || window.speechSynthesis;
var SpeechVoices= null; //U:lazy

function speech_from_text_p(msg) { //A: lee en voz alta
	//SEE: https://www.npmjs.com/package/cordova-plugin-texttospeech
	if (typeof(msg)!='object') { msg= {text: (msg||'')+''} }
	//A: msg es un kv
	msg= Object.assign({lang: 'es-AR', rate: SpeechRateDflt}, msg);

	if (SpeechVoices==null) {
		SpeechVoices = TTS.getVoices()
	}

	return new Promise( (onOk,onError) => {
		let utterance= new SpeechSynthesisUtterance(msg.text);
		utterance.rate= msg.rate;
		utterance.locale= msg.lang;
		utterance.lang= msg.lang;
		utterance.voice= SpeechVoices.find(v => (v.name.indexOf('Spanish')>-1));
		utterance.onend= onOk
		utterance.onerror= onError
		TTS.speak(utterance, 
			onOk,	
			onError,	
		)
	});
}
	
//SEE: https://www.npmjs.com/package/phonegap-plugin-speech-recognition
//SEE: https://wicg.github.io/speech-api/#speechreco-attributes
const SpeechRecognition= window.webkitSpeechRecognition || window.SpeechRecognition;
const Recognition_= SpeechRecognition && new SpeechRecognition();
var RecognitionEstaDictando_= false;

function speech_to_text_stop() { Recognition_.stop(); }
function speech_to_text_estaDictando() { return RecognitionEstaDictando_; }
function speech_to_text_p(params) {
	params= params || {};
	Recognition_.lang= params.lang || 'es-AR'; //SEE: https://github.com/libyal/libfwnt/wiki/Language-Code-identifiers
	return new Promise( onOk => {
		var textoNuevo='';

		function onRecognitionResult(event) {
			console.log("Recognition",event);
			//XXX:deberia ser un interim PERO la implementacion actual del plugin solo envia finales y no marca el flag isFinal :(
			if (event.type=='end') {
				RecognitionEstaDictando_= false;
				setTimeout(() => onOk(textoNuevo), 500); //A: end llega antes que results :P
			}
			else if (event.type=='result') {
				if (event.results.length > 0) {
					textoNuevo= event.results[0][0].transcript;
				}
			}
		}

		Recognition_.onend= onRecognitionResult; //A: restaurar estado
		Recognition_.onresult= onRecognitionResult;
		RecognitionEstaDictando_= true;
		setTimeout(()=> Recognition_.start(),100); //A: le doy tiempo al refresh de UI
	});
}
window.speech_to_text_p= speech_to_text_p; 

//S: SPEECH **************************************************
function* onListenFor() {
	let quiereSeguir= true;
	let misitems= { }
	let acc= [];
	yield rteSet({listening: { sts: 'listen', acc: [], items: {...misitems}}});
	while (quiereSeguir) {
		let resultado='no entendi';
		try {
			let txt= yield rteCall(speech_to_text_p)	
			if (txt=='') { continue; }

			let c= (txt.match(/comando (.*)/i)||[])[1];
			if (c!=null) {
				if (c=="terminamos") { quiereSeguir= false; resultado='terminamos' }
				else if (c=="borrar todo") { acc=[]; resultado='borrado todo' }
				else {
					let m; 
					if (m= c.match(/guardar en (.*)/i)) { 
						misitems[ m[1] ]= [...acc]; resultado='guardado en '+m[1]; 
					} else if (m= c.match(/leer de (.*)/i)) { 
						let n= parseInt(m[1]);
						if (isNaN(n)) {
							n= ['cero','uno','dos','tres','cuatro','cinco'].indexOf(m[1]);
						}
						if (n>-1) {
							yield rteCall(speech_from_text_p, acc[n] )
							resultado= 'si'
						}
						
					}
				}
			}
			else {
				resultado= ''+acc.length;
				acc.push(txt);
			}
			yield rteSet({listening: { sts: 'done', acc: [...acc], items: {...misitems}}});
			yield rteCall(speech_from_text_p, resultado)
		} catch(ex) { alert(ex) }
	}
}


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

//S: MAIN **************************************************
export function* autorunSaga() { //U: un solo punto de entrada para todas las "sagas"
	yield rteCall(onLocationChange); //A: actualizar el estado segun a que url entro, la primera vez

	yield takeEvery('SET/navigation_location', onLocationChange); //A: cada vez que cambia la url o sus parametros
	yield takeEvery('SET/listen_for', onListenFor); //A: cada vez que cambia la url o sus parametros

}

rteRunSaga(autorunSaga);

export const SoloParaTest= process.env.NODE_ENV=='test' && { //A: solo para testear en vitest
}



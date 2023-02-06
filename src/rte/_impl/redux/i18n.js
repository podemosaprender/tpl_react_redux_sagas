import { call as rteCall, takeEvery } from 'redux-saga/effects';
import { rteGet } from './util';
import { rteRunSaga } from './store'

const i18n = { //TODO: cargar dinamicamente
    es: {
        "Creá un recuerdo inolvidable para tus amigos!": "Creá un recuerdo inolvidable para tus amigos!"
    },
    en: {
        "Creá un recuerdo inolvidable para tus amigos!": "Give your married friends your best wishes!"
    }
}

var ActiveLang='es' //DFLT
var ActiveLangDict= i18n[ActiveLang]

const setLang = async (lang) => {ActiveLang=lang; ActiveLangDict= i18n[ActiveLang];}; //TODO: cargarlo dinamicamente
const t = (text) => ( ( ActiveLangDict && ActiveLangDict[text] ) || text) 

export {t}

function* onLangChange() {
	try {
		const [lang]= yield rteGet("language");
		yield rteCall(setLang, lang);
	} catch (ex) {
		console.error("onLangChange",lang, ex)
	}
}

//S: MAIN **************************************************
function* autorunSaga() { //U: una saga propia para el idioma
	yield takeEvery('SET/language', onLangChange); //TODO:mover a rte
}

rteRunSaga(autorunSaga);

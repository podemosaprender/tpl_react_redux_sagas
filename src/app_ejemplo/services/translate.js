const i18n = {
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

export {t, setLang};

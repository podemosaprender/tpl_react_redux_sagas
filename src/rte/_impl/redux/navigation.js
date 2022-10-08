//S: BrowserHistory ********************************************
import { createBrowserHistory } from 'history';
import  { ser_urlparams_r } from '../../lib/util';
import { actionSet } from './util';

export const NavigationHistory = createBrowserHistory();

let asUser= true;

const onLocationChange= (ev) => {
	const {location}= ev;
	//DBG: 
	console.log("onLocationChange", {asUser, location, ev});
	if (location==null || !asUser) return;
	const loc= { ...location, params: ser_urlparams_r(location.search||'')}
	actionSet && actionSet({ "navigation_location": loc }); //TODO: vitest marca la funcion como no definida
};

export const connectStore= (store) => {
	let unlisten = NavigationHistory.listen(onLocationChange);
	onLocationChange(NavigationHistory); //A: la primera vez
	//A: Listen for changes to the current location.
}

export const navigationPush = (url, opts) => {
	try {
		asUser= opts?.asUser;
		NavigationHistory.push(url, opts);
	} catch(ex) { asUser= true; throw(ex); }
	asUser= true;
}

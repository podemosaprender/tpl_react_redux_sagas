import store from './store';
import { useSelector } from 'react-redux';
import { get_p } from '../../lib/util';
import { put, select } from 'redux-saga/effects'

const selectFromState_f= (pathsArrOrStr, pfx, dstKv) => { try {
	pfx= typeof(pfx)=='string' ? pfx : '';
	const paths= Array.isArray(pathsArrOrStr) ? pathsArrOrStr : pathsArrOrStr.split(/\s+/);
	//DBG: console.log("selectFromState_f", paths);
	if (dstKv) {
		return (state) => {
			paths.forEach( p => dstKv[ p.slice(1).replace(/[^a-zA-Z0-9_]/g,'__') ] = get_p(state, '{'+pfx+p) );
			return dstKv;
		};
	} else {
		return ( (state) => paths.map( p => get_p(state, '{'+pfx+p) ) );
	}
}catch(ex) { console.log("selectFromState_f",pathsArrOrStr, pfx, ex); throw(ex); } }


//S: UI
export const action= (type, args) => store.dispatch({type, args});
export const action_f= (type, args) => () => action(type,args);
export const actionSet= (p2v, pfx, id) => {
	id= id==null ? (pfx ?  (pfx + '/') : '') + Object.keys(p2v)[0] : id;
	action('SET/'+ id , {p2v, pfx});
}
export const useSelectorsAt = (paths, pfx, dstKv ) => {
	return useSelector( selectFromState_f(paths, pfx, dstKv) );
}

//S: sagas
export const rteSet= (p2v, pfx, id) => {
	id= id==null ? (pfx ?  (pfx + '/') : '') + Object.keys(p2v)[0] : id;
	return put({
		type: "SET" + (id ? '/'+id : ''), 
		args: {p2v: p2v, pfx} 
	});
}
export const rteGet= (paths, pfx, dstKv) => select( selectFromState_f(paths, pfx, dstKv) );



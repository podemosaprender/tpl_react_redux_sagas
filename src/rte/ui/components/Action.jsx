import React from 'react';

import { action, actionSet } from '../../_impl/redux/util';

export default ({children, type, args, text, as, ...props}) => {
	let txt= text!=null ? text : typeof(children)=='string' ? children : type; 
	let maybeSet= false;
	if (txt==null) {
		txt= args!=null ? aObject.keys(args)[0] : 'action';
		maybeSet;
	}

	let ty= type!=null ? type : txt;
	let ch= children!=null ? children : txt!=null ? txt : ty;
	let As_= as;
	if (as==null) { 
		As_= 'button';
		props.className= (props.className||'')+' button';
	}
	
	let onclick= (type=='SET' || maybeSet) ? (() => actionSet(args)) : (() => action(ty,args));
	return (<As_ onClick={onclick} {...props}>{ch}</As_>)
}



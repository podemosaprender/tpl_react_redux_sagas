//INFO: para debug y prototipos, mostrar el valor de varios selectors del store
import React from 'react';

import { useSelectorsAt } from '../../_impl/redux/util';

import JsonPre from './JsonPre';

export default (selectors) => {
	const s= Array.isArray(selectors) ? selectors : selectors.split(/\s+/);
	const v= useSelectorsAt(s.join(' '));
	return (<div rte_selectors="{selectors}"> 
		{ s.map( (k,idx) => (<JsonPre titulo={k} key={k} datos={v[idx]} />))}
	</div>);
}



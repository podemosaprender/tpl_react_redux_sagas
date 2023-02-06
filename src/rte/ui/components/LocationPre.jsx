//INFO: para debug, mostrar la url y parametros en un pre
import React from 'react';

import { useSelectorsAt } from '../../_impl/redux/util';

import JsonPre from './JsonPre';

export default () => {
	const [loc]= useSelectorsAt("navigation_location");
	return (<JsonPre titulo="navigation_location" datos={loc} />);
}



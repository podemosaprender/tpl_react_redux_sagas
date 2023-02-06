import React, { useState } from 'react';
import { VerHtmlYAyuda } from '../components/VerMsg';
import comoVerUrl from '../assets/etherscan.png';

import { evToEtherscanLink } from '../services/msghtml.js';

export default ({on, data}) => {
	return (
		<VerHtmlYAyuda data={data} on={on} />
	);
}



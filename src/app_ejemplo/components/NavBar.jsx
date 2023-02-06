import React, { useState } from 'react';
import { useSelectorsAt, useStateWithUpdate, action, action_f, actionSet } from '../rte';

import { home_url } from '../services/config';
import { Menubar } from 'primereact/menubar';
import { PrimeIcons } from 'primereact/api';

export default () => {
	const [ open, setOpen ]= useState(false);

	const logo = 'Buenos deseos' //reemplazar por logo

	const items = [
		{
			label: 'Inicio',
			icon: PrimeIcons.HOME
		},
		{
			label: 'Cómo funciona',
			icon: PrimeIcons.HEART
		},
		{
			label: 'es',
			icon: PrimeIcons.HEART,
			command: () => actionSet({language: 'es'})
		},
		{
			label: 'en',
			icon: PrimeIcons.HEART,
			command: () => actionSet({language: 'en'})
		}
	]

	return (<>
		<Menubar model={items} start={logo} />
	</>)
}



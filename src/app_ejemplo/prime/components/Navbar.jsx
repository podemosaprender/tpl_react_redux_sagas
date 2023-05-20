import { useSelectorsAt as estadoLeer,  actionSet as estadoPoner, action_f as accionPedir } from '../../../rte';

//A: cargue lo que siempre necesito de React y rte, podría eliminar lo que no uso
//FROM: https://primereact.org/menubar/

import React from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';

/* U: items puede ser algo como
 items = [
		{
			label: 'Inicio',
			icon: 'pi pi-fw pi-file',
			command: () => estadoPoner({quiereVer: 'Inicio'}),
		},
		{
			label: '¿Quiénes somos?',
			icon: 'pi pi-fw pi-pencil',
			command: () => estadoPoner({quiereVer: 'QuienesSomos'}),
		},
	];
*/

export default function Navbar({items, logo_url}) {
	items= items || [];
	logo_url= logo_url || "https://primefaces.org/cdn/primereact/images/logo.png";

	const start = <img alt="logo" src={logo_url} height="40" className="mr-2"></img>;
	const end = <InputText placeholder="Search" type="text" className="w-full" />;

	return (
		<div className="card">
			<Menubar model={items} start={start} end={end} />
		</div>
	)
}


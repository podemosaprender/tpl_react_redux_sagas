import React, {useEffect, useState} from 'react';
import { t, useSelectorsAt, action, action_f, actionSet, useStateWithUpdate } from '../../../rte';
import { useSelectorsAt as estadoLeer,  actionSet as estadoPoner, action_f as accionPedir } from '../../../rte';
//A: cargue lo que siempre necesito de React y rte, podría eliminar lo que no uso

import { Button } from 'primereact/button';

//FROM: https://blocks.primereact.org/free (me copie el ejemplo "Pricing", converti lo repetido en componentes)

const Plan = ({ nombre , precio }) => {
	return (
		<div className="col-12 lg:col-4">
			<div className="p-3 h-full">
				<div className="shadow-2 p-3 h-full flex flex-column" style={{ borderRadius: '6px' }}>
					<div className="text-900 font-medium text-xl mb-2"> { nombre } </div>
					<div className="text-600">Plan description</div>
					<hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
					<div className="flex align-items-center">
						<span className="font-bold text-2xl text-900">${ precio }</span>
						<span className="ml-2 font-medium text-600">per month</span>
					</div>
					<hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
					<ul className="list-none p-0 m-0 flex-grow-1">
						<li className="flex align-items-center mb-3">
							<i className="pi pi-check-circle text-green-500 mr-2"></i>
							<span>Arcu vitae elementum</span>
						</li>
						<li className="flex align-items-center mb-3">
							<i className="pi pi-check-circle text-green-500 mr-2"></i>
							<span>Dui faucibus in ornare</span>
						</li>
						<li className="flex align-items-center mb-3">
							<i className="pi pi-check-circle text-green-500 mr-2"></i>
							<span>Morbi tincidunt augue</span>
						</li>
					</ul>
					<hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300 mt-auto" />
					<Button label="Comprar" className="p-3 w-full mt-auto" i
						onClick={ () => estadoPoner({ quiereVer: 'Comprar', quiereComprar: nombre }) }/>
				</div>
			</div>
		</div>
	)
}

export default () => {
	return (<>
<div className="surface-0">
    <div className="text-900 font-bold text-6xl mb-4 text-center">Pricing Plans</div>
    <div className="text-700 text-xl mb-6 text-center line-height-3">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam eligendi quos.</div>

    <div className="grid">
			<Plan nombre="Básico" precio="9"/>
			<Plan nombre="Profesional" precio="23"/>
			<Plan nombre="Empresas" precio="500" />
    </div>
</div>

	</>)
}

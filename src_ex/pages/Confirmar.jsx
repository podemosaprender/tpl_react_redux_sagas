import React, { useState } from 'react';
import { VerHtmlYText } from '../components/VerMsg';
import Actions from '../rte/ui/components/Actions';

const BotonesPago= () => {
	return (<Actions items={
	[
		{type:'ENVIO/EDITAR', text:'Editar', className:'has-background-primary-dark'},
		{type:'ENVIO/PAGAR-PP', text:'PayPal', className:'is-success'},
		{type:'ENVIO/PAGAR-MP', text:'MercadoPago', className:'is-success'},
		{type:'ENVIO/PAGAR-METAMASK', text:'Metamask', className:'is-success'},
	]} />);
}

export default ({data}) => {
	return (
		<section className="section">
			<div className="container">
				<BotonesPago />

				<VerHtmlYText data={data} />

				<BotonesPago />
			</div>
		</section>
	);
}



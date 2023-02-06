import React, { useState } from 'react';
import { preview, evToEtherscanLink  } from '../services/msghtml';
import comoVerUrl from '../assets/etherscan.png';

export const VerStyle= {maxWidth: '40em'};

export const VerHtml= ({on, data, style}) => {
	style= style || VerStyle;
	const v= preview(data);

	return (
		<div dangerouslySetInnerHTML={{__html: v.html}} style={style}>
		</div>
	);
}

export const VerText= ({on, data, style}) => {
	style= style || VerStyle;
	const v= preview(data);

	return (<>
		<div style={style}>
			<pre>
				{v.text}	
			</pre>
		</div>

	</>);
}



export const VerHtmlYAyuda= ({on, data}) => {
	return (
		<section className="section">
			<div className="container">
				<h2 className="title mt-4">Así se ve en la blockchain</h2>

				<article className="message">
					<div className="message-body">
						El botón redirige a <em>EtherScan</em>, la aplicación web más usada para leer datos que quedan guardados para siempre en la blockchain.
						Ahí se ven todos los datos de la transacción.<br />
						Para ver el mensaje, que está en el campo <em>Data</em>, selecciona en el menú desplegable la opción <em>Text</em> como se muestra a continuación.<br />
						<img src={comoVerUrl} style={{width: '80%', margin: '20px auto', display: 'block'}} />
					</div>
				</article>

				<div className="has-text-centered">
					<a className="button is-link" target="_blank" href={ evToEtherscanLink( data ) }>Ver en Etherscan</a>
				</div>
			</div>
		</section>
	);
}


export const VerHtmlYText= ({on, data, style}) => {
	return (<>
		<h2 className="title mt-4">Así se verá en la web y aplicaciones</h2>
		<VerHtml data={data} style={style} />

		<h2 className="title mt-6">Así se verá en la blockchain</h2>
		<VerText data={data} style={style} />
	</>);
}

import React, { useState } from 'react';
import { VerHtmlYAyuda } from '../components/VerMsg';
import { evToEtherscanLink } from '../services/msghtml';

export default ({on, data}) => {
	return (<>
		<section className="section">
			<div className="container">

				<div className="field is-grouped is-justify-content-right">
					<div className="control">
						<button className="button is-link"
							onClick={ () => on('nuevo') }>
							Nuevo mensaje	
						</button>
					</div>
				</div>

				<div>
					<h1 className="title">Tu mensaje quedó registrado</h1>
				</div>

			</div>
		</section>

		<VerHtmlYAyuda data={data} on={on} />

		<section className="section">
			<div className="container">

				<div className="field is-grouped is-justify-content-right">
					<div className="control">
						<button className="button is-link"
							onClick={ () => on('nuevo') }>
							Nuevo mensaje	
						</button>
					</div>
				</div>

			</div>
		</section>

	</>);
}



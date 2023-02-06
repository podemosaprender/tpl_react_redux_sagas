import React from 'react';

const PaginaDeEjemplo= ({on, data}) => {
	return (<>
		<h1>Pagina de ejemplo</h1>
		<div>
			<h2>Data</h2>
			<pre> { JSON.stringify(data,null,1) } </pre>
		</div>
	</>);
}

const Router = ({pagina, on, data}) => {
	const routes = {
		'/uno': <PaginaDeEjemplo on={on} data={{comoPagina: pagina, ...data}}/>,
		'/dos': <PaginaDeEjemplo on={on} data={{comoPagina: pagina, ...data}}/>,
		'default': <PaginaDeEjemplo on={on} data={{comoPagina: pagina, esDefault: true, ...data}}/>
	}
	return routes[screen] || routes.default;
}

export default Router;

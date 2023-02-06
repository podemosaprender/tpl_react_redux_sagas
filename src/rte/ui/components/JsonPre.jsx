import React from 'react';

export default ({datos, titulo}) => {
	titulo = titulo || "Datos"
	return (<div>
		<h2>{titulo}</h2>
		<pre>{ JSON.stringify(datos, null,1) }</pre>
	</div>)
}



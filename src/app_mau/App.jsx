//INFO: una app para mostrar conceptos y rte

import React, {useEffect, useState} from 'react';
import { t, useSelectorsAt, action, action_f, actionSet, useStateWithUpdate } from '../rte';
//A: cargue lo que siempre necesito de React y rte, podría eliminar lo que no uso

import "primereact/resources/themes/soho-dark/theme.css"; //A: theme SEE: https://primereact.org/theming/#builtinthemes
import 'primeicons/primeicons.css'; //A: iconos
import "primereact/resources/primereact.min.css"; //A: core
import "primeflex/primeflex.css"; //A: grilla y columnas SEE: https://www.primefaces.org/primeflex/

//S: lanzar servicios (no ui) ********************************
import './services/main_sagas'; 

//S: ui configuracion general ********************************
//U: cargar css y otras cosas que se hacen una sola vez para toda la app

import './index.css'; //U: nuestro css
//OjO! purgueCSS necesita classNames como strings ENTEROS (no sumar)

//S: ui componentes que usamos acá ***************************

import { Button } from 'primereact/button'
import JsonPre from '../rte/ui/components/JsonPre'

export default () => { //U: este es el componente principal que elige que mostrar
	const sts= useSelectorsAt('listening');
	return (<>
		<h1>Hola, este es un ejemplo!</h1>
		<Button onClick={ () => actionSet({'listen_for': 'XXX'}) }>Listen</Button>
		<JsonPre datos={sts} />
	</>)
}



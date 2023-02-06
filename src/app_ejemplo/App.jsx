import React, {useEffect, useState} from 'react';
import { t, useSelectorsAt, action, action_f, actionSet, useStateWithUpdate } from '../rte';

import DondeEstoy from '../rte/ui/components/LocationPre';

//S: lanzar servicios (no ui) ********************************
import './services/main_sagas'; 

//S: ui ******************************************************

/* EJEMPLO: usar libreria de UI primereact
import 'primereact/resources/themes/md-light-deeppurple/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
*/

/* EJEMPLO: usar libreria de UI bulma
import 'bulma/css/bulma.css';
import 'bulmaswatch/united/bulmaswatch.min.css';
*/

import './index.css';

//OjO! purgueCSS necesita classNames como strings ENTEROS (no sumar)

//import AppNavBar from './components/NavBar';
//import AppFooter from './components/Footer';

import Layout from './components/Layout';
import Modal from '../rte/ui/components/Modal';
import ModalCard from '../rte/ui/components/ModalCard';
import Router from './Router';


export default () => {
	const [cont1]= useSelectorsAt('cont1');

	return (<>
		<h1>Hola</h1>
		<DondeEstoy />
		<p>Cont: {cont1}
			<button onClick={() => actionSet({cont1: (cont1 || 0) +1})}>+</button>
		</p>
	</>)

}


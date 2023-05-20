//INFO: una app para mostrar conceptos y rte

import React, {useEffect, useState} from 'react';
import { t, useSelectorsAt, action, action_f, actionSet, useStateWithUpdate } from '../rte';
import { useSelectorsAt as estadoLeer,  actionSet as estadoPoner, action_f as accionPedir } from '../rte';
//A: cargue lo que siempre necesito de React y rte, podría eliminar lo que no uso

import "primereact/resources/themes/soho-dark/theme.css"; //A: theme SEE: https://primereact.org/theming/#builtinthemes
import 'primeicons/primeicons.css'; //A: iconos
import "primereact/resources/primereact.min.css"; //A: core

//S: lanzar servicios (no ui) ********************************
import './services/main_sagas'; 

actionSet( {quiereVer: 'Inicio', "ahora{son": new Date()} )
//A: inicializamos el Store como más nos guste, con un Diccionario (Object)

//S: ui configuracion general ********************************
//U: cargar css y otras cosas que se hacen una sola vez para toda la app

import './index.css'; //U: nuestro css
//OjO! purgueCSS necesita classNames como strings ENTEROS (no sumar)

//S: ui componentes que usamos acá ***************************

/* TUTORIAL:
 El negocio de React es definir _componentes_. Lo habitual es definirlos cada uno 
 en un archivo separado e importarlos donde los necesitás.

 A continuación importo uno de nuestra librería, y también defino dos aca mismo
 para que puedas leer y probar todo el código junto.

 Desde hace unos años todos los componentes de React se definen como funciones,
 en las versiones más antiguas eran clases definidas con class.
*/

import DondeEstoy from '../rte/ui/components/LocationPre'; //TUTORIAL: un componente que te muestra la info del store sobre la url
import Navbar from './prime/components/Navbar.jsx';

import PaginaQuienesSomos from './prime/pages/PaginaQuienesSomos.jsx'; //TUTORIAL: las "páginas" tambien son componentes
import PaginaInicio from './prime/pages/PaginaInicio.jsx'; 

const items = [ //U: los items de la navbar
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

/* TUTORIAL:

 Ahora uso los componentes que importé o definí.
 De ese modo puedo ir _componiendo_ mi aplicación de a _pedacitos_ fáciles de entender y escribir.

 OjO! El lenguaje que usa React para el "html" NO ES html, es JSX y necesita que
 * todos los tags esten cerrados ej <h1>algo</h1> o <img src="pepe.jpg" />
 * no preserva el espacio dentro de las strings, podes hacer <h1>{"aca   hay   espacio"}</h1>
 * tu funcion se ejecuta cuando React decide que necesita actualizar ese pedacito de pantalla!
   (bastante impredecible, por eso usamos redux Sagas! sino existe useEffect pero muy rapido
	 se vuelve complicado ej. si haces un fetch para traer datos pero falla y necesitas mostrar
	 el error en otro lado, etc.)

 FIJATE que a algunos componentes les pasamos parametros ej "titulo" y a otros no.
 Lo deseable es que los componentes _solamente_ dependan de sus parametros, así no tenés que andar
 buscando por todos lados quien usa o modifica que clave del store.
 PERO hay que buscar un balance, porque justamente inventamos el store para no morir pasando
 parametros por todos lados! Ej. si la usuaria tiene una sesion valida o si llegaron mensajes
 del servidor es mejor NO pasarlos como parametros desde la pantalla principal asi alcanza
 incluir el componente "EstadoSesion" o "MensajesNuevos" para tener esa info y parte de la UI.

*/
export default () => { //U: este es el componente principal que elige que mostrar
	return (<>
		<Navbar items={items}/>
		<h1>Hola, este es un ejemplo!</h1>

		<EjComponenteMostrarConIf />
	</>)

	//TUTORIAL: fijate que "style" es un diccionario que podes preparar afuera con if, etc.
}

const EjComponenteMostrarConIf= () => { //TUTORIAL: podes elegir que mostrar en base al store con un if donde quieras, MEJOR que un router
	const [queQuiereVer]= estadoLeer('quiereVer'); 
	//TUTORIAL: a la izq del = hay un array de nombres dentro de esta funcion, 
	// a la derecha hay "paths" dentro del diccionario del store que podes ver con redux
	return (<div>
		<h2>Quiere ver {queQuiereVer}</h2>
		{ queQuiereVer=='QuienesSomos' 
				? <PaginaQuienesSomos />
				: <PaginaInicio />
		}
	</div>)
}


//INFO: una app para mostrar conceptos y rte

import React, {useEffect, useState} from 'react';
import { t, useSelectorsAt, action, action_f, actionSet, useStateWithUpdate } from '../rte';
//A: cargue lo que siempre necesito de React y rte, podría eliminar lo que no uso


//S: lanzar servicios (no ui) ********************************
import './services/main_sagas'; 

actionSet( {hola: 10, "ahora{son": new Date()} )
//A: inicializamos el Store como más nos guste, con un Diccionario (Object)

//S: ui configuracion general ********************************
//U: cargar css y otras cosas que se hacen una sola vez para toda la app

/* TUTORIALEMPLO: usar libreria de UI primereact
import 'primereact/resources/themes/md-light-deeppurple/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
*/

/* TUTORIALEMPLO: usar libreria de UI bulma
import 'bulma/css/bulma.css';
import 'bulmaswatch/united/bulmaswatch.min.css';
*/

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

const EjComponenteMostrar= ({titulo}) => { //TUTORIAL: muestra un valor del store con un titulo que recibe como parametro
	const [cont1]= useSelectorsAt('cont1');
	return (<>
		{titulo}= {cont1}
	</>)
}
		
const EjComponenteAccionSet= () => { //TUTORIAL: modifica un valor en el store directamente, como haria un input, form, etc.
	const [cont1]= useSelectorsAt('cont1');
	const cuandoPresionaElBoton= () => actionSet({cont1: (cont1 || 0) +1}); //TUTORIAL: la funcion que llama onClick

	return (
			<button onClick={ cuandoPresionaElBoton }> +1 </button>
	)
}

const EjComponenteMostrarConIf= () => { //TUTORIAL: podes elegir que mostrar en base al store con un if donde quieras, MEJOR que un router
	const [estadoSorteo, mensajeSorteo]= useSelectorsAt('sorteo{estado sorteo{mensaje'); 
	//TUTORIAL: a la izq del = hay un array de nombres dentro de esta funcion, 
	// a la derecha hay "paths" dentro del diccionario del store
	// ej. sorteo{estado quiere decir "la clave estado dentro del diccionario en la clave sorteo"
	
	return (<div>
		<h1>Aca va el sorteo</h1>
		{ estadoSorteo=='ganaste'
			? <img src="https://bestanimations.com/media/fireworks/671801409ba-awesome-coloful-fireworks-animated-gif-image-3.gif" alt="fuegos artificiales coloridos para festejar" />
			: estadoSorteo=='perdiste'
			? <div>Perdiste! Seguí participando (se gana con contador=3 guiño guiño)<br />{ mensajeSorteo }</div>
			: <div>{ mensajeSorteo || 'Todavía no hubo sorteo?' }</div>
		}
	</div>)
}

const EjComponenteActionSagas= () => { //TUTORIAL: enviar un mensaje para procesar con sagas
	return (
			<button onClick={ action_f('sortear') }>SORTEO</button>
	)
	//TUTORIAL: action_f me fabrica directamente una funcion con mensaje y parametros
	//la ventaja de hacerlo asi es que podes poner los botones y acciones, 
	//verlos en las DevTools de Redux
	//y cuando quieras escribis las Sagas para procesarlas (si necesitas)
}

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
		<h1>Hola, este es un ejemplo!</h1>
		<DondeEstoy />

		<div>
			<EjComponenteMostrar titulo="contador" />
			<EjComponenteAccionSet />
			<div style={{ marginTop: '2em' }}>
				<EjComponenteActionSagas />
				<EjComponenteMostrarConIf />
			</div>
		</div>
	</>)

	//TUTORIAL: fijate que "style" es un diccionario que podes preparar afuera con if, etc.
}


import React, {useEffect, useState} from 'react';
import { t, useSelectorsAt, action, action_f, actionSet, useStateWithUpdate } from '../../../rte';
import { useSelectorsAt as estadoLeer,  actionSet as estadoPoner, action_f as accionPedir } from '../../../rte';
//A: cargue lo que siempre necesito de React y rte, podría eliminar lo que no uso

export default () => {
	return (<>
		<h2>Inicio bla bla bla</h2>
		<p>Más bla bla bla</p>
	</>)
}

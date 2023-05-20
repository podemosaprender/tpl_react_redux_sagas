import React, {useEffect, useState} from 'react';
import { t, useSelectorsAt, action, action_f, actionSet, useStateWithUpdate } from '../../../rte';
import { useSelectorsAt as estadoLeer,  actionSet as estadoPoner, action_f as accionPedir } from '../../../rte';
//A: cargue lo que siempre necesito de React y rte, podría eliminar lo que no uso

import { Button } from 'primereact/button';

//FROM: https://blocks.primereact.org/free (me copie el ejemplo "Pricing", converti lo repetido en componentes)

export default () => {
	return (<>
		<h1>Comprar</h1>
	</>)
}

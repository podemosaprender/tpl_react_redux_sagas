import React from 'react';

import FormMensaje from './FormMensaje';
import Confirmar from './Confirmar';
import EsperandoCashier from './EsperandoCashier';
import Confirmado from './Confirmado';
import Ver from './Ver';


const Router = ({screen, on, mensaje}) => {
    const routes = {
        '/ver': <Ver on={on} data={mensaje} />,
        '/confirmar': <Confirmar on={on} data={mensaje} />,
        '/confirmado': <Confirmado on={on} data={mensaje} />,
        '/about': <></>,
        'default': <FormMensaje on={on} data={mensaje} />
    }
    return routes[screen] || routes.default;
}

export default Router;

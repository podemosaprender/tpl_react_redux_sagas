# tpl_react_redux_sagas
=======
#INFO: React para mostrar, Sagas para controlar, Redux para conectar

Este proyecto que podés usar de plantilla para aprender y empezar los tuyos
te facilita:

* Ver el estado de tu aplicación con las [DevTools de Redux](https://github.com/reduxjs/redux-devtools)
* Escribir la UI usando React como _plantillas_ casi sin código, recibiendo los datos como parámetro o del store de Redux
* Controlar y testear las operaciones complejas Y que muestra la pantalla desde [Sagas](https://redux-saga.js.org/), aunque todavía no tengas la UI
* Escribir tests automáticos sin depender del backend con Jest y Sagas.

Además

* Usa [vite](https://vitejs.dev/guide/) que es más rápido que `create-react-app`
* Tiene configurado [postcss](https://postcss.org/) que podés usar para componer y adelgazar tus hojas de estilos
* Se puede desplegar y desarrollar en https://glitch.com

## ¿Por qué hacerlo así?

Aunque es fácil _empezar_ con React el código rápidamente se complica y por eso la comunidad fue inventando y adoptando muchas herramientas como Redux, Sagas, etc.

Veo que en general las personas tardan mucho en aprender todos los conceptos necesarios, pierden mucho tiempo en caminos que empiezan bien pero no escalan, etc.

Por eso busque esta forma de trabajar que se basa en conceptos de la Ciencia de la Computación que vienen funcionando bien hace casi 100 años: tu sistema tiene

* Estados: Imaginate una formulario de papel con todas las variables de tu programa, base de datos, etc. Cada combinación única de esos valores es un _estado del sistema_. Por ej. mi casa tiene una luz en la terraza y otra en el jardín, los estados son "terraza=encendida,jardín=encendida", "terraza=encendida,jardín=apagada", etc.
* Transiciones: Por ej. una forma de pasar de "terraza=encendida,jardín=encendida" a "terraza=apagada,jardín=encendida".
* Eventos: En especial cosas que hacemos para que el sistema pase de un estado a otro por ej. "cambiar posición llave de luz terraza".

Con estas herramientas:

* El estado está todo en Redux, podrías escribir cada estado en un archivo .json y cargarlo.
* Con las DevTools de Redux podés ver que eventos ocurrieron y como cambió el estado.
* La UI React se vuelve simplemente
    * Elegir que mostrar según el estado ej. si te registraste o no, si fallo el servidor o no, etc.
    * Ofrecer botones y formularios para disparar eventos ej. poner tu usuario y clave, comprar un producto, etc.
* Las transiciones de un estado a otro las escribís como Sagas
    * Son casi iguales que funciones síncronas con if, try/catch, while, etc.
    * Pero fáciles de testear porque en vez de _hacer_ las llamadas devuelven diccionarios tipo "llamaría a la función tal con tales parametros". A la vez los tests pueden _falsificar_ fácil la respuesta para asegurarte que entraste en todas las ramas de los if, probaste todos los tipos de falla, etc.

El trabajo se vuelve mucho más fácil porque podés

* Diseñar y mostrar todas las pantallas y flujos sin programar ni aprender casi nada.
* Programar y testear todos los cambios de estado e interacciones con servidores aunque no tengas pantalla.
* Integrar las dos partes del trabajo usando las DevTools de Redux para comunicarte.

Si abrís las DevTools de Redux en una ventanita separada que no se cierre cuando tocas la de tu aplicación podés leer y guardar los estados enteros, que como son archivos json también podrías generar para "aparecer" directamente en el estado que querías.

Aprendiendo el mínimo de qué escribír, sintaxis y nombres, te llevás la forma de trabajo más general.

## Usar el entorno

Instalar los paquetes necesarios con 

```
npm i
```

Lanzar la aplicación para desarrollo con Hot Module Reloading (HMR)

```
npm run start
```

Te muestra a que urls conectarte. En general actualiza a medida que editás el código.

Construir los archivos para subir a cualquier servidor ej. gitpages

```
npm run build
```

## Como escribir tu aplicación

1. Se carga de index.html, podés cambiar título, viewport, etc.
2. Sigue por src/index.js (podrías no tocar nada ahí)
3. El componente principal se carga de src/App.js

La carpeta `rte` tiene nuestra librería, si no querés usarla podés ir extrayendo de ahí el código que necesites y después la borrás.

Hay una carpeta `app_ejemplo` con una aplicación muy simple para que pruebes todos los conceptos. Podés copiarla para hacer experimentos y como base para tu aplicación. Alcanza camiar en `src/App.jsx` cual cargás como principal y listo.

### 

XXX:Ingredientes
* Store, k1/k2/k3= valor
* Mensajes=eventos

XXX:Workflow

* html solo, componentes

* sagas y sus tests

## Usar una librería de componentes de UI

### Bulma

Bulma es una librería sólo css liviana similar a bootstrap, que además funciona bien con esta configuación de `postcss` para incluir sólo los estilos que usaste en el código (OjO! los nombres tienen que aparecer tal cual en la hoja de estilos, si armas strings sumando no los va a encontrar)

En `src/App.jsx` está comentado el código para cargar los estilos y un tema.

```
npm i bulma bulmaswatch react-bulma-components
```

### PrimeReact

[Prime React](https://www.primefaces.org/primereact/) es una librería muy completa de componentes interactivos y estilos.

```
npm i primeflex primeicons primereact
```

En `src/App.jsx` está comentado el código para cargar los estilos y un tema.


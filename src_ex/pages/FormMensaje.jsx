import React from 'react';
import { t, useSelectorsAt, useStateWithUpdate, action, action_f, actionSet } from '../rte';

import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { PrimeIcons } from 'primereact/api';
import { Button } from 'primereact/button';

export default ({on, data}) => {
	const [de, setDe]= useStateWithUpdate(data.de || '');
	const [texto, setTexto]= useStateWithUpdate(data.texto || '');
	const [para, setPara]= useStateWithUpdate(data.para || '');
	
	return (<>
		<Card title={t('Creá un recuerdo inolvidable para tus amigos!')}>
			<div className='flex flex-column card-container'>
				<span className='p-float-label field'>
					<InputText id='para' 
						value={data.para}
						onChange={e => setPara(e.target.value)}
					/>
					<label htmlFor='para'>Para</label>
				</span>
				<span className='p-float-label field'>
					<InputText id='de' 
						value={data.de} 
						onChange={e => setDe(e.target.value)}
					/>
					<label htmlFor='de'>De parte de...</label>
				</span>
				<span className='p-float-label field'>
					<InputTextarea id='message' 
						value={data.texto} 
						onChange={(e) => setTexto(e.target.value)} 
						autoResize 
					/>
					<label htmlFor='message'>Mensaje</label>
				</span>
			</div>
			<Button 
				label='Preparar Envío' 
				icon={PrimeIcons.SEND} 
				className='field is-grouped is-justify-content-right'
				onClick={ () => on('confirmar', {de, texto, para}) }
			/>
		</Card>
	</>);
}



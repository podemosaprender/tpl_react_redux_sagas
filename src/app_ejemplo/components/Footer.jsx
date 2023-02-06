import React, { useState } from 'react';
import { home_url } from '../services/config';
import { Card } from 'primereact/card';

export default () => {
	return (
		<footer className="content has-text-centered">
			<Card title="&copy; Buenos Deseos " />
		</footer>
	);
}

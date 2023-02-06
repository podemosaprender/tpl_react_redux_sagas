import React from 'react';
import Action from './Action';

export default ({items}) => {
	return (
		<div className="field is-grouped is-justify-content-right">
			{items.map( it => (
				<p className="control">
					<Action {...it} />
				</p>
			))}
		</div>
	);
}



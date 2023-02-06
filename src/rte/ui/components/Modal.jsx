import React from 'react';

export default ({children}) => {
	return (
		<div className={( children!=null && children!=='') ? 'modal is-active' : 'modal'}>
			<div className="modal-background"></div>
			<div className="modal-content">
				<div className="box mx-4" children={children} >	
				</div>
			</div>
		</div>
	)
};


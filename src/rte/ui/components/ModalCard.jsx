import React from 'react';

export default ({children, actions, actionClose, title, on}) => {
	const actionsOk= actions || ['Aceptar'];
	const actionCloseOk= actionClose==null ? 'Close' : actionClose;

	return (
		<div className={( children!=null && children!=='') ? 'modal is-active' : 'modal'}>
			<div className="modal-background"></div>
			<div className="modal-card">
				<header className="modal-card-head">
					<p className="modal-card-title">{title}</p>
					{ actionCloseOk=='' ? '' : 
						<button className="delete" aria-label="close" onClick={()=> on(actionCloseOk)}></button> 
					}
				</header>
				<section className="modal-card-body" children={children} />
				<footer className="modal-card-foot">
					{ 
						actionsOk.map(act => {
							let actOk= typeof(act)=='string' ? { value: act, label: act } : act;
							return (
								<button 
									className={actOk.className ? "button "+actOk.className : "button"}
									onClick={ () => on(actOk.value || actOk.label) }
								>
									{actOk.label || actOk.value}
								</button>
							);
						})
					}
				</footer>
			</div>
		</div>
	);
}

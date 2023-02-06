//INFO: utilidades para interactuar con la red ethereum

import { 
	rteGet, rteSet, rteCall, 
	importDynamic, rteRunSaga, takeEvery, all, delay 
} from '../rte';

//import { ethers } from "ethers";
import { Web3Provider } from '@ethersproject/providers';
import { parseEther } from '@ethersproject/units';
import { hexlify } from '@ethersproject/bytes';
import { sha256 } from '@ethersproject/sha2';

export function strToHex(s) {
	return hexlify(s.split('').map(c => c.charCodeAt(0)))	
}

export function* ethSendTransactionSaga(txuIn) {
	try {
		yield rteSet({ 'progress{doing': 'Abriendo Metamask para que elijas tu cuenta' });
		const accounts= yield rteCall([window.ethereum,'request'], { method: 'wallet_requestPermissions', params: [{eth_accounts: {} }] }); //A: volver a pedir account

		try {
			yield rteSet({ 'progress{doing': 'Activando la red de prueba en Metamask'});
			yield rteCall([window.ethereum,'request'], {
				method: 'wallet_switchEthereumChain',
				params: [{ chainId: '0x'+ chainId.toString(16).replace(/^0*/g,'') }],
			});
		} catch (switchError) {
			console.log(switchError);
		}	
		const provider= new Web3Provider(web3.currentProvider, chainId);
		const user = provider.getSigner()

		yield rteSet({ 'progress{doing': 'Enviando la transacción para que confirmes el pago en Metamask'});
		
		const txu= yield rteCall([user,'sendTransaction'],txuIn);
		console.log({txu})

		yield rteSet({ 'progress{doing': 'Enviada, esperando la confirmación de que la red ethereum la procesó'});
		const rcptu= yield rteCall([txu,'wait']);
		console.log("ethSendTransactionSaga RCPT", {rcptu});
		console.log("ethSendTransactionSaga call gas", rcptu.gasUsed.toString());

		return rcptu;
	} catch (ex) {
		console.log("ethSendTransactionSaga",ex);
		if ((ex.message||'').includes('already pending')) {
			throw Error('El icono de MetaMask ya mostraba otras operaciones pendientes, recomendamos rechazarlas y reintentar');
		} else { 
			throw(ex); 
		}
	}
}


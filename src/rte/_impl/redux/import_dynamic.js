const ImportDynamicFunc= {}; //U: como hacer el import, k -> func
const ImportDynamicModule= {}; //U: el resultado del import
var NextId= 1000;

async function importDynamicImpl(k) {
	let r= ImportDynamicModule[k];
	if (r==null) {
		r= await ImportDynamicFunc[k]();
		ImportDynamicModule[k]= r;
	}
	return r;
}

export function importDynamic(f, k) {
	k= k || ("ImportDynamic" + (NextId++));
	ImportDynamicFunc[k]= f;
	return () => importDynamicImpl(k);
}



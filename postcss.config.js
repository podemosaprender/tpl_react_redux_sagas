if (process.env.RTE_CSS_PURGE=="YES") {
	const purgecss = require('@fullhuman/postcss-purgecss')

	const purgecssPlugin= purgecss({ 
		content: ['./**/*.html','./**/*.jsx'] ,
		extractors: [
			{
				extractor: content => { 
					let r= content.match(/\w[\w/:-]+/g) || []; 
					//DBG: console.log("CL", r.join(" ")); 
					return r;
				},
				extensions: ['jsx']
			}
		],
		//safelist: [ /[mp].-\d/, /is-flex-grow-1/],
		safelist: [ 'a' ],
	});

	module.exports = {
		plugins: [
			purgecssPlugin,
		]
	}

	console.log("RTE_CSS_PURGE=YES, eliminando clases css que no se usan, ver postcss.config.js")
} else {
	console.log("export RTE_CSS_PURGE=YES para eliminar clases css que no se usan, ver postcss.config.js")
}

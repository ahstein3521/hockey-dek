module.exports = function(schema, { fields }){
	
	schema.pre('save', function(next) {
		const self = this;
		
		fields.forEach( field => {
			
			if (self[field]) {
				let arr = self[field].split(' ');

				self[field] = arr.reduce((acc, v) => {
					const formatted = v.charAt(0).toUpperCase() + v.substr(1).toLowerCase();
					acc.push(formatted);
					return acc;
				},[]).join(' ');
			}; 
		});

		return next();
	});
};

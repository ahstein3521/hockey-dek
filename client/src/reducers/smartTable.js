const defaultState = {
		rowsPerPage: 20,
		//TODO - dynamically set rows per page w/ dropdown input on table footer
		currentPage: 1,
		sortCategory: 'name',
		direction: 'asc',
		searchText:'',
}

export default function(state= defaultState, action) {
  
  const { type, payload } = action;

  switch (type) {
  
  case '__TABLE_INIT__':
  	return payload;
  
  case '__TABLE_SORT__':
    return {
    	...state, 
    	sortCategory: payload.category, 
    	direction: payload.direction 
    };

  case '__TABLE_PAGINATE__':
    return {
    	...state,
    	currentPage: payload.currentPage
    };    
  }
  
  return state;
}
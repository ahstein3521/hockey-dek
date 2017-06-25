
function initTable(config) {
	return {
		type: '__TABLE_INIT__',
		payload: {
			rowsPerPage: 20,
			//TODO - dynamically set rows per page w/ dropdown input on table footer
			currentPage: 1,
			sortCategory: config.category,
			direction: 'asc',
			searchText:'',
		}
	}
}

function handleTableSort(direction, category) {
	return {
		type: '__TABLE_SORT__',
		payload: { direction, category }
	}
}

function handlePagination(currentPage) {
	return {
		type: '__TABLE_PAGINATE__',
		payload: { currentPage }
	}
}

export default { initTable, handleTableSort, handlePagination };
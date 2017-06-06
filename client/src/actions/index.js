export * from './auth';
export * from './players';
export * from './teams';
export * from './snackbar';

export function toggleMenu(){
	return {type:"TOGGLE_MENU"};
}

//Mark the modals state as opened and specify a view
export function openModal(view, data = null){
	return { type: 'OPEN_MODAL', payload: { view, data } };
}

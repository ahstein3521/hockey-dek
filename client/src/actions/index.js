export * from './auth'; 
export * from './game'; 
export * from './payments'; 
export * from './players'; 
export * from './snackbar'; 
export * from './suspensions';
export * from './teams';

export function openModal(view, data) {
	return {
		type: 'OPEN_MODAL',
		payload: { view, data }
	};
}

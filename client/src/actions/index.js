export * from './auth';
export * from './players';
export * from './teams';


export function toggleMenu(){
	return {type:"TOGGLE_MENU"};
}

export function openSnackbar(message){
	return {type:'OPEN_SNACKBAR', payload:message};
}

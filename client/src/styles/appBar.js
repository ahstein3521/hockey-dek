import { PrimaryColorDark, AccentColor, PrimaryColorLight } from './theme';

export const appBarStyle = {
	backgroundColor: PrimaryColorDark,
	zIndex: 2000,
	position: 'fixed'
};

export const menuStyle = {
	backgroundColor: PrimaryColorLight
}
export const menuItemStyle = {
	fontSize:'2em',
	
}

export const menuItemActiveStyle = {
	...menuItemStyle,
	backgroundColor: AccentColor ,
}

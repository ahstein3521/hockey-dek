import { 
		accent1Color,
    accent2Color
} from '../../theme'; 

export const appBarStyle = {
	zIndex: 1000,
	position: 'fixed'
};

export const menuStyle = {
	zIndex: 999
};
export const menuItemStyle = {
	fontSize:'2em',
	fontFamily: 'Della Respira'
}

export const avatarStyle = {
	border: `1px solid black`,
}

export const avatarActiveStyle = {
	...avatarStyle,
	
	backgroundColor: accent2Color,
}

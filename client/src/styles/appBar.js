import { 
	PrimaryColorDefault, 
	PrimaryColorLight,
	PrimaryColorDark, 
	TextPrimaryColor,
	PrimaryTextColor,
	SecondaryTextColor,
	AccentColor,
	AccentColorLight,
} from './theme'; 

export const appBarStyle = {
	// backgroundColor: PrimaryColorDark,
	zIndex: 2000,
	position: 'fixed'
};

export const menuStyle = {
	// color: PrimaryTextColor,
	// backgroundColor: PrimaryColorLight
}
export const menuItemStyle = {
	fontSize:'2em',
	// color:'black',
	fontFamily: 'Della Respira'
}

export const avatarStyle = {
	// backgroundColor:AccentColorLight,
	// color:TextPrimaryColor,
	border: `1px solid ${SecondaryTextColor}`,
}

export const avatarActiveStyle = {
	...menuItemStyle,
	
	backgroundColor: AccentColor,
}

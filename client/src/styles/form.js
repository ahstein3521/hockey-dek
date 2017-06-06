import { 
  PrimaryColorDefault, 
  PrimaryColorLight, 
  TextPrimaryColor,
  PrimaryTextColor,
  PrimaryColorDark,
  SecondaryTextColor,
  AccentColor,
  DividerColor,
} from './theme'; 

const labelStyle = {

}

export const inputStyle = {
	floatingLabelStyle:{
		// color:PrimaryTextColor,
		fontWeight:'bold'
	},
	underlineStyle:{
		borderColor: DividerColor, 
		height: 8
	},
	underlineFocusStyle:{
		// borderColor: AccentColor
	}
}
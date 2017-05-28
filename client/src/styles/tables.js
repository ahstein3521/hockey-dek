import { 
	PrimaryColorDefault, 
	PrimaryColorLight, 
	TextPrimaryColor,
	PrimaryTextColor,
	SecondaryTextColor,
	AccentColor,
} from './theme'; 

export const teamSearch = {
	toolbar:{
		backgroundColor: PrimaryColorDefault,
	},
	card:{
		marginBottom:30, 
		backgroundColor: PrimaryColorLight,
	},
	wrapper:{
		width:'70%', 
		margin:'0 auto'
	},
	label:{
		color: PrimaryTextColor, 
		fontSize:'1.3em'
	},
	
	input:{
		color: PrimaryTextColor,
		fontSize:'1.5em'
	},
	underline:{
		borderColor: AccentColor
	}			
}

export const rosterTableStyle = {
	toolbar: {
		backgroundColor: PrimaryColorDefault	
	},
	toolbarTitle: {
		color: TextPrimaryColor
	},
	toolbarSubtitle: {
		color: TextPrimaryColor,
		marginLeft:6,
		fontStyle:'italic'
	},
	tableHeaderRow: {
		backgroundColor: PrimaryColorLight,
	},
	tableFooter: {
		background:AccentColor,
		verticalAlign:'middle'
	}
}
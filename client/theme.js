import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { fade } from 'material-ui/utils/colorManipulator';
import { 
  white, 
  darkBlack, 
  fullBlack, 
  grey100, 
  grey500, 
  grey300 } from 'material-ui/styles/colors';

export const primary1Color = '#303F9F';
export const primary2Color = '#3F51B5';
export const primary3Color = '#C5CAE9';
export const accent1Color = '#c41c00';
export const accent2Color = '#FF5722';
export const accent3Color = grey300;

export const palette = {
  primary1Color,
  primary2Color,
  primary3Color,
  accent1Color,
  accent2Color,
  accent3Color,
  textColor: fullBlack,
  alternateTextColor: white,
  canvasColor: white,
  borderColor: grey500,
  disabledColor: fade(darkBlack, 0.3),
  pickerHeaderColor: '#303F9F',
  clockCircleColor: fade(darkBlack, 0.07),
  shadowColor: fullBlack,
};


export default getMuiTheme({ palette });
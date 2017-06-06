import { 
  PrimaryColorDefault, 
  PrimaryColorLight, 
  TextPrimaryColor,
  PrimaryTextColor,
  PrimaryColorDark,
  SecondaryTextColor,
  AccentColor,
} from './theme'; 

export const searchStyle = {
  card:{
    marginBottom:30, 
    // background:'#3f51b5'
  },
  wrapper:{
    width:'70%', 
    margin:'0 auto'
  },
  label:{
    // color:'white', 
    fontSize:'1.3em'
  },
  input:{
    // color:'white',
    fontSize:'1.5em'
  }
}

export const tabStyles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  tab:{
    // color: TextPrimaryColor,
    fontWeight:'bold'
  },
  container:{
    // background:PrimaryColorDefault, 
  },
  inkbar: {
    // background:AccentColor, 
  }  
};

export const basicInfoStyle = {
  submitBtn:{
    style:{marginTop:40},
    // labelStyle:{color: PrimaryTextColor },
    // backgroundColor:AccentColor
  },
  formRow:{
    display:'flex',
    justifyContent:'space-around'
  },
  form:{
    width:'70%',
    margin:'10px auto'
  }  
}